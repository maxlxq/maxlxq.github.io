# 链表


## 相交链表

- [160.相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/description/?envType=study-plan-v2&envId=top-100-liked "160.相交链表")

给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null

<details>
<summary>
答案
</summary>

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  // 无节点，则不会相交
  if (!headA || !headB) return null;
  let u = headA, v = headB;
  // 比较每个节点，终止条件为：存在相交节点 或 两条不相交遍历到末尾 null
  while (u !== v) {
    // 如果 u 遍历到末尾，则将其指向 v
    u = u === null ? headB : u.next;
    // 如果 v 遍历到末尾，则将其指向 u
    v = v === null ? headA : v.next;
  }
  // 返回相交节点 或 最终指向的 null
  return u;
}
```
</details>

## 反转链表

- [206. 反转链表](https://leetcode.cn/problems/reverse-linked-list/?envType=study-plan-v2&envId=top-100-liked "206. 反转链表")

给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。

<details>
<summary>
答案
</summary>

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  // 定义反转当前节点的下一指向，初始化 null，即尾节点指向
  let prev = null;
  // 遍历链表
  while (head) {
    // 暂存当前节点的下一节点
    const temp = head.next;
    // 当前节点的next 指向prev
    head.next = prev;
    // prev 指向当前节点
    prev = head;
    // head 取暂存的下一节点，重复此循环，直至 head 为 null
    head = temp;
  }
  return prev;
}
```
</details>

## 环形链表

## 合并链表

## 两数相加

## 链表中倒数第k个节点

## 删除链表的倒数第N个节点

## 随机链表 复制

## 排序链表

## LRU缓存

## 合并K个升序链表
