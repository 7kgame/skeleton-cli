const path = require('path')
const fs = require('fs-extra')

module.exports = function (projectName, projectPath, template, done) {
  const postScript = path.join(template, 'init.js')
  let err = null
  try {
    if (fs.pathExistsSync(postScript)) {
      require(postScript)(projectName, projectPath, template)
    }
  } catch(err0) {
    err = err0
  }
  done && done(err)
}
