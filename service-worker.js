/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "9da2bed208bd31e13db79286fe529c8d"
  },
  {
    "url": "assets/css/0.styles.aee30c31.css",
    "revision": "06ac54877e7d9c4eb1ce3094ee21121d"
  },
  {
    "url": "assets/img/1.c85755dc.png",
    "revision": "c85755dc5ed9e965ac07c02b7a76d03d"
  },
  {
    "url": "assets/img/2.c7ca719b.png",
    "revision": "c7ca719b809cd96fc6f229d746304d66"
  },
  {
    "url": "assets/img/3.79c24c33.png",
    "revision": "79c24c33bc8d230f5e454176bedc5b25"
  },
  {
    "url": "assets/img/react_lifestyle.c34d5543.png",
    "revision": "c34d554306b1d455d4da1b61c1cd7172"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.dec0bc3e.js",
    "revision": "60fe3fe536bb9f81fda0d24ce9f9b88f"
  },
  {
    "url": "assets/js/11.15a1b851.js",
    "revision": "7c8f3c7c9aa6b45ecea259be6a67bcd0"
  },
  {
    "url": "assets/js/12.bada438e.js",
    "revision": "35d5f218d4c10e588965ed2f253d995c"
  },
  {
    "url": "assets/js/13.17ed9eb1.js",
    "revision": "f8703214a9ab553a4fd074a945c098b6"
  },
  {
    "url": "assets/js/14.4d43cef5.js",
    "revision": "69bc2b2b9dfccb7b00eb48e17df763d3"
  },
  {
    "url": "assets/js/15.2b0a9564.js",
    "revision": "a8bf370fe652dbf794fb251ee0a56326"
  },
  {
    "url": "assets/js/16.748fdd6e.js",
    "revision": "5a96cb284f0d340f7cf6b733294461dc"
  },
  {
    "url": "assets/js/17.fc963a96.js",
    "revision": "f1a204ae3e7634f3c0e1b1c8d6231c79"
  },
  {
    "url": "assets/js/18.11dc1290.js",
    "revision": "8b9189d8741fd634000ded37464be2d4"
  },
  {
    "url": "assets/js/19.696852f5.js",
    "revision": "1c35ce35e0d49b98bc921b6465a173d9"
  },
  {
    "url": "assets/js/2.4b99fd0d.js",
    "revision": "b208bb8b06f2b09e041330d04362579e"
  },
  {
    "url": "assets/js/20.2d26bc50.js",
    "revision": "a58ef792a1e2f972660db676156e8c59"
  },
  {
    "url": "assets/js/21.95550a41.js",
    "revision": "4713b995925ef2fe8bd745031b6ca86e"
  },
  {
    "url": "assets/js/22.bb9189fa.js",
    "revision": "88fd4254638b30c7afcd02efab988e4a"
  },
  {
    "url": "assets/js/23.7fe8cfa2.js",
    "revision": "9d841250db5ecd3c59214164c07fe588"
  },
  {
    "url": "assets/js/24.f0084a00.js",
    "revision": "b30d537b0e9f97e8140e77952d47a2fe"
  },
  {
    "url": "assets/js/25.1b98c7db.js",
    "revision": "6ca58ea50d89a6ef9a7e2522d83f5f2d"
  },
  {
    "url": "assets/js/26.4d4606f9.js",
    "revision": "1888ff1f4201889c47510e336dfbea5b"
  },
  {
    "url": "assets/js/27.a7df5069.js",
    "revision": "7d5e1d8eb7c669fe2d0d7a6237fac2fa"
  },
  {
    "url": "assets/js/28.4a64bb42.js",
    "revision": "c8133565f0b081ac666b45fbebddf7aa"
  },
  {
    "url": "assets/js/29.d9d062a3.js",
    "revision": "5dc22d72175d3e68e5dc2786b8c5c2cc"
  },
  {
    "url": "assets/js/3.a14a11a0.js",
    "revision": "6ceff1c3367f29fb896bad7866de09ae"
  },
  {
    "url": "assets/js/30.8c304dd2.js",
    "revision": "7dc28b3e2869bc18212a095e940960eb"
  },
  {
    "url": "assets/js/31.a485ca96.js",
    "revision": "765cbc693c3ab55f58b96245586a48d8"
  },
  {
    "url": "assets/js/32.9a05dc3f.js",
    "revision": "6e43f1df93250bf36e60b71686ced15e"
  },
  {
    "url": "assets/js/33.f29e0aea.js",
    "revision": "ffd3567a34c2cdcee6813cb932ba0656"
  },
  {
    "url": "assets/js/34.2725b66b.js",
    "revision": "d725bf623f7dcb435b1bbfbe6a1ff5d0"
  },
  {
    "url": "assets/js/35.03850c3f.js",
    "revision": "d0e744952c55b84008ff21d2e3787b2e"
  },
  {
    "url": "assets/js/4.c8a6c212.js",
    "revision": "9f59762e59d53c6c05232981f5dfb92a"
  },
  {
    "url": "assets/js/5.c6b3ae91.js",
    "revision": "68165ac7b4b05e2ffea137552866bcb8"
  },
  {
    "url": "assets/js/6.c5beb5cf.js",
    "revision": "5d787435ad8598fb0eeab61bcac924dd"
  },
  {
    "url": "assets/js/7.1c630009.js",
    "revision": "68eb1f512f7c837a7abf3b975c797ab5"
  },
  {
    "url": "assets/js/8.376a667c.js",
    "revision": "028b6d1ca280355c7e2fcbd7d4bfc543"
  },
  {
    "url": "assets/js/9.c6729c9a.js",
    "revision": "8b634e585ddec52ca948232fa0778c56"
  },
  {
    "url": "assets/js/app.80668191.js",
    "revision": "5be67a8f2cef8bcab5e6258a0ff2de0f"
  },
  {
    "url": "blog/ECMAScript.html",
    "revision": "c430d7b604b3e7c006825d81ac3d1935"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "9144db01ea6dda06c3aa9a5842c197d5"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "0257453403bbd74d3b5fef19c7ff3c08"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "6f0abb92b1a0df17f2c343a7f1483865"
  },
  {
    "url": "blog/index.html",
    "revision": "e59a753ddff8fbbf39b922d3227157cd"
  },
  {
    "url": "blog/基础建设和架构.html",
    "revision": "a501ef00d8b11e8c04ee2772404a07ab"
  },
  {
    "url": "index.html",
    "revision": "ec74b19685ca85e79c5a07bcfe2a814e"
  },
  {
    "url": "interview/1.png",
    "revision": "c85755dc5ed9e965ac07c02b7a76d03d"
  },
  {
    "url": "interview/2.png",
    "revision": "c7ca719b809cd96fc6f229d746304d66"
  },
  {
    "url": "interview/3.png",
    "revision": "79c24c33bc8d230f5e454176bedc5b25"
  },
  {
    "url": "interview/bind模拟实现.html",
    "revision": "7c57319a934be30172319559cdbe593d"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "e3ee92ade7f05b1e36b8b2e2063fc0b6"
  },
  {
    "url": "interview/Event.html",
    "revision": "3e8cf751fd57ff01920f8683c0fcda89"
  },
  {
    "url": "interview/GoF介绍.html",
    "revision": "abcb05416ac23234d1c4c791f3b5795c"
  },
  {
    "url": "interview/index.html",
    "revision": "4b25aa139f58624de042196871306ff6"
  },
  {
    "url": "interview/javascript.html",
    "revision": "eeb81f33214a7fb0c39cde6b437314ab"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "acffc6a847ffd4843162a96dee813127"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "76c84fa33155e823b800e78a4cc3a077"
  },
  {
    "url": "interview/react_lifestyle.png",
    "revision": "c34d554306b1d455d4da1b61c1cd7172"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "a22b08423e305791bdb1c11de680f45e"
  },
  {
    "url": "interview/requestIdleCallback模拟实现.html",
    "revision": "2282b01b2b20c4ac738a13d28b49be54"
  },
  {
    "url": "interview/原型和原型链.html",
    "revision": "9cfd8372a20ca457289e4ab19bdab24d"
  },
  {
    "url": "interview/垃圾回收.html",
    "revision": "06d0921ab18a468311c58a7a8ce2091f"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "7b6f018acdd1ecd9d8e6683c2b13ecbe"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "605b555b59bbcec3cd8064cec6a852ba"
  },
  {
    "url": "leetcode/index.html",
    "revision": "09fb961fbbdaefe3fb27ef708c6a4917"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "2b8ade32326005bf04d31dd2dc2d8e9e"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "24a8c7cbb4031756ca60b9560d168aa7"
  },
  {
    "url": "mdn/Promise.html",
    "revision": "0220e75ba7ddcb59a258a3b41e0eea34"
  },
  {
    "url": "mdn/Symbol.html",
    "revision": "2cdf108317a305ed85e75cbcf31ee663"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "8b0112b6e432a040c6f9245447a2818f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
