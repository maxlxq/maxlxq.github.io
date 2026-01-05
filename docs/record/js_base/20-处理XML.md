# 处理 XML

XML 是 Web 开发中常用的数据交换格式，JavaScript 提供了处理 XML 的多种方法。

## DOMParser 和 XMLSerializer

```javascript
// 解析 XML 字符串
const parser = new DOMParser()
const xmlString = `
<books>
  <book id="1">
    <title>JavaScript 高级程序设计</title>
    <author>Nicholas C. Zakas</author>
  </book>
</books>`

const xmlDoc = parser.parseFromString(xmlString, 'text/xml')

// 检查解析错误
if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
  console.error('XML parsing error')
} else {
  console.log('XML parsed successfully')
}

// 序列化 XML
const serializer = new XMLSerializer()
const xmlOutput = serializer.serializeToString(xmlDoc)
console.log(xmlOutput)
```

## XPath

```javascript
// 创建 XPathEvaluator
const evaluator = new XPathEvaluator()

// 基本 XPath 查询
function evaluateXPath(xmlDoc, expression) {
  const result = evaluator.evaluate(expression, xmlDoc, null, XPathResult.ANY_TYPE, null)

  switch (result.resultType) {
    case XPathResult.NUMBER_TYPE:
      return result.numberValue

    case XPathResult.STRING_TYPE:
      return result.stringValue

    case XPathResult.BOOLEAN_TYPE:
      return result.booleanValue

    case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
    case XPathResult.ORDERED_NODE_ITERATOR_TYPE:
      const nodes = []
      let node
      while (node = result.iterateNext()) {
        nodes.push(node)
      }
      return nodes

    default:
      return result
  }
}

// 使用示例
const books = evaluateXPath(xmlDoc, '//book')
const titles = evaluateXPath(xmlDoc, '//title/text()')
const firstBook = evaluateXPath(xmlDoc, '/books/book[1]')
const count = evaluateXPath(xmlDoc, 'count(//book)')
```

## XSLT

```javascript
// XSLT 转换
const xsltString = `
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <body>
        <h1>图书列表</h1>
        <ul>
          <xsl:for-each select="//book">
            <li>
              <strong><xsl:value-of select="title"/></strong>
              by <xsl:value-of select="author"/>
            </li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`

// 解析 XSLT
const xsltDoc = parser.parseFromString(xsltString, 'text/xml')

// 创建 XSLT 处理器
const processor = new XSLTProcessor()
processor.importStylesheet(xsltDoc)

// 转换 XML
const resultDoc = processor.transformToDocument(xmlDoc)
const htmlOutput = serializer.serializeToString(resultDoc)
console.log(htmlOutput)
```

## XML 与 JSON 转换

```javascript
// XML 转 JSON
function xmlToJson(xml) {
  const obj = {}

  if (xml.nodeType === 1) {  // 元素节点
    if (xml.attributes.length > 0) {
      obj['@attributes'] = {}
      for (let attr of xml.attributes) {
        obj['@attributes'][attr.nodeName] = attr.nodeValue
      }
    }
  } else if (xml.nodeType === 3) {  // 文本节点
    return xml.nodeValue
  }

  if (xml.hasChildNodes()) {
    for (let child of xml.childNodes) {
      const childName = child.nodeName

      if (obj[childName] === undefined) {
        obj[childName] = xmlToJson(child)
      } else {
        if (!Array.isArray(obj[childName])) {
          obj[childName] = [obj[childName]]
        }
        obj[childName].push(xmlToJson(child))
      }
    }
  }

  return obj
}

// JSON 转 XML
function jsonToXml(obj, rootName = 'root') {
  let xml = ''

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (Array.isArray(obj[prop])) {
        for (let item of obj[prop]) {
          xml += `<${prop}>${jsonToXml(item)}</${prop}>`
        }
      } else if (typeof obj[prop] === 'object') {
        xml += `<${prop}>${jsonToXml(obj[prop])}</${prop}>`
      } else {
        xml += `<${prop}>${obj[prop]}</${prop}>`
      }
    }
  }

  return `<${rootName}>${xml}</${rootName}>`
}

// 使用示例
const json = xmlToJson(xmlDoc.documentElement)
console.log(JSON.stringify(json, null, 2))

const xml = jsonToXml(json)
console.log(xml)
```

## SOAP Web 服务

