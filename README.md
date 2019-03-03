## 简介
  skeleton-cli 是一个通过项目模版来创建项目的构建工具，借鉴了[vue-cli@2.x](https://github.com/vuejs/vue-cli/tree/v2.9.3)的实现。
  
一般来讲，一个项目的搭建基本会包含以下几个方面的设计： 
- 目录结构
- 依赖管理
- 环境配置（测试、编码风格等）

在一个团队中，如果这些工作每次都需要手工一步步执行，成本将非常高。

通过模版工程来创建新项目是一个解决方案，skeleton-cli 是该方案的nodejs版实现，支持各类编程语言的项目搭建。

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

## skeleton-cli 执行流程
#### 1、下载模版工程
依赖[download-git-repo](https://github.com/flipxfx/download-git-repo)，从GitHub | GitLab | Bitbucket | \*.zip下载和解压项目；同时skeleton-cli也支持指定本地模版项目。  
#### 2、编辑项目基本信息
命令行交互式工具[inquirer](https://github.com/SBoudrias/Inquirer.js)
#### 3、修改项目
模版引擎[ejs](https://github.com/mde/ejs)
#### 4、执行初始化脚本

## 项目模版结构说明
#### meta.js

#### template
#### init.js

## TODOS


