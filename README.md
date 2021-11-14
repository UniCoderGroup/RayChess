# RayChess

全球独一无二的 **纸上** 模拟器！

## 开发指南

### 文件概览

#### ./RayChess.sln

解决方案

包含如下四个项目：

##### ./WebApp/WebApp.njsproj

实现：`React + TypeScript`

为网页版目标

##### ./JsCore/JsCore.njsproj

*已废弃*

游戏内核的`TypeScript`实现

### 编译测试

#### 先决条件

- Windows操作系统
- Microsoft Visual Studio 2019
  - 安装拓展：[NPM Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner)
- Git
- Node.js

#### 初始化

运行`Scripts`文件夹中的`init.sh`

> 可以使用`git-bash`运行

#### 运行WebApp预览

> 一般情况下，打开解决方案时，VS2019回自动运行预览

##### 手动方法一

1. 在VS2019中，打开`任务运行程序资源管理器`
2. 选择`WebApp`
3. 右键`package.json/Defaluts/start`运行

##### 手动方法二

1. 在`WebApp`文件夹下运行`npm start`

## 作者

开发：[KermanX](https://KermanX.github.io/) @ [UniCoderGroup](https://unicodergroup.github.io/)

配乐：[弦歌笙生](https://space.bilibili.com/1813903217/)

文案：王添添

本纸上游戏发明者(据传)是文渊中学高中部2018或2019级学生。这是本项目的根基之所在。
