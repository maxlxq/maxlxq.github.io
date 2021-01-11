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
    "revision": "b34eb38f51671205c1a06e95b28d466a"
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
    "url": "assets/js/app.10c47674.js",
    "revision": "371517bc89946a2d5efb14df10e92455"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "a8f192788c93afe594403ae49c834473"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "e39ce6a2826ae290f494bb7a705b0208"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "428622ea09f352fcafd778c99ccb3cce"
  },
  {
    "url": "blog/index.html",
    "revision": "895055c12e8e90e50e4e8daff1f7485a"
  },
  {
    "url": "blog/React核心.html",
    "revision": "267fc63b775b8c0e29e12eb3cd1eb52d"
  },
  {
    "url": "index.html",
    "revision": "0e3d95e0f63265280cdeec5e4956dc94"
  },
  {
    "url": "interview/index.html",
    "revision": "9b353f7b69a744d4900162eb32f43c71"
  },
  {
    "url": "interview/javascript.html",
    "revision": "816c7e5542fd553ae4a0180710845486"
  },
  {
    "url": "interview/基础知识.html",
    "revision": "a3434318802e6ef563a5e061c5acba14"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "1344043b459b90325ec1bb2a805415cd"
  },
  {
    "url": "leetcode/index.html",
    "revision": "475f2f7e503a417c53e00d350893b0dd"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "1bbb540622021c646e269eeae29bd1b4"
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
