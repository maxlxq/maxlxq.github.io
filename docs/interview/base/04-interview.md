# 面试复习 Day 4

## 一些手写题目

### 1. 手写 Promise.all

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    if (len === 0) return resolve([]);
    const result = [];
    let count = 0;
    for (let i = 0; i < len; i++) {
      Promise.resolve(promises[i]).then((promise) => {
        result[i] = promise;
        count++;

        if (count === len) {
          resolve(result);
        }
      }, (err) => reject(err));
    }
  })
}
```

### 2. 手写 两个字符串数字相加，输出字符串

```javascript
function add(str1, str2) {
  const str1Len = str1.length;
  const str2Len = str2.length;
  if (str1Len === '0' || str2Len === '0') return str1 || str2;

  const minLen = Math.min(str1Len, str2Len);

  const result = [];
  let carry = 0;

  const str1Arr = str1.split('').reverse();
  const str2Arr = str2.split('').reverse();

  for (let i = 0; i < minLen; i++) {
    const sum = parseInt(str1Arr[i]) + parseInt(str2Arr[i]) + carry;
    result.push(`${sum % 10}`);
    carry = Math.floor(sum / 10);
  }

  const restArr = str1Arr.length > str2Arr.length ? str1Arr : str2Arr;
  for (let i = minLen; i < restArr.length; i++) {
    const sum = parseInt(restArr[i]) + carry;
    result.push(`${sum % 10}`);
    carry = Math.floor(sum / 10);
  }

  if (carry) {
    result.push(`${carry}`);
  }

  return result.reverse().join('');
}
```


