/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import Drive from 'node-disk-info/dist/classes/drive';
import PouchDB from 'pouchdb';
import { DirectoryTree } from 'directory-tree';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const { createLogger, format, transports } = require('winston');

const nodeDiskInfo = require('node-disk-info');
const { fdir } = require('fdir');
const dirTree = require('directory-tree');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'file-base' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //

   // new transports.File({ filename: 'app.log' }),
  ],
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

function getDriveList(): Promise<Drive> {
  // eslint-disable-next-line new-cap
  return new nodeDiskInfo.getDiskInfo()
    .then()
    .catch((reason: any) => logger.log('error', new Error(reason)));
}

/** Setup database* */
const DB = new PouchDB('./db/file-base');
PouchDB.plugin(require('pouchdb-find'));

/*
 DB.destroy()
 .then(function () {
    // database destroyed
  })
 .catch(function (error) {
    logger.log('error', new Error(error));
  });
*/

DB.createIndex({
  index: { fields: ['createdAt', '_id'] },
}).catch();

DB.info()
  .then(function (info) {
    logger.info(JSON.stringify(info));
  })
  .catch((error) => logger.log('error', new Error(error)));

/* function getFiles(): void {
  const api = new fdir()
    .withFullPaths()
    .crawl('C:\\Users\\kbrisso\\Downloads\\Photos');
  const files = api.sync();
  console.log(files);
}
*/

ipcMain.handle('get-dir-tree', async (event, arg) => {
  let tree: DirectoryTree;
  try {
    tree = dirTree(arg, {
      attributes: ['mtime', 'size', 'type', 'extension', 'birthtime'],
      normalizePath: true,
    });
    return tree;
  } catch (error: any) {
    logger.error(`get-dir-tree ${Error(error)}`);
  }
  return null;
});

ipcMain.handle('get-libraries', async (event, arg) => {
  logger.info('get-libraries-main');
  return DB.find({
    selector: {
      createdAt: { $gte: null },
    },
    fields: [
      'libraryPath',
      'libraryName',
      'libraryDesc',
      'createdAt',
      'treeCount',
      '_id',
      '_rev',
    ],
    sort: ['createdAt'],
  })
    .then(function (doc) {
      logger.info(`get-libraries-main : doc   ${doc}`);
      return doc;
    })
    .catch(function (error) {
      logger.error(`get-libraries-main error ${Error(error)}`);
    });
});

ipcMain.handle('get-library-by-id', async (event, arg) => {
  logger.info(`get-libraries-by-id-main : arg  ${arg}`);
  return DB.find({
    selector: {
      _id: { $gte: arg },
    },
    fields: [
      'libraryPath',
      'libraryName',
      'libraryDesc',
      'libraryTree',
      'treeCount',
      'createdAt',
      '_id',
      '_rev',
    ],
  })
    .then(function (doc) {
      logger.info(`get-libraries-by-id-main : doc  ${doc}`);
      return doc;
    })
    .catch(function (error) {
      logger.error(`get-libraries-by-id-main error ${new Error(error)}`);
    });
});

ipcMain.handle('browse-files', async (event, arg) => {
  logger.info('browse-files-main');
  if (mainWindow !== null) {
    return dialog
      .showOpenDialog(mainWindow, {
        properties: ['openFile', 'openDirectory'],
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        logger.error(`browse-files-main error ${new Error(error)}`);
      });
  }
  return null;
});

ipcMain.handle('get-drives', async (event, arg) => {
  return getDriveList().then((result) => {
    return result;
  });
});

ipcMain.handle('create-library', async (event, arg) => {
  let response;
  try {
    response = await DB.put(arg);
    return response;
  } catch (error: any) {
    logger.log('error', new Error(error));
  }
  return null;
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath(''),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
