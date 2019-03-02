## 简介
  skeleton-cli 是一个通过项目模版来创建项目的构建工具，借鉴了[vue-cli@2.x](https://github.com/vuejs/vue-cli/tree/v2.9.3)的实现。  
  基本逻辑是通过项目模版的复制和修改，来搭建新的项目工程，避免了项目创建时各种重复配置的繁琐。  
  **项目复制**，依赖[download-git-repo](https://github.com/flipxfx/download-git-repo)，从GitHub | GitLab | Bitbucket | \*.zip下载和解压项目；同时skeleton-cli也支持指定本地模版项目。  
  **项目修改**，依赖模版引擎[handlebars](https://github.com/wycats/handlebars.js)和命令行交互式工具[inquirer](https://github.com/SBoudrias/Inquirer.js)，实现了以命令行交互式方式修改项目文件的工程构建流程。  
  skeleton-cli 依赖nodejs环境，支持各类编程语言的项目搭建。

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

