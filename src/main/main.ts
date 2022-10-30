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
import { nanoid } from 'nanoid';
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import Drive from 'node-disk-info/dist/classes/drive';
import PouchDB from 'pouchdb';
import Find from 'pouchdb-find';
import { DirectoryTree, DirectoryTreeCallback, } from 'directory-tree';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

/* function getFiles(): void {
  const api = new fdir()
    .withFullPaths()
    .crawl('C:\\Users\\kbrisso\\Downloads\\Photos');
  const files = api.sync();
  console.log(files);
}
*/

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
  transports: [],
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
PouchDB.plugin(Find);

const dbFileBase = new PouchDB('./db/file-base', { adapter: 'leveldb' });
const dbFileExtensions = new PouchDB('./db/file-base-fe', {
  adapter: 'leveldb',
});
const dbTags = new PouchDB('./db/file-base-tags', { adapter: 'leveldb' });

// Use this to push data to CouchDB
const remoteFilebaseDB = new PouchDB(
  'http://kbrisso:!kmbcpm22@localhost:5984/file-base'
);

const remoteFileExtensionsDB = new PouchDB(
  'http://kbrisso:!kmbcpm22@localhost:5984/file-base-fe'
);

dbFileBase.replicate
  .to(remoteFilebaseDB)
  .on('complete', function () {
    logger.log('info', 'replication-started');
  })
  .on('error', function (err) {
    logger.log('error', err);
  });

dbFileBase
  .sync(remoteFilebaseDB, {
    live: true,
  })
  .on('change', function (change) {
    logger.log('info', 'replication-changed');
  })
  .on('error', function (err) {
    logger.log('error', err);
  });

dbFileExtensions.replicate
  .to(remoteFileExtensionsDB)
  .on('complete', function () {
    logger.log('info', 'replication-started-fe');
  })
  .on('error', function (err) {
    logger.log('error', err);
  });

dbFileExtensions
  .sync(remoteFileExtensionsDB, {
    live: true,
  })
  .on('change', function (change) {
    logger.log('info', 'replication-changed-fe');
  })
  .on('error', function (err) {
    logger.log('error', err);
  });

/**
 DB.destroy()
 .then(function () {
    // database destroyed
  })
 .catch(function (error) {
    logger.log('error', new Error(error));
  });
**/

dbFileBase
  .createIndex({
    index: { fields: ['createdAt', '_id'] },
  })
  .catch();

dbFileBase
  .createIndex({
    index: {
      fields: [
        'libraryTree.children.[].name',
        'libraryTree.children.[].path',
        'libraryTree.children.[].type',
        'libraryTree.children.[].extension',
      ],
    },
  })
  .catch();

dbFileBase
  .info()
  .then(function (info: any) {
    logger.info(JSON.stringify(info));
  })
  .catch((error: string | undefined) => logger.log('error', new Error(error)));

dbFileExtensions
  .info()
  .then(function (info: any) {
    logger.info(JSON.stringify(info));
  })
  .catch((error: string | undefined) => logger.log('error', new Error(error)));

const callback: DirectoryTreeCallback = (item: DirectoryTree) => {
  item.custom = { id: nanoid() };
};

ipcMain.handle('get-dir-tree', async (event, arg) => {
  let tree: DirectoryTree & { id?: string };
  try {
    tree = dirTree(
      arg,
      {
        attributes: ['mtime', 'size', 'type', 'extension', 'birthtime'],
        normalizePath: true,
      },
      callback
    );
    return tree;
  } catch (error: any) {
    logger.error(`get-dir-tree-main ${Error(error)}`);
  }
  return null;
});

ipcMain.handle('get-libraries', async (event, arg) => {
  let doc = null;
  try {
    doc = await dbFileBase.find({
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
    });
  } catch (error: any) {
    logger.error(`get-libraries-main ${new Error(error)}`);
  }
  return doc;
});

ipcMain.handle('get-library-by-id', async (event, arg) => {
  let doc = null;
  try {
    doc = await dbFileBase.find({
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
    });
  } catch (error: any) {
    logger.error(`get-libraries-main ${new Error(error)}`);
  }
  return doc;
});

ipcMain.handle('browse-files', async (event, arg) => {
  if (mainWindow !== null) {
    return dialog
      .showOpenDialog(mainWindow, {
        properties: ['openFile', 'openDirectory'],
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        logger.error(`browse-files-main ${new Error(error)}`);
      });
  }
  return null;
});

ipcMain.handle('get-file-extensions', async (event, arg) => {
  let response = null;
  try {
    response = await dbFileExtensions.allDocs({ include_docs: true });
    return response;
  } catch (error: any) {
    logger.error(`et-file-extensions ${new Error(error)}`);
  }
  return response;
});

ipcMain.handle('get-drives', async (event, arg) => {
  return getDriveList().then((result) => {
    return result;
  });
});

ipcMain.handle('create-library', async (event, arg) => {
  let response = null;
  try {
    response = await dbFileBase.put(arg);
    return response;
  } catch (error: any) {
    logger.log('error', new Error(error));
  }
  return response;
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
