const childProcess = require('child_process');

export function hasInstall(dep:string){
  return isNpmInstall(dep) || isPnpmInstall(dep) || isBrewInstall(dep);
}


function isNpmInstall(packageName:string){
  try {
    childProcess.execSync(`npm list -g ${packageName}`);
    return true; // 包已全局安装
  } catch (error) {
    return false; // 包未全局安装
  }
}

function isPnpmInstall(packageName:string){
  try {
    childProcess.execSync(`pnpm list -g ${packageName}`);
    return true; // 包已全局安装
  } catch (error) {
    return false; // 包未全局安装
  }
}


function isBrewInstall(packageName:string){
  try {
    childProcess.execSync('brew list').includes(packageName);
    return true; // 包已全局安装
  } catch (error) {
    return false; // 包未全局安装
  }
}
