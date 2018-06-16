import { message } from 'antd'

export function requestErrorHandler(error) {
  let errorMessage = ''
  if (error instanceof TypeError) {
    errorMessage = '网络连接出现问题！请检查您的网络！'
  } else {
    switch (error.status) {
      case 401:
        errorMessage = '用户名或密码错误！请重新输入！'; break
      case 403:
        errorMessage = '缺少权限！'; break
      case 404:
        errorMessage = '没有找到该端口！请确认输入信息无误！'; break
      case 409:
        errorMessage = '端口已被占用！请换一个空闲的端口！'; break
      case 500:
        errorMessage = '服务器出现错误！请稍后再试！'; break
      case 504:
        errorMessage = '连接不到服务器！请确认后台服务器正在运行！'; break
    }
  }

  message.error(errorMessage)
}
