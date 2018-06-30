import React, { Component } from 'react'

/**
 * 封装的异步加载的组件，使用方法如下：
 * // 引入该文件
 * import asyncImport from './bundle'
 * // 将引入的模块做处理
 * const Login = asyncImport(() => import('containers/Login'))
 * // 在 React-Router 中引用封装后的组件
 * <Switch>
 *    <Route path="/" exact component={Login} />
 * </Switch>
 * ...
 */
export default function asyncComponent (importComponent) {
  class AsyncComponent extends Component {
    constructor (props) {
      super(props)

      this.state = {
        component: null
      }
    }

    async componentDidMount () {
      const { default: component } = await importComponent()

      this.setState({
        component: component
      })
    }

    render () {
      const C = this.state.component

      return C ? <C {...this.props} /> : null
    }
  }

  return AsyncComponent
}
