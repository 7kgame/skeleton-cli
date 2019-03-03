const path = require('path')
const fs = require('fs-extra')
const isUtf8 = require('is-utf8');
const glob = require('glob')
const ejs = require('ejs')
const async = require('async')

const options = require('./options')
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

const getIncludeFiles = function (patterns, templatePath) {
  if (!patterns) {
    return []
  }
  if (typeof patterns === 'string') {
    patterns = [patterns]
  }
  return glob.sync('**/?('+ patterns.join('|') +')', {
    cwd: templatePath
  })
}

exports.parseTemplate = function (projectPath, projectName, templatePath) {
  return new Promise((resolve, reject) => {
    options(projectName, templatePath)
      .then((metas) => {
        let includePatterns = metas.include
        let excludePattetns = metas.exclude
        if (!includePatterns || includePatterns.length < 1) {
          includePatterns = '**'
        }
        let includeFiles = getIncludeFiles(includePatterns, templatePath)
        let excludeFiles = getIncludeFiles(excludePattetns, templatePath)
        includeFiles = includeFiles.filter(fileName => {
          return excludeFiles.indexOf(fileName) < 0
        })
        async.each(includeFiles, (file, next) => {
          let filePath = path.join(templatePath, file)
          let encoding = metas.encoding || 'utf8'
          let content = fs.readFileSync(filePath, encoding)
          if (!content) {
            return next()
          }
          const tpl = ejs.compile(content, {delimiter: metas.delimiter || '%'}) 
          const res = tpl(metas.options)
          fs.writeFileSync(filePath, res, encoding)
          next()
        }, () => {
          const initScript = require(path.join(templatePath, 'init.js'))
          fs.copySync(path.join(templatePath, 'template'), projectPath)
          resolve('')
          initScript(projectName, projectPath, metas)
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}

exports.remove = remove
