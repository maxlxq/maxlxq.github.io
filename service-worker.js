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
    "revision": "f97082895123deb98f746a8c53687e7a"
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
    "url": "assets/js/16.b1f6e44b.js",
    "revision": "80d5959f9feabae186d08ae5d880744b"
  },
  {
    "url": "assets/js/17.33d6f6cd.js",
    "revision": "552fd700b19f7fcc5dc1406b07aaa3c0"
  },
  {
    "url": "assets/js/18.105b20e8.js",
    "revision": "48b018ae47a141745875d8b12a65948e"
  },
  {
    "url": "assets/js/19.be05e038.js",
    "revision": "5dd9f34992ca88122b5bf6f663031cba"
  },
  {
    "url": "assets/js/2.4b99fd0d.js",
    "revision": "b208bb8b06f2b09e041330d04362579e"
  },
  {
    "url": "assets/js/20.f7335aa9.js",
    "revision": "172990a81fc8bfb8104157410a9243f5"
  },
  {
    "url": "assets/js/21.c23d4c8c.js",
    "revision": "058c8009c25843b144e64a854bac6646"
  },
  {
    "url": "assets/js/22.a9650292.js",
    "revision": "4c4dd6bf23fb6e9c886ba83cf230c60a"
  },
  {
    "url": "assets/js/23.3db6e8c9.js",
    "revision": "5cb4d68e7a4d57e304a429d4ad8c8861"
  },
  {
    "url": "assets/js/24.90d52e1d.js",
    "revision": "cb48d235ededd31afba1a9abb87608a8"
  },
  {
    "url": "assets/js/25.b6b7ff76.js",
    "revision": "2813978d2e4cffe7c4dd365bad54134a"
  },
  {
    "url": "assets/js/26.68ecd323.js",
    "revision": "d2f5d34123472d70c9826fc1ad9048a1"
  },
  {
    "url": "assets/js/27.4b0030af.js",
    "revision": "1c216bb296ffa000d0e8607b11bce90f"
  },
  {
    "url": "assets/js/28.d98f6422.js",
    "revision": "7ad257fe2c8d57817d749ccbc330fc73"
  },
  {
    "url": "assets/js/29.db61d16e.js",
    "revision": "7422369d7830b99f1a153d8a35150d3b"
  },
  {
    "url": "assets/js/3.67af8e80.js",
    "revision": "643ff18e82242c0f81fcce4d653f535d"
  },
  {
    "url": "assets/js/30.232e59bd.js",
    "revision": "16915c018e1f4221bf95edef683f4780"
  },
  {
    "url": "assets/js/4.fe0467e7.js",
    "revision": "22bf758592b0b064176e4afd20cdfbfa"
  },
  {
    "url": "assets/js/5.cbfbdf5e.js",
    "revision": "59b7b3424dc1f798cfcaee715cd712fe"
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
    "url": "assets/js/8.a838b8dd.js",
    "revision": "2e0e4cc31b5eb2d2346208b425b11cc9"
  },
  {
    "url": "assets/js/9.c6729c9a.js",
    "revision": "8b634e585ddec52ca948232fa0778c56"
  },
  {
    "url": "assets/js/app.294429b5.js",
    "revision": "cea0cc433e333e9cdf62267e90b3ddc9"
  },
  {
    "url": "blog/ECMAScript.html",
    "revision": "6312bfca52ea4643fdb03dedc9dcf46c"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "674b987c7b7d7feb7bd8e25d3fecb77c"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "4d35334f9bb510dfaf09595190c4752e"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "a66332f09589e5c401b7c4961e60856b"
  },
  {
    "url": "blog/index.html",
    "revision": "f5f238bc0f7509ab4e875a921e2e4452"
  },
  {
    "url": "index.html",
    "revision": "1458799517081b1e45d33c4d3de4d3dd"
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
    "revision": "2d34946feb5d032b293705ba82c146f9"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "6f2a95a5192d8ccfe682d0e8c8a37c70"
  },
  {
    "url": "interview/Event.html",
    "revision": "601d374e6758951984a11cb4d53a0db4"
  },
  {
    "url": "interview/GoF介绍.html",
    "revision": "bc10f95c1e848d2861f7185145a6c13c"
  },
  {
    "url": "interview/index.html",
    "revision": "1c3616ebcdea94bf517d487154488193"
  },
  {
    "url": "interview/javascript.html",
    "revision": "9144b391d36ca1c1e87f99f6032b7b11"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "555e9514e13313f78a09d0024a5abd8f"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "a5d6d87e392c69083328c0b7855c20a5"
  },
  {
    "url": "interview/react_lifestyle.png",
    "revision": "c34d554306b1d455d4da1b61c1cd7172"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "b555224822e940634e01de6fd5b515c0"
  },
  {
    "url": "interview/requestIdleCallback模拟实现.html",
    "revision": "b0b40451590c06246dd7e502ffe8c994"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "099eaf9899f8a23c82c711cca4d81504"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "d7ccf8fafab9511f8ce85b06edcfceca"
  },
  {
    "url": "leetcode/index.html",
    "revision": "72bc8e74395c8689ca630e2d981a7c65"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "cbe111b2dda9b4077aa46f3037faeaa5"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "fe647cd182207de202aabacaa8aea869"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "05db2d20bb5df0d45fc3b93c525520b7"
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