```javascript
// 创建 SOAP 请求
function createSOAPRequest(method, params) {
  return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <${method} xmlns="http://example.com/webservice">
      ${Object.entries(params).map(([key, value]) =>
        `<${key}>${value}</${key}>`
      ).join('')}
    </${method}>
  </soap:Body>
</soap:Envelope>`
}

// 发送 SOAP 请求
async function callSOAPWebService(url, method, params) {
  const soapRequest = createSOAPRequest(method, params)

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'SOAPAction': `"http://example.com/webservice/${method}"`
    },
    body: soapRequest
  })

  const soapResponse = await response.text()

  // 解析 SOAP 响应
  const xmlResponse = parser.parseFromString(soapResponse, 'text/xml')
  const result = xmlResponse.getElementsByTagName('result')[0]

  return result ? result.textContent : null
}

// 使用示例
callSOAPWebService('http://example.com/soap', 'AddNumbers', {
  a: 10,
  b: 20
}).then(result => console.log('Result:', result))
```

## RSS/Atom Feed 处理

```javascript
// 解析 RSS Feed
async function parseRSSFeed(url) {
  const response = await fetch(url)
  const xmlText = await response.text()
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml')

  // 检查是否为 RSS
  const rssElement = xmlDoc.querySelector('rss')
  if (rssElement) {
    return parseRSSElement(xmlDoc)
  }

  // 检查是否为 Atom
  const feedElement = xmlDoc.querySelector('feed')
  if (feedElement) {
    return parseAtomElement(xmlDoc)
  }

  throw new Error('Unsupported feed format')
}

function parseRSSElement(xmlDoc) {
  const items = xmlDoc.querySelectorAll('item')
  return Array.from(items).map(item => ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description').textContent,
    pubDate: item.querySelector('pubDate').textContent
  }))
}

function parseAtomElement(xmlDoc) {
  const entries = xmlDoc.querySelectorAll('entry')
  return Array.from(entries).map(entry => ({
    title: entry.querySelector('title').textContent,
    link: entry.querySelector('link').getAttribute('href'),
    summary: entry.querySelector('summary').textContent,
    updated: entry.querySelector('updated').textContent
  }))
}

// 使用示例
parseRSSFeed('https://example.com/feed.xml')
  .then(articles => console.log(articles))
  .catch(error => console.error('Feed parsing error:', error))
```

## XML 验证

```javascript
// 使用 XSD 验证（如果浏览器支持）
function validateXML(xmlDoc, xsdDoc) {
  if (typeof xmlDoc.validateNode === 'function') {
    const result = xmlDoc.validateNode(xmlDoc.documentElement)
    return result === 0  // 0 表示有效
  }

  // 基本验证：检查必需元素
  const requiredElements = ['title', 'author', 'year']
  for (let element of requiredElements) {
    if (!xmlDoc.querySelector(element)) {
      return false
    }
  }

  return true
}

// 自定义验证规则
function validateBookXML(xmlDoc) {
  const errors = []

  // 检查根元素
  if (xmlDoc.documentElement.tagName !== 'book') {
    errors.push('Root element must be "book"')
  }

  // 检查必需字段
  const required = ['title', 'author']
  for (let field of required) {
    if (!xmlDoc.querySelector(field)) {
      errors.push(`Missing required element: ${field}`)
    }
  }

  // 检查年份格式
  const yearElement = xmlDoc.querySelector('year')
  if (yearElement) {
    const year = parseInt(yearElement.textContent)
    if (isNaN(year) || year < 1000 || year > new Date().getFullYear()) {
      errors.push('Invalid year format')
    }
  }

  return errors
}

// 使用验证
const validationErrors = validateBookXML(xmlDoc)
if (validationErrors.length > 0) {
  console.log('Validation errors:', validationErrors)
} else {
  console.log('XML is valid')
}
```

## 总结

XML 处理是 Web 开发中的重要技术：

1. **DOMParser/XMLSerializer**：解析和序列化 XML
2. **XPath**：强大的 XML 查询语言
3. **XSLT**：XML 到其他格式的转换
4. **XML/JSON 转换**：数据格式互转
5. **SOAP Web 服务**：基于 XML 的 Web 服务调用
6. **RSS/Atom Feed**：Feed 数据解析
7. **XML 验证**：确保 XML 结构正确性

XML 在企业级应用和数据交换中仍然发挥着重要作用。
