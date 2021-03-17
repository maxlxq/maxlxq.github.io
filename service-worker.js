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
    "revision": "d405d9fe8a52f25e8a641480b9bf434b"
  },
  {
    "url": "assets/css/0.styles.aee30c31.css",
    "revision": "06ac54877e7d9c4eb1ce3094ee21121d"
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
    "url": "assets/js/10.26c376ef.js",
    "revision": "cecb71e2a5e5c785ee8010678aae0eca"
  },
  {
    "url": "assets/js/11.9bd11653.js",
    "revision": "4a5f6aac35cf992774b67a3091c9ae89"
  },
  {
    "url": "assets/js/12.b3a0c2c5.js",
    "revision": "707d255f1342358395e6f59f85ffa765"
  },
  {
    "url": "assets/js/13.4e74f4e7.js",
    "revision": "69c593057eb01370fe93f64d82d59f2b"
  },
  {
    "url": "assets/js/14.f27d8f9b.js",
    "revision": "636dd51432bc6d4f7e268557c7ba25db"
  },
  {
    "url": "assets/js/15.a17ca09e.js",
    "revision": "4e21568c0456f5f10ab60db364bdb4f8"
  },
  {
    "url": "assets/js/16.afc24795.js",
    "revision": "4711e2c3007affe6a0fddf6cca6e509b"
  },
  {
    "url": "assets/js/17.3d2bdde0.js",
    "revision": "1939321c1f12c94c062d4525280e256c"
  },
  {
    "url": "assets/js/18.48a06ce6.js",
    "revision": "adaec70ee77e7d513496007f8eb38c1a"
  },
  {
    "url": "assets/js/19.ffa8f608.js",
    "revision": "f09c6549d2e75a353a232bce04a24099"
  },
  {
    "url": "assets/js/2.aad8d586.js",
    "revision": "28300a70d1568a0fd60e579b7e6a408a"
  },
  {
    "url": "assets/js/20.888dc155.js",
    "revision": "af01fa0c40572d990fb5071aa2f0050f"
  },
  {
    "url": "assets/js/21.44d828dd.js",
    "revision": "d49ffc3a2e86656a6dea37e8ea6dcd52"
  },
  {
    "url": "assets/js/22.c4c59a1f.js",
    "revision": "5d6c389a80deae4a17e9e6e219a12f10"
  },
  {
    "url": "assets/js/23.458c9de7.js",
    "revision": "a1a4f504b5b529ac970458fae822514b"
  },
  {
    "url": "assets/js/24.509895a6.js",
    "revision": "22dc42580d4bde48adf8a5975535661a"
  },
  {
    "url": "assets/js/25.e26d2599.js",
    "revision": "0b8b90d0ddd1945d21e31df19c93c191"
  },
  {
    "url": "assets/js/26.6b1b3ac1.js",
    "revision": "b588bdd906822638f54b4b8dda10863a"
  },
  {
    "url": "assets/js/27.8d207464.js",
    "revision": "a9c29851aba7438708878efc0ec45184"
  },
  {
    "url": "assets/js/28.05ebb9f1.js",
    "revision": "46f6b4ace271a6457208b90c6b7ccf20"
  },
  {
    "url": "assets/js/29.12db921c.js",
    "revision": "20e9b4d9b0a7b6f1a5c33bf692fbcac4"
  },
  {
    "url": "assets/js/3.d0441af6.js",
    "revision": "6bae4ed69a027c7df4ddc60748861335"
  },
  {
    "url": "assets/js/30.d465c0dd.js",
    "revision": "cf15e653245934adfbc2e6860e317313"
  },
  {
    "url": "assets/js/31.69a77cb1.js",
    "revision": "421cb9c3aba938d9dffc866006461d3b"
  },
  {
    "url": "assets/js/32.378fb220.js",
    "revision": "25c29a6f23742bae1e0650ec6957b3cf"
  },
  {
    "url": "assets/js/33.c85031f1.js",
    "revision": "716ee55e6933b1ba9a52c231c80263cf"
  },
  {
    "url": "assets/js/34.5e8576ee.js",
    "revision": "22eb800480d796acd8d601144bafb28d"
  },
  {
    "url": "assets/js/35.109fb8b0.js",
    "revision": "0bf5287f000f44d2d884b087e0b91930"
  },
  {
    "url": "assets/js/36.712422d0.js",
    "revision": "6478628796a9a18f26f50a0e95cbeb06"
  },
  {
    "url": "assets/js/37.1596bb4b.js",
    "revision": "84d31d27d39375ae937e022c5ae0bfa9"
  },
  {
    "url": "assets/js/38.205e03e4.js",
    "revision": "65876924e5a6866b276193342c5cb352"
  },
  {
    "url": "assets/js/39.521fab01.js",
    "revision": "35d7f008c87c9f738747014a4a30a61e"
  },
  {
    "url": "assets/js/4.7f37c376.js",
    "revision": "0b4b94ffb8604a4b47725b89d6677a7c"
  },
  {
    "url": "assets/js/40.914a18f8.js",
    "revision": "04e2ed0d4378d1edee67214a274c1d3d"
  },
  {
    "url": "assets/js/41.0fcc94cf.js",
    "revision": "c403af3b7234f4e7a8ed81a4c2430204"
  },
  {
    "url": "assets/js/42.63a12bc4.js",
    "revision": "9dd4289e648e501285e027ab1e376467"
  },
  {
    "url": "assets/js/43.230fc2a4.js",
    "revision": "b55164fdc31b07899c3b2d1eb14dbb58"
  },
  {
    "url": "assets/js/44.fc93eda5.js",
    "revision": "cc13063b5d3e9c06a533bf62180b704b"
  },
  {
    "url": "assets/js/45.06593ea6.js",
    "revision": "67ba2536c6f5e6e9e00358dc0363b1c5"
  },
  {
    "url": "assets/js/46.7f3a17d0.js",
    "revision": "7b866299eb0a1d293bed0e0077511208"
  },
  {
    "url": "assets/js/47.643d3aad.js",
    "revision": "2b45e353b1b65995e44c22c66eb71c66"
  },
  {
    "url": "assets/js/48.97202bbc.js",
    "revision": "d47d3833ed0a93a7ca2ecf5334249afe"
  },
  {
    "url": "assets/js/49.39b95492.js",
    "revision": "7bf82415e6c6cee1830e55b26a5fb9c4"
  },
  {
    "url": "assets/js/5.5b23ff38.js",
    "revision": "5240072347f36cb65a9d14fb06b252ef"
  },
  {
    "url": "assets/js/6.5430af55.js",
    "revision": "345aeb59eb672c77536915ada4d14b38"
  },
  {
    "url": "assets/js/7.8e3fbb07.js",
    "revision": "2c5db2a31924e497342af52c8e314366"
  },
  {
    "url": "assets/js/8.ab5b260b.js",
    "revision": "4417099c1a4238e8600d2463bb824e3b"
  },
  {
    "url": "assets/js/9.e1890810.js",
    "revision": "176b9960fd7f2df95f42c45986d167e0"
  },
  {
    "url": "assets/js/app.e12c034c.js",
    "revision": "945cc7451b2193108857e3f7e8d1fcee"
  },
  {
    "url": "blog/ECMAScript.html",
    "revision": "43bb0283da6df40d5f575343ed3f46c5"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "548f1ab9370f6a947719851ec07430ba"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "2a33802a7297b4a95b74c20d55db3ea5"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "9c9c0c152af405f673aac791eb7ba837"
  },
  {
    "url": "blog/index.html",
    "revision": "54b9fafa2a3ea2326d6548a86f11c4e7"
  },
  {
    "url": "blog/基础建设和架构.html",
    "revision": "7c7cb846235e4ec4d7a29fd9a93ed49e"
  },
  {
    "url": "index.html",
    "revision": "b7b3c2a522674952b60d68d328a6b6d1"
  },
  {
    "url": "interview/CSS-盒子模型.html",
    "revision": "05295d2ac255e244fbbc8499b1cf871c"
  },
  {
    "url": "interview/Event.html",
    "revision": "27f5839954ad81776c550ce5dd3a4108"
  },
  {
    "url": "interview/GoF介绍.html",
    "revision": "53bd99c1e145b1ed88e7ada2c411660d"
  },
  {
    "url": "interview/index.html",
    "revision": "fb077c233b0a282093618ee793e63855"
  },
  {
    "url": "interview/JavaScript-apply和call.html",
    "revision": "8228289e2eb91932ee5cc9b08165aec8"
  },
  {
    "url": "interview/JavaScript-bind原理.html",
    "revision": "76164aac74789c1aed58270bc6579686"
  },
  {
    "url": "interview/JavaScript-Generators原理.html",
    "revision": "e76ef5d4e4590926b62d0d026e2f1ab1"
  },
  {
    "url": "interview/JavaScript-IIFE.html",
    "revision": "cd7aa0534f0ee9d2302212bccbd4ff52"
  },
  {
    "url": "interview/JavaScript-instanceof原理.html",
    "revision": "226de00f1ed984a699fc0e8f18e86764"
  },
  {
    "url": "interview/JavaScript-new模拟实现.html",
    "revision": "c821074592dbb3fa883ced8776fc2e78"
  },
  {
    "url": "interview/JavaScript-Promise.html",
    "revision": "9ceabeb3e4dc18a74a383d35163f3c15"
  },
  {
    "url": "interview/JavaScript-this.html",
    "revision": "e63d946af87bf13322dcdcb8bfb233a3"
  },
  {
    "url": "interview/JavaScript-事件循环机制.html",
    "revision": "0c45031a3ed08f6fee74945b387d2cf5"
  },
  {
    "url": "interview/JavaScript-作用域.html",
    "revision": "1256cc8268cc4c6886a81f1505401dff"
  },
  {
    "url": "interview/JavaScript-原型.html",
    "revision": "a637ea07a4d10c43e21720d71af0c4a4"
  },
  {
    "url": "interview/JavaScript-变量提升.html",
    "revision": "3575369dbe7861d439ca4c893f343653"
  },
  {
    "url": "interview/JavaScript-垃圾回收机制.html",
    "revision": "194eebcd486192d5d858afaf680029fe"
  },
  {
    "url": "interview/JavaScript-基础.html",
    "revision": "9ce930e756756df0d1c8d9fdb48883f9"
  },
  {
    "url": "interview/JavaScript-柯里化.html",
    "revision": "57e52fa4e061336f42ef8a55eb6351ff"
  },
  {
    "url": "interview/JavaScript-浮点数精度.html",
    "revision": "4056c6f21b4b982f9f4e25d6e8da4333"
  },
  {
    "url": "interview/JavaScript-继承.html",
    "revision": "3eeeb4ee473582c22e67cc074d36d5ee"
  },
  {
    "url": "interview/JavaScript-闭包.html",
    "revision": "2f2fc9a3ed330a7d66aba7a95ea17298"
  },
  {
    "url": "interview/javascript.html",
    "revision": "b1a847bcf370d5d33c03951578646e81"
  },
  {
    "url": "interview/react_lifestyle.png",
    "revision": "c34d554306b1d455d4da1b61c1cd7172"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "920a4cf1469ef599c7fb9b5dc354df3d"
  },
  {
    "url": "interview/requestIdleCallback模拟实现.html",
    "revision": "86d0910b447df7e88264eded03ede6bb"
  },
  {
    "url": "interview/垃圾回收.html",
    "revision": "4ef0ccab632550b45b34649e9445b7ee"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "bbc97099db6bc2d20aee2c8e406ac9c6"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "f22ea502fec41ed520f55fb27641473a"
  },
  {
    "url": "leetcode/index.html",
    "revision": "03fc7a563f852a6fdd3f45d8f7d392d4"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "bc5326eb341d1fb99a89db50f6447e4e"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "ec5c9b7d98f2d78bae16bfa5e341dd5c"
  },
  {
    "url": "mdn/Promise.html",
    "revision": "0a3ca1b10ce339870a3bedce666e1aa9"
  },
  {
    "url": "mdn/Symbol.html",
    "revision": "719e781c4ae0bee85d409f9189c70882"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "6b5b2845c0a606b7385545f065195c01"
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
