const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path')
const {platform} = require("cmake-js/lib/environment");

module.exports = {
  packagerConfig: {
    name: "Kligotest Win",
    executableName: "Kligo",
    asar: {
      unpack: '**/node_modules/@abandonware/noble/**/*'
    },
    overwrite: true,
    platform: 'win32',
    arch: 'x64',
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
};
