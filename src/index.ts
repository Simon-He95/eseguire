import pc from 'picocolors'
import { jsShell } from 'lazy-js-utils'
import { findFile, hasInstall, isDirectory } from './utils'
import { SUFFIX } from './constant'

export async function setup() {
  const filepath = process.argv[2]
  const isDebug = process.argv[3] === '--debug'
  if (!filepath) {
    console.log(pc.red('需要传入一个文件路径'))
    return
  }
  const hasSuffix = SUFFIX.some(suffix => filepath.endsWith(suffix))
  let executorPath
  if (!hasSuffix) {
    executorPath = findFile(filepath)
    if (!executorPath && await isDirectory(filepath))

      executorPath = findFile(`${filepath}/index`)
  }
  else {
    executorPath = filepath
  }

  if (!executorPath) {
    console.log(pc.red('未找到可执行文件'))
    return
  }

  if (hasInstall('bun'))
    jsShell(`bun ${isDebug ? '--inspect-wait ' : ''}${executorPath} `)
  else if (hasInstall('esno'))
    jsShell(`esno ${executorPath} `)
  else if (hasInstall('ts-node'))
    jsShell(`ts-node ${executorPath} `)
  else
    jsShell(`node ${executorPath} `)

  process.exit(0)
}

setup()
