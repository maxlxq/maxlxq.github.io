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
    "revision": "989c2c6a9add54a80ed71abad7347fab"
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
    "url": "assets/js/11.c35be34b.js",
    "revision": "90de8f3f95bb2bdae71cb5d0920659e8"
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
    "url": "assets/js/16.e25595e1.js",
    "revision": "03fd7408f54c7b51f943bb95299b1926"
  },
  {
    "url": "assets/js/17.b1fce0a8.js",
    "revision": "53e369c341eb8127bf9dec56eca05c8e"
  },
  {
    "url": "assets/js/18.2c84ca7b.js",
    "revision": "1c831f965bceeb434b2264dd327348b1"
  },
  {
    "url": "assets/js/2.f858d565.js",
    "revision": "db009cc856da9d2c7e1126e6b71be97f"
  },
  {
    "url": "assets/js/3.42dff118.js",
    "revision": "c8088fe0a969ac992df5689395b0937b"
  },
  {
    "url": "assets/js/4.cc3e2053.js",
    "revision": "5c576f405db032a9c9297574165c9d30"
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
    "url": "assets/js/app.5a7287f4.js",
    "revision": "75077ffb4d2157ccc1f23ebd822cfad4"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "2c4f560c5ff93c674d01dc6f46242d2d"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "e89a1ddcd1a23941b3d05b81932ceb99"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "86d6160bde97b1830a57de1c3e100f30"
  },
  {
    "url": "blog/index.html",
    "revision": "40f898fcf72ef5aa46163c783dfb5427"
  },
  {
    "url": "blog/React核心.html",
    "revision": "235c65e9ff71751608d2fdf1742fe035"
  },
  {
    "url": "index.html",
    "revision": "8584c4b98afb8978487e1f5976623292"
  },
  {
    "url": "interview/index.html",
    "revision": "023cfccb073d18a08e71fc65f829c115"
  },
  {
    "url": "interview/javascript.html",
    "revision": "f3d3c631b70f251cecfbf43018e2aff0"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "548ccc260a69f663648424de9bcd3b8a"
  },
  {
    "url": "leetcode/index.html",
    "revision": "dee53f23ce807055169d75a2d24422a6"
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
