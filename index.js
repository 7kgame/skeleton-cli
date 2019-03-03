#!/usr/bin/env node

const download = require('download-git-repo')
const program = require('commander')
const path = require('path')
const fs = require('fs-extra')
const os = require('os')
const ora = require('ora')
const home = require('user-home')
const chalk = require('chalk')
const inquirer = require('inquirer')

const logger = require('./lib/logger')
const getTemplate = require('./lib/template')
const project = require('./lib/project')

program
  .usage('<template-name> [project-name]')

program.on('--help', () => {
  console.log('  Examples:')
  console.log()
  console.log(chalk.gray('    # create a new project from a github template'))
  console.log('    $ skeleton username/repo my-project')
  console.log()
  console.log(chalk.gray('    # create a new project from local template'))
  console.log('    $ skeleton /absolute/path/to/local-repo my-project')
  console.log()
})

function help () {
  program.parse(process.argv)
  if (program.args.length < 2) {
    return program.help()
  }
}
help()

const root = process.cwd()
let success = false

let { projectPath, projectName, templatePath } = project.create(root, program.args[1])

getTemplate(root, program.args[0], templatePath).then(()=> {
  project.parseTemplate(projectPath, projectName, templatePath)
    .then( res => {
      fs.removeSync(templatePath)
      success = true
      logger.success('project "' + projectName + '" created.')
    })
}).catch((err) => {
  project.remove(projectPath)
  logger.fatal(err)
})

const exitHandler = function (err) {
  if (success) {
    return
  }
  project.remove(projectPath)
  logger.fatal(err)
}

process.on('uncaughtException', exitHandler)
process.on('exit', exitHandler)
process.on('SIGINT', exitHandler)
process.on('SIGUSR1', exitHandler)
process.on('SIGUSR2', exitHandler)
