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
    "revision": "1596fa23b75db19c1939a2bbe7746f9c"
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
    "url": "assets/js/app.4e57bc2e.js",
    "revision": "04261bc78e2906a24590261301d72fbe"
  },
  {
    "url": "blog/ECMAScript.html",
    "revision": "cf40dacd39c0ddb9c7db21f1352fabb4"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "0d9de1f5a75fe3a79f6e9a5caafed876"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "5b1f46da463c370a846393d906fefbe1"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "02a005c454d496f9d49877e89b455f75"
  },
  {
    "url": "blog/index.html",
    "revision": "4e3d0350d1b54372946968c53b99ea7b"
  },
  {
    "url": "blog/基础建设和架构.html",
    "revision": "846a1139af77beff3670893b767299d6"
  },
  {
    "url": "index.html",
    "revision": "b74e60c80a3be07897a91416996639f9"
  },
  {
    "url": "interview/CSS-盒子模型.html",
    "revision": "4ae3a9b03821502087bf2a9eed6ebf90"
  },
  {
    "url": "interview/Event.html",
    "revision": "ad66345c4ea33d9a82a2bc827b30379d"
  },
  {
    "url": "interview/GoF介绍.html",
    "revision": "86bee5a78b529be1e2174db664d28cba"
  },
  {
    "url": "interview/index.html",
    "revision": "effca37de82b065c0ee4c861e5053ab1"
  },
  {
    "url": "interview/JavaScript-apply和call.html",
    "revision": "03845537c5b34dda5736de2b638692ba"
  },
  {
    "url": "interview/JavaScript-bind原理.html",
    "revision": "c00c7563fe47053f14e01ffbf01a39ef"
  },
  {
    "url": "interview/JavaScript-Generators原理.html",
    "revision": "aa4d4a096a8dd3541639569b50d2ee9a"
  },
  {
    "url": "interview/JavaScript-IIFE.html",
    "revision": "28bc431160a51b1cbed365a40b26b32e"
  },
  {
    "url": "interview/JavaScript-instanceof原理.html",
    "revision": "ace718a149c31921c2aadd5d67aafd4e"
  },
  {
    "url": "interview/JavaScript-new模拟实现.html",
    "revision": "31f0916f715b6e4f779d8a4e74bd26de"
  },
  {
    "url": "interview/JavaScript-Promise.html",
    "revision": "0a29e4b33e258cc1c714148955bee852"
  },
  {
    "url": "interview/JavaScript-this.html",
    "revision": "db66816f6158c9610cb73d1fbc9f56d9"
  },
  {
    "url": "interview/JavaScript-事件循环机制.html",
    "revision": "b4160ba3b8eff7ccb811414f05e31ff7"
  },
  {
    "url": "interview/JavaScript-作用域.html",
    "revision": "2e1278ee0793cf41c610c7662bbb1817"
  },
  {
    "url": "interview/JavaScript-原型.html",
    "revision": "7e129589cd410ce50f5cb1186030aceb"
  },
  {
    "url": "interview/JavaScript-变量提升.html",
    "revision": "230b5d9f8defb3174041000e42368d05"
  },
  {
    "url": "interview/JavaScript-垃圾回收机制.html",
    "revision": "9129e935d7581108f0aab6ccd0d5c46d"
  },
  {
    "url": "interview/JavaScript-基础.html",
    "revision": "73e5380ad1b433d782b46a26295dec04"
  },
  {
    "url": "interview/JavaScript-柯里化.html",
    "revision": "5748b28f3b51607c3708ec9b620e9763"
  },
  {
    "url": "interview/JavaScript-浮点数精度.html",
    "revision": "607211de108557fc1c4d8d1dfc21d77d"
  },
  {
    "url": "interview/JavaScript-继承.html",
    "revision": "c0b9b32b7d145ed4807bd5ff5f6aa51b"
  },
  {
    "url": "interview/JavaScript-闭包.html",
    "revision": "eb390014041b54ad35c8ed83e5309da0"
  },
  {
    "url": "interview/javascript.html",
    "revision": "e0192a6418ee124c2b1ecedcc6a09497"
  },
  {
    "url": "interview/react_lifestyle.png",
    "revision": "c34d554306b1d455d4da1b61c1cd7172"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "c7dae1a41b9d2d8e10c52ee63c6cf662"
  },
  {
    "url": "interview/requestIdleCallback模拟实现.html",
    "revision": "80274afda09c7925fa83b4e95211a507"
  },
  {
    "url": "interview/垃圾回收.html",
    "revision": "153e06e02f0a637a70b8001433029910"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "4f411701a1f680e83f18a074b7daf045"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "3b41e15d5bcdf6499172883baac5fd01"
  },
  {
    "url": "leetcode/index.html",
    "revision": "588a719bf5bbc9129d7947cd637779a6"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "285d91e4f1ded0225d0a3ab1360f3791"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "9075352c6878b09000aa6ca8eaebc449"
  },
  {
    "url": "mdn/Promise.html",
    "revision": "60abe3285c38a4344917bed56914ad69"
  },
  {
    "url": "mdn/Symbol.html",
    "revision": "2bec40fa1069e5c1d34bf12466a28336"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "c15170f3461dec4c612d14ad89fa389c"
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
