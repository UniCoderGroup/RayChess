# RayChess

全球独一无二的**纸上+线上+离线**小游戏！

## 开发指南

### 文件概览

#### RayChess.sln

解决方案

包含如下四个项目

#### CppCore.vcxproj

游戏内核的C++实现

#### JsCore.vcxproj

游戏内核的TS实现，编译成JS

基本保持与[CppCore](#CppCore)同步

#### Win32TestApp.njsproj

Win32测试应用，不可玩

引用的库是[CppCore](#CppCore)

#### WebApp.njsproj

`React+TypeScript`版网页

为网页版目标

引用的本地npm是[JsCore](#JsCore)

### 编译测试

#### 运行WebApp预览

1. 安装npm（node.js）
2. 进入`WebApp`目录
3. 命令行运行`npm install`
4. 命令行运行`npm start`
5. 浏览器自动出现，看见网页

## 玩家指南

[null]

