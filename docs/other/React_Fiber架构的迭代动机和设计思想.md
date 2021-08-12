# 如何理解 Fiber 架构的迭代动机和设计思想

Stack Reconciler 逐渐显露疲态，为了进一步贯彻"快速响应"原则，React 团队在 16.x 版本中将最核心的 Diff 算法重写，使其以 "Fiber Reconciler" 的全新面貌示人。

所以，Stack Reconciler 有什么局限性？Fiber 架构又是什么？基于 Fiber 实现的调和过程又有什么不同？

## 前置知识：单线程的 JavaScript 与多线程的浏览器


