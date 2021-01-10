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
    "revision": "97e4350cf6f38baca2314fb932bd3e44"
  },
  {
    "url": "assets/css/0.styles.f85f523a.css",
    "revision": "2215f82e28cc5408f4c946e26348e7b3"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.2e8242a6.js",
    "revision": "875bb96dbd87f456edc7641dc82ae6ea"
  },
  {
    "url": "assets/js/11.2b0f91c9.js",
    "revision": "1929e3dc2909e0943056f7e4dd37c407"
  },
  {
    "url": "assets/js/12.6dd1ab5b.js",
    "revision": "322beb9597b1b48e312f0a37b7d590ca"
  },
  {
    "url": "assets/js/13.eca3a9c0.js",
    "revision": "b72ad34aa84d76251110901ab526da83"
  },
  {
    "url": "assets/js/14.5962dc74.js",
    "revision": "b118acd17c819f2c15d9d0ff8c13af56"
  },
  {
    "url": "assets/js/15.ddddeacd.js",
    "revision": "94b43b848f93e595196259ad656e905b"
  },
  {
    "url": "assets/js/16.4b5a62ac.js",
    "revision": "190869790e33b5f5d94dbd66b1c4b2a2"
  },
  {
    "url": "assets/js/17.ca105a67.js",
    "revision": "0106a455f4e1f607b90ed2eed6801818"
  },
  {
    "url": "assets/js/18.15cd580e.js",
    "revision": "814193dff64de77874e7a8f09e4ab78c"
  },
  {
    "url": "assets/js/19.d37e8659.js",
    "revision": "5311d762f7d5d646d5518b475736f8b0"
  },
  {
    "url": "assets/js/2.f858d565.js",
    "revision": "db009cc856da9d2c7e1126e6b71be97f"
  },
  {
    "url": "assets/js/20.4e99edbd.js",
    "revision": "43cba71f1b038cfc05f36631820ff90c"
  },
  {
    "url": "assets/js/3.42dff118.js",
    "revision": "c8088fe0a969ac992df5689395b0937b"
  },
  {
    "url": "assets/js/4.879ed87c.js",
    "revision": "5a6b5134caf2e163582e406b446616ef"
  },
  {
    "url": "assets/js/5.66f8ea3a.js",
    "revision": "d3732dae7a4531bc698c8690abf48d89"
  },
  {
    "url": "assets/js/6.0c7e4d77.js",
    "revision": "f44fb6053a8d4de381b63299cade2066"
  },
  {
    "url": "assets/js/7.c72a2f30.js",
    "revision": "703b7afbcc4bfa3c0f76b80a7effb6bf"
  },
  {
    "url": "assets/js/8.a9d9e867.js",
    "revision": "fe9b4648660516c00d083dbd187bbd88"
  },
  {
    "url": "assets/js/9.acef7e6f.js",
    "revision": "16f871dffc23691478c1134ef064c34a"
  },
  {
    "url": "assets/js/app.8f0dff28.js",
    "revision": "7d808e46fd0b8f340e2598fb811460c9"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "2561ea20d8ab8b9591a0eb7db008f8c7"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "a6c3911c8e87e666f191fdd1a539125e"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "d5db58e5ccf16fce1ed89fd4026dfea7"
  },
  {
    "url": "blog/index.html",
    "revision": "36328ea01bac293bf9de234b5baaefa2"
  },
  {
    "url": "blog/React核心.html",
    "revision": "55c936a19fe1481429dbe9864f6b504a"
  },
  {
    "url": "index.html",
    "revision": "9f3ac8ef491e8462336d646672d0d409"
  },
  {
    "url": "interview/index.html",
    "revision": "ee390ee4a724d0395755a1ac48037a2b"
  },
  {
    "url": "interview/javascript.html",
    "revision": "131284ca585eef7ad9e72ce87fb9fe70"
  },
  {
    "url": "interview/基础知识.html",
    "revision": "a4f379041dbece8e80451033fb85172d"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "ed6525e07c57ceec1d91fcfce61cea6e"
  },
  {
    "url": "leetcode/index.html",
    "revision": "d03c4b28f0167eac8c96012522b78b52"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "be62ae7ea1c619f8b169d8e8ed9c94f9"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
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
