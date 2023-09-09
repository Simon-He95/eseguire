import fs from 'fs'
import { jsShell } from 'lazy-js-utils'
import { SUFFIX } from './constant'

export function hasInstall(dep: string) {
  const { status } = jsShell(
    `${dep} -v`,
    'pipe',
  )
  return status === 0
}

export function isDirectory(path: string) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err)
        reject(err)
      else
        resolve(stats.isDirectory())
    })
  })
}

export function findFile(filepath: string) {
  for (const suffix of SUFFIX) {
    const url = `${filepath}${suffix}`
    if (fs.existsSync(url))
      return url
  }
}
