export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase()
  url = process.env.BASE_API + url
  if (type === 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '&' + dataStr
    }
  }
  return new Promise((resolve, reject) => {
    let requestObj
    if (window.XMLHttpRequest) {
      requestObj = new XMLHttpRequest()
    } else {
      // requestObj = new ActiveXObject("Microsoft.XMLHTTP")
    }
    let sendData = ''
    console.log(data)
    if (type === 'POST') {
      let dataStr = '' //  数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        sendData = dataStr
      }
      // sendData = JSON.stringify(data)
    }
    // console.log(sendData)
    console.log(requestObj)
    requestObj.open(type, url, true)
    // requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
    // requestObj.send(sendData)
    requestObj.send(sendData)

    requestObj.onreadystatechange = () => {
      if (requestObj.readyState === 4) {
        if (requestObj.status === 200) {
          let obj = requestObj.response
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj)
          }
          resolve(obj)
        } else {
          reject(requestObj)
        }
      }
    }
  })
}
