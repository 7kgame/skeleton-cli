const path = require('path')
const fs = require('fs-extra')
const async = require('async')
const inquirer = require('inquirer')
const hoek = require('hoek')

const getGitUser = require('./git-user')

const setDefault = function (prompt, name, value) {
  if (prompt.name === name && !prompt.default) {
    prompt.default = value
  }
}

module.exports = function options (name, dir) {
  const js = path.join(dir, 'meta.js')
  let metaJS
  if (fs.pathExistsSync(js)) {
    metaJS = require(js)
    if (metaJS !== Object(metaJS)) {
      throw new Error('meta.js needs to expose an object')
    }
  } else {
    metaJS = {}
  }
  const metas = metaJS || {}
  metas.options = metas.options || {}
  metas.options.name = metas.options.name || name
  metas.options.author = metas.options.author || getGitUser()

  return new Promise((resolve, reject) => {
    if (metaJS.prompts && typeof metaJS.prompts === 'object') {
      let prompts = metaJS.prompts
      if (!Array.isArray(prompts)) {
        prompts = []
        Object.keys(metaJS.prompts).forEach(key => {
          let prompt = metaJS.prompts[key]
          prompt.name = key
          prompts.push(prompt)
        })
      }
      prompts.forEach(prompt => {
        setDefault(prompt, 'name', metas.options.name)
        setDefault(prompt, 'author', metas.options.author)
      })
      delete metas.prompts
      inquirer.prompt(prompts)
        .then(answers => {
          hoek.merge(metas.options, answers, false, true)
          resolve(metas)
        })
        .catch(e => {
          reject(e)
        })
    }
  })
}
