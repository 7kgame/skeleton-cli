const path = require('path')
const fs = require('fs-extra')
const getMeta = require('./meta')
const generate = require('./generate')

const logger = require('./logger')

const remove = function (projectPath) {
  fs.removeSync(projectPath)  
}

exports.create = function (root, project) {
  let projectPath = path.resolve(root, project)
  let projectName = projectPath.replace((new RegExp(path.sep + '+$')), '').split(path.sep).slice(-1)[0]

  if (fs.pathExistsSync(projectPath)) {
    logger.fatal('project "%s" has exist in "%s"', projectName, projectPath)
    process.exit()
  }
  fs.mkdirpSync(projectPath, {recursive: true})
  let templatePath
  try {
    templatePath = fs.mkdirpSync(path.join(projectPath, '.'+projectName+'-'+(new Date).getTime()))
  } catch (err) {
    remove(projectPath)
    logger.fatal(err)
  }
  return {projectPath, projectName, templatePath}
}

exports.parseTemplate = function (projectPath, projectName, templatePath) {
  return new Promise((resolve, reject) => {
    try {
      const metas = getMeta(projectName, templatePath)
      generate(projectPath, templatePath, metas, (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve('')
      })
    } catch(err) {
      reject(err)
    }
  })
}

exports.remove = remove
