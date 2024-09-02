
# 0902面试总结

## 手写题

1. usePrevious

```typescript
import { useEffect, useRef } from 'react';

export default function usePrevious<T>(state: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref.current;
}
```

2. LazyMan 类实现

```javascript

class LazyMan {
  constructor(name) {
    this.name = name;
    console.log(name);

    this.base = Promise.resolve()
  }

  sleep (time) {
    this.base = this.base.then(() => {
      return new Promise((resolve) => {
        console.log(`等待${time}秒`)
        setTimeout(() => {
          resolve()
        }, time * 1000);
      })
    })
    return this;
  }

  eat (food) {
    this.base = this.base.then(() => {
      console.log(`正在吃${food}`)
    })
    return this;
  }
}

new LazyMan('张三').eat('banana').sleep(3).eat('launch').sleep(4).eat('food');

```