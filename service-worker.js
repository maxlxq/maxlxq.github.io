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
    "revision": "e131dbafffed019a1e74a588864ad487"
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
    "url": "assets/js/11.88e8e32d.js",
    "revision": "863d39443b85444ae4f24b26a30e43c4"
  },
  {
    "url": "assets/js/12.f39c35c5.js",
    "revision": "c6aee671e76f5559a473381129319816"
  },
  {
    "url": "assets/js/13.884b303a.js",
    "revision": "382105cd27b73ffb6b63b45dbe254129"
  },
  {
    "url": "assets/js/14.d948a8a2.js",
    "revision": "e084ec291b75e427c742c98467035240"
  },
  {
    "url": "assets/js/15.4d7ed7bf.js",
    "revision": "16c41782bbf05ae409193a3ea917b8fa"
  },
  {
    "url": "assets/js/16.9d93af9f.js",
    "revision": "e57db0f1ff32b850ae97d14295a59b82"
  },
  {
    "url": "assets/js/2.b868cf67.js",
    "revision": "656001b89d2b71aa1007c934943926c1"
  },
  {
    "url": "assets/js/3.a3f70fc4.js",
    "revision": "0677a2b6f0840bce6e28a2fb60947611"
  },
  {
    "url": "assets/js/4.e84d76d4.js",
    "revision": "1d20aad4030a632056d5b693e1f7eec4"
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
    "url": "assets/js/app.92984b91.js",
    "revision": "158ae01071bef1563e0127975090b6e1"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "7ec950c104c473f251d3008699541486"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "2018858550ae9931e18ec70239a49ff6"
  },
  {
    "url": "blog/index.html",
    "revision": "f0326d0ae6933611b9a399def52b158f"
  },
  {
    "url": "blog/React核心.html",
    "revision": "a66d4cb1fd3a5321529988b00903d06b"
  },
  {
    "url": "index.html",
    "revision": "039973aa80f81ea284953940f98afb86"
  },
  {
    "url": "interview/index.html",
    "revision": "75ff35f68c1284ed05d74789b0a19fd9"
  },
  {
    "url": "interview/javascript.html",
    "revision": "4653d833331242b9f0b82481a4a1d61a"
  },
  {
    "url": "leetcode/index.html",
    "revision": "ceaae445df919489102d3c81b307ce29"
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
