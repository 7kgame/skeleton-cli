## 简介
  skeleton-cli是一个通过项目模版来创建项目的构建工具，借鉴了[vue-cli@2.x](https://github.com/vuejs/vue-cli/tree/v2.9.3)的实现。  
  基本逻辑是通过模版文件的复制和修改，实现基于指定的项目模版来搭建项目工程；避免了项目创建时各种重复配置的繁琐。  
  **文件复制**，依赖[download-git-repo](https://github.com/flipxfx/download-git-repo)，实现了基于GitHub | GitLab | Bitbucket | \*.zip文件的下载和解压；同时skeleton-cli也支持指定本地目录来复制项目。  
  **文件修改**，依赖模版引擎[handlebars](https://github.com/wycats/handlebars.js)和命令行交互式工具[inquirer](https://github.com/SBoudrias/Inquirer.js)，实现了项目文件通过命令行交互式修改文件的功能。

## 安装
```
npm install -g skeleton-cli
# OR
yarn global add skeleton-cli
```

## 使用
#### 模版在github
```
skeleton 7kgame/tpl-node-web my-project
```
#### 模版在本地
```
skeleton $local/template/path my-project
```
#### zip模版文件
```
skeleton https://github.com/7kgame/tpl-node-web/archive/master.zip my-project
```

## 项目模版结构说明
#### meta.js

#### template
#### init.js

