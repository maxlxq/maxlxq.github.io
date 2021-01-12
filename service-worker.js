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
    "revision": "26d65e4b41b412e35a632a30c42b9e1c"
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
    "url": "assets/js/14.f42df187.js",
    "revision": "95121e9cef0233b5b73564045a234ce9"
  },
  {
    "url": "assets/js/15.ddddeacd.js",
    "revision": "94b43b848f93e595196259ad656e905b"
  },
  {
    "url": "assets/js/16.a8739184.js",
    "revision": "36e4c2a16060e8443769099515968c70"
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
    "url": "assets/js/app.985342be.js",
    "revision": "6c568b25e840a8b77863bc7e50ec6815"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "61bba6d434c7d414bfe0141f18bfb99f"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "539c99f53b3fcde1b8de496ab4f01349"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "97566b16967b5d4daffe95a277862f26"
  },
  {
    "url": "blog/index.html",
    "revision": "81ad579cf748bb803d880531c3159337"
  },
  {
    "url": "blog/React核心.html",
    "revision": "8d79cd39a7b57b955ccdebbe0ac5114c"
  },
  {
    "url": "index.html",
    "revision": "5c4a7a9d8e8ebb48e74da7d9e752f28e"
  },
  {
    "url": "interview/index.html",
    "revision": "a6c38125895ec8390d113ae487ccd6d8"
  },
  {
    "url": "interview/javascript.html",
    "revision": "17a9085306764c8d00b4161c9bf83469"
  },
  {
    "url": "interview/基础知识.html",
    "revision": "15bf3f5906f5453279df76db9c594742"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "b0ee59e24963df1cbdc407cd7fb37dbd"
  },
  {
    "url": "leetcode/index.html",
    "revision": "ed9096bde929269851b6d9228f5a1fca"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "24da4efc1d60ca0fdb5df1d8a0d9e965"
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
