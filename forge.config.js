const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path')
const fs = require('node:fs/promises')

module.exports = {
  packagerConfig: {
    name: "Kligotest Win",
    executableName: "Kligo",
    asar: false,
    overwrite: true,
    platform: 'win32',
    arch: 'x64',
    prune: true,
    ignore: [
      "^/[.].+$",
      "^/build$",
      "^\\/node_modules$",
      "^\\/[.].+",
      "^\\/src$",
      "^\\/app",
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        language: 1033,
        manufacturer: "Me",
        name: 'Kligo',
        authors: 'Martin',
        description: "Description",
        exe: 'Kligo.exe',
        setupExe: 'KligoInstaller.exe',
      },
    },
  ],
  plugins: [
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  hooks: {
    postRushInstall: [
      "find ./common -name node_gyp_bins -type d -exec rm -r '{}' \\;"
    ],
    packageAfterPrune: [ async (_config, buildPath) => {
      console.log("ca joue le hook")
      const gypPath = path.join(
        buildPath,
        'resources',
        'app',
        'build',
        'node_gyp_bins'
      );
      await fs.rm(gypPath, {recursive: true, force: true});
    },
   ]
  }
};
