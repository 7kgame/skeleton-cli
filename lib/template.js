const download = require('download-git-repo')
const fs = require('fs-extra')
const ora = require('ora')

const logger = require('./logger')

const copy = function (src, dest) {
  try {
    fs.copySync(src, dest, {
      overwrite: false,
      errorOnExist: true
    })
  } catch(err) {
    return err
  }
}

const getTemplatefromLocal = function (template, resolve, reject, dest) {
  const spinner = ora('copy template')
  spinner.start()
  let err = copy(template, dest)
  spinner.stop()
  if (err) {
    reject(err)
  } else {
    resolve('')
  }
}

const getTemplatefromGit = function (template, resolve, reject, dest) {
  const spinner = ora('downloading template')
  spinner.start()
  download(template, dest, {}, (err) => {
    spinner.stop()
    if (err) {
      reject(err)
    } else {
      resolve('')
    }
  })
}

module.exports = function getTemplate (root, template, dest) {
  return new Promise((resolve, reject) => {
    const hasSlash = template.indexOf('/') > -1
    if (!hasSlash) {
      reject('template format: githubusername/repo | /absolute/to/local-repo')
    } else {
      (/^[./]|(^[a-zA-Z]:)/.test(template))
        ? getTemplatefromLocal(template, resolve, reject, dest) 
        : getTemplatefromGit(template, resolve, reject, dest)
    }
  })
}
