# create-my-react

这是一个仿 vue-cli 的一个 React webpack 脚手架，配置参考 [vue-cli@2.9.6](https://github.com/vuejs/vue-cli) 。

## 使用说明

首先，当然是把项目保存到本地

```bash
git clone git@github.com:brilliantGuo/create-my-react.git <yourAppName>
cd <yourAppName>
```

然后，删除旧的 Git 项目，并替换成自己的 Git 仓库

```bash
rm -rf .git
git init
```

如果很在意项目信息的话，还需要修改 `package.json` 里面的一些信息

```json
{
  "name": "create-my-react",
  "version": "1.0.0",
  "description": "A react scaffold referred to vue-cli",
  "author": "brilliantGuo <gyming@outlook.com>",
  "license": "MIT",
  "repository": {
    "url": "git@github.com:brilliantGuo/create-my-react.git",
    "type": "git"
  }
}
```

接着，安装项目依赖

```bash
npm install
```

最后，选择一条命令来运行项目

```bash
# 开发环境时运行，启动一个服务器，支持 HMR 热重载
npm run dev

# 编译项目，压缩文件
npm run build

# 编译项目，并查看编译后的各个文件细节
npm run build --report

# 同 npm run dev
npm start

# 根据 ESLint 校验项目代码，并对不符合规范的代码进行修复
npm run eslint-fix

# 根据 git 提交规范，生成项目 changelog
npm run changelog
```

新的脚手架接入了 `commitizen` 包来实现 git commit 提交日志的校验。如果是第一次接触 commitizen 的话，需要全局安装并配置：

```sh
npm install commitizen -g

# 配置提交规范
commitizen init cz-conventional-changelog --save-dev --save-exact
# 如果是用 yarn 安装，则换成下面的命令
commitizen init cz-conventional-changelog --yarn --dev --exact

# 全局模式下，需要 `~/.czrc` 配置文件
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```

## 该项目做了哪些优化？

1. 升级到 Webpack 4 最新版本，最新最简单的 Webpack 配置。需要配置的选项已经抽离出来放在 `config/index.js` 文件，除非想了解或自己更新 Webpack 配置，否则无需关心 build 文件夹的内容；
2. 支持 TypeScript，可以直接使用 TS 进行开发了；
3. 接入 ESlint、Prettier 等前端开发工具，保证代码规范；
4. 使用 [HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) 替换 [DllPlugin](https://webpack.js.org/plugins/dll-plugin/)，开发、构建速度极大提高；
5. 修复了开发环境下 CSS 不能热更新的问题；[#3bc248c](https://github.com/brilliantGuo/create-my-react/commit/3bc248cd6f0eb1ab911b553e4bbfbb3b3d5de9fb)
6. 封装一些常用组件，比如提前加载异步加载的组件；[#7e17861](https://github.com/brilliantGuo/create-my-react/commit/7e178611662540a9ca1e321597fc4d2614083012)

这些优化都是自己平时的工作经验和在社区看到的一些资料总结下来的，可能并不是特别的系统。如果存在可以优化之处，还请各位小伙伴提个 issue 或者 PR ，我会尽快做好更新。

## 关于 ESlint 和 Prettier 配置

项目使用 ESlint Standard 标准来检查代码错误和代码规范。这次的升级中，只用升级 ESlint 及对应的包版本即可。另外项目使用 Prettier 来格式化代码了，只需要在对应的 IDE 里安装 Prettier 插件，然后在格式化时选择 Prettier 即可。

使用 Prettier 格式化代码时可能与 ESlint Standard 规范有冲突，由于目前 Prettier 未能完全符合 Standard 规范标准，可以通过补充 Prettier 配置来尽量符合 Standard 规范。有些地方的冲突无法避免，这个时候建议手动修改代码像规范靠拢，尽量避免修改 ESlint 规则。

我的想法是，代码检查风格（如 ESlint）应该和代码格式化工具（如 Prettier）的规则相匹配，没必要盲目追求更严格的规则，如 Airbnb。过于严格的规则容易引发 ESlint 与 Prettier 的冲突，为了解决 ESlint 错误，每次使用 Prettier 格式化后需要手动在修改一次代码，有时候很影响开发体验。人都是懒惰的，有些同事为了避免报错，在写完代码后并不会手动使用 Prettier 格式化代码，项目的代码风格更容易乱。虽然可以配置代码保存后强制使用 Prettier 格式化代码，但是在一些细节上 ESlint 与 Prettier 总是有冲突，这个时候再去修改规则容易影响项目开发进度和质量。所以严格的检查规则并不一定是最好的，能与格式化工具相结合才是最符合团队开发的规范。
