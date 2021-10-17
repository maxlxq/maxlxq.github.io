
# 大文件上传

## 问题及分析

实现一个大文件上传和断点续传的 demo

核心：前端切片，并发上传，服务端合并处理

学习参考自[此网址](https://juejin.cn/post/6844904046436843527)

## 前端代码

```jsx
import React from 'react'

const request = ({
  url, method = 'post', data, headers = {}, requestList
}) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key])
    })
    xhr.send(data)
    xhr.onload = e => {
      resolve({
        data: e.target.response
      })
    }
  })
}

const SIZE = 10 * 1024 * 1024
const localUrl = 'http://localhost:3000'

class InputFile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
    }
  }

  handleFileChange = e => {
    const [file] = e.target.files
    if (!file) return
    this.setState({ file })
  }

  createFileChunk = (file, size = SIZE) => {
    const chunkList = []
    let cur = 0
    while(cur < file.size) {
      chunkList.push({ file: file.slice(cur, cur + size) })
      cur += size
    }
    return chunkList
  }

  uploadChunks = async (data) => {
    const { file } = this.state
    const requestList = data.map(({ chunk, hash }) => {
      const formData = new FormData()
      formData.append('chunk', chunk)
      formData.append('hash', hash)
      formData.append('filename', file.name)
      return { formData }
    }).map(async ({ formData }) => {
      request({ url: localUrl, data: formData })
    })
    await Promise.all(requestList)
    // 发送合并请求
    await this.mergeRequest()
  }

  handleUpload = async () => {
    const { file } = this.state
    if (!file) return
    const chunkList = this.createFileChunk(file)
    const data = chunkList.map(({ file }, index) => ({
      chunk: file,
      hash: file.name + '-' + index
    }))
    await this.uploadChunks(data)
  }

  mergeRequest = async () => {
    await request({
      url: 'https://localhost:3000/merge',
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify({
        filename: this.state.file.name
      })
    })
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileChange} />
        <button onClick={this.handleUpload}>上传</button>
      </div>
    )
  }
}
```

## 后端代码

