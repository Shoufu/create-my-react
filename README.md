# create-my-react

这是一个仿 vue-cli 的一个 React webpack 脚手架，配置参考 [vue-cli@2.9.6](https://github.com/vuejs/vue-cli) 。

## 分支说明

实际开发的时候需要安装很多的第三方模块，有些模块会让使项目的部分代码发生变化。为了方便开发，我把常用的模块的配置抽取出来放到一个新的分支里，需要的时候直接在对应的分支上开发就能省去不少的麻烦。

所有的分支都是在 `master` 分支的基础上进行配置的，所以都具有 `master` 分支的功能。

- master：默认分支，只配置了 [**react-router**](https://github.com/ReactTraining/react-router) 和 [**react-redux**](https://github.com/reduxjs/react-redux) 两个平常开发最常用的模块；
- react-immutable：添加了 [**immutable**](https://github.com/facebook/immutable-js) ，并在 `redux` 里使用 `immutable` ；
- react-router-redux：添加了 [**react-router-redux**](https://github.com/reactjs/react-router-redux) ，在 `redux` 里能操作 `react-router` ；

## 如何使用

首先，当然是把项目保存到本地

```bash
$ git clone git@github.com:brilliantGuo/create-my-react.git <yourAppName>
$ cd <yourAppName>
```

选择自己一个想要开发的分支进行切换，这里以 `react-router-redux` 分支为例：

```BASH
$ git checkout -b react-router-redux origin/react-router-redux
```

然后，删除旧的 Git 项目，并替换成自己的 Git 仓库

```bash
$ rm -rf .git
$ git init
```

如果很在意项目信息的话，还需要修改 `package.json` 里面的一些信息

```json
{
  "name": "create-my-react",
  "version": "1.0.0",
  "description": "A react scaffold referred to vue-cli",
  "author": "GYMing <gyming@outlook.com>",
  "license": "MIT",
  "repository": {
    "url": "git@github.com:brilliantGuo/create-my-react.git",
    "type": "git"
  }
}
```

接着，安装项目依赖

```bash
$ npm install
```

差不多可以运行项目了，但是由于该项目使用了 webpack 的 DLLPlugin 的功能，所以**第一次运行项目**或者**项目依赖有更新**的时候，需要运行以下命令来创建或者更新 dll 文件

```bash
$ npm run dll
```

最后，选择一条命令来运行项目

```bash
# 开发环境时运行，启动一个服务器，支持 HMR 热重载
$ npm run dev

# 在开发的时候，可以直接运行下面的命令来创建 dll 文件，并启动一个本地服务器
$ npm run dev:first

# 编译项目，对各个文件进行压缩
$ npm run build

# 编译项目，并查看编译后的各个文件细节
$ npm run build --report

# 同 npm run dev
$ npm start
```

## 该项目做了哪些优化？

1. 添加了 [DllPlugin](https://webpack.js.org/plugins/dll-plugin/) ，加快开发时的重构速度；[#8019a1d](https://github.com/brilliantGuo/create-my-react/commit/8019a1d3ca8785b1476c036a97a3e373134b7270)
2. 修复了开发环境下 CSS 不能热更新的问题；[#3bc248c](https://github.com/brilliantGuo/create-my-react/commit/3bc248cd6f0eb1ab911b553e4bbfbb3b3d5de9fb) 
3. 添加了 [PreloadWebpackPlugin](https://github.com/GoogleChromeLabs/preload-webpack-plugin) ，提前加载异步加载的组件；[#7e17861](https://github.com/brilliantGuo/create-my-react/commit/7e178611662540a9ca1e321597fc4d2614083012)
4. 结合 webpack3 的新特性对项目进行整合（例如 Scope Hositing 等）；
5. 封装了一些常用的组件，比如异步加载和 pureRender（需要 immutable 库，具体请切换到 react-immutable 分支查看）；

这些优化都是自己平时的工作经验和在社区看到的一些资料总结下来的，可能并不是特别的系统。如果存在可以优化之处，还请各位小伙伴提个 issue 或者 PR ，我会尽快做好更新。