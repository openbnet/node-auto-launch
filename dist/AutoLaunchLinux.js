var fileBasedUtilities, untildify;

untildify = require('untildify');

fileBasedUtilities = require('./fileBasedUtilities');

module.exports = {

  /* Public */
  enable: function(arg) {
    var appName, appPath, args, data, extraArgs, hiddenArg, isHiddenOnLaunch;
    appName = arg.appName, appPath = arg.appPath, isHiddenOnLaunch = arg.isHiddenOnLaunch, extraArgs = arg.extraArgs;
    hiddenArg = isHiddenOnLaunch ? ' --hidden' : '';
    args = extraArgs != null ? hiddenArg + ' ' + extraArgs : hiddenArg;
    data = "[Desktop Entry]\nType=Application\nVersion=1.0\nName=" + appName + "\nComment=" + appName + " startup script\nExec=" + appPath + args + "\nStartupNotify=false\nTerminal=false";
    return fileBasedUtilities.createFile({
      data: data,
      directory: this.getDirectory(),
      filePath: this.getFilePath(appName)
    });
  },
  disable: function(appName) {
    return fileBasedUtilities.removeFile(this.getFilePath(appName));
  },
  isEnabled: function(appName) {
    return fileBasedUtilities.isEnabled(this.getFilePath(appName));
  },

  /* Private */
  getDirectory: function() {
    return untildify('~/.config/autostart/');
  },
  getFilePath: function(appName) {
    return "" + (this.getDirectory()) + appName + ".desktop";
  }
};
