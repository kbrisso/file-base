// eslint-disable-next-line import/prefer-default-export
export const config = {
  autoCompileOpts: {
    autoCompile: true,
    // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
    // for all available options
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
    // tsconfig-paths is only used if "tsConfigPathsOpts" are provided, if you
    // do please make sure "tsconfig-paths" is installed as dependency
    tsConfigPathsOpts: {
      baseUrl: './',
    },
  },
  // ...
  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        binary:
          'C:\\Projects\\file-base\\release\\build\\win-unpacked\\file-base.exe', // Path to your Electron binary.
        args: [
          /* cli arguments */
        ], // Optional, perhaps 'app=' + /path/to/your/app/
      },
    },
  ],
  specs: ['./test/specs/**'],
};
