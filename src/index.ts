import pc from 'picocolors'
import { jsShell } from 'lazy-js-utils'
import { getArgs } from '@simon_he/qargs'
import { name, version } from '../package.json'
import { findFile, hasInstall, isDirectory } from './utils'
import { SUFFIX } from './constant'

export async function setup() {
  const filepath = process.argv[2]
  const args = getArgs()
  if (args.has('V') || args.has('version')) {
    console.log(pc.blue(`${name} v${version}`))
    return
  }
  else if (args.has('h') || args.has('help')) {
    console.log(pc.blue(`Usage: ${name} [options] [file]`))
    console.log()
    console.log(pc.blue('Options:'))
    console.log(pc.blue('  -h, --help      Show this help message'))
    console.log(pc.blue('  -V, --version   Show version'))
    console.log(pc.blue('  -d, --debug     Run in debug mode'))
    console.log(pc.blue('  fileDir or filepath     Run '))
    return
  }
  const isDebug = args.has('debug') || args.has('d')
  const params = process.argv.slice(3)
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
  console.log(`bun ${isDebug ? '--inspect-wait ' : ''}${executorPath} ${params.join(' ')}`)
  if (hasInstall('bun'))
    jsShell(`bun ${isDebug ? '--inspect-wait ' : ''}${executorPath} ${params.join(' ')}`)
  else if (hasInstall('esno'))
    jsShell(`esno ${executorPath} ${params.join(' ')}`)
  else if (hasInstall('ts-node'))
    jsShell(`ts-node ${executorPath} ${params.join(' ')}`)
  else
    jsShell(`node ${executorPath} ${params.join(' ')}`)

  process.exit(0)
}

setup()
