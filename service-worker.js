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
    "revision": "8c9a4fd4647e5bd33bedbb3df917e09f"
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
    "url": "assets/js/16.81003080.js",
    "revision": "b8e4e9d356cda591ac5dc79bd31c0de7"
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
    "url": "assets/js/app.20a94c51.js",
    "revision": "09870a3d1c757abd3b53948469acf9e8"
  },
  {
    "url": "blog/ECMAScript.html",
    "revision": "4b3e5b8548f917be8227065e3af0cf9e"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "9f812108c9eceec6a2c463be93d303e9"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "94e49681b3dca91110326f4af1068a09"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "a9c7f32de63363e50bc7eabde8492ac0"
  },
  {
    "url": "blog/index.html",
    "revision": "cdc056730d51d0e409ccfe305bed25dd"
  },
  {
    "url": "blog/基础建设和架构.html",
    "revision": "8ea42ffcc5bd1763f2695ce2bff59327"
  },
  {
    "url": "index.html",
    "revision": "87fea5af211406a4091f8f0b7f35e103"
  },
  {
    "url": "interview/CSS-盒子模型.html",
    "revision": "a861a326c64567a762ba77f8b13a104f"
  },
  {
    "url": "interview/Event.html",
    "revision": "eb87baea0496de09d378c927902b7ae5"
  },
  {
    "url": "interview/GoF介绍.html",
    "revision": "82015b1c550fd16f072de8fa3098e790"
  },
  {
    "url": "interview/index.html",
    "revision": "34db6d2e7ef53e44596aa0384bff83f0"
  },
  {
    "url": "interview/JavaScript-apply和call.html",
    "revision": "45cddbaaa2af0a0fe44c48f6c8b73bf2"
  },
  {
    "url": "interview/JavaScript-bind原理.html",
    "revision": "5777f5bf27c0fc2a3cff33e000b8db51"
  },
  {
    "url": "interview/JavaScript-Generators原理.html",
    "revision": "562b8e66d4c0785654cb72922ecbf1bc"
  },
  {
    "url": "interview/JavaScript-IIFE.html",
    "revision": "40f434daf1f9f445bcbb1da81f79bdeb"
  },
  {
    "url": "interview/JavaScript-instanceof原理.html",
    "revision": "bc426045c44740e00ce58c3b39e0599e"
  },
  {
    "url": "interview/JavaScript-new模拟实现.html",
    "revision": "18c3c1e7bacf2cae72e839e8f3ab8dc0"
  },
  {
    "url": "interview/JavaScript-Promise.html",
    "revision": "78c041da663c59e564bbf7c0aa9b5748"
  },
  {
    "url": "interview/JavaScript-this.html",
    "revision": "ba6e5339755baddea9c4baaf9768249f"
  },
  {
    "url": "interview/JavaScript-事件循环机制.html",
    "revision": "8a4ff4abc16af6b596b8c3cd212e38bf"
  },
  {
    "url": "interview/JavaScript-作用域.html",
    "revision": "041e329527e4d2b47e990ce8b83d49dd"
  },
  {
    "url": "interview/JavaScript-原型.html",
    "revision": "7ad9e5081511957db075d26413cd8923"
  },
  {
    "url": "interview/JavaScript-变量提升.html",
    "revision": "98482802ed9bad0877be11fcc5a26bff"
  },
  {
    "url": "interview/JavaScript-垃圾回收机制.html",
    "revision": "94afe2105978bdf5eadb1d18736abf47"
  },
  {
    "url": "interview/JavaScript-基础.html",
    "revision": "096ef8ea4518cc21a722d6cbb76eaf22"
  },
  {
    "url": "interview/JavaScript-柯里化.html",
    "revision": "181100a5c68b3f8d997c2b3026f9b772"
  },
  {
    "url": "interview/JavaScript-浮点数精度.html",
    "revision": "d8cd363de0abbe26bacbe635c1b6f0e8"
  },
  {
    "url": "interview/JavaScript-继承.html",
    "revision": "d3fc7e7a6b5ca848d07442f0c8d1dd7a"
  },
  {
    "url": "interview/JavaScript-闭包.html",
    "revision": "a5f8989599c3a647fe5e81f9da4f4d4f"
  },
  {
    "url": "interview/javascript.html",
    "revision": "efd018536755d35a68622f1a96138370"
  },
  {
    "url": "interview/react_lifestyle.png",
    "revision": "c34d554306b1d455d4da1b61c1cd7172"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "4547639bfc63422b0171eba015acb64c"
  },
  {
    "url": "interview/requestIdleCallback模拟实现.html",
    "revision": "e39a715df408937fc06b4ba1087ea9bf"
  },
  {
    "url": "interview/垃圾回收.html",
    "revision": "1881966b63c60b84a30426bbcfa98889"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "3149a40267466fbc21170d5314290218"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "b3ebe4d768d8028361e2989769b5d305"
  },
  {
    "url": "leetcode/index.html",
    "revision": "0d456323eb6bed4fbbff2c8566bca080"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "77f3e3ca5f60bd93245df100ac0985ee"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "2605c1ed7f4b3c79d826cc78236a918d"
  },
  {
    "url": "mdn/Promise.html",
    "revision": "17ba20e4d91ca36cfe373db0fee32675"
  },
  {
    "url": "mdn/Symbol.html",
    "revision": "a22248f168c55804123aee228634ee81"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "6e48f2c1b97ef58e574e7cac0faae3be"
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
