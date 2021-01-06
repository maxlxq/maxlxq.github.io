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
    "revision": "50ea8ba9847e8764368c7f0ac159ca05"
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
    "url": "assets/js/16.bb900bdb.js",
    "revision": "887d9b186df0c77e203070ff7e71fe4e"
  },
  {
    "url": "assets/js/17.b1fce0a8.js",
    "revision": "53e369c341eb8127bf9dec56eca05c8e"
  },
  {
    "url": "assets/js/18.027e540a.js",
    "revision": "b0ea15d302f908a5c601a2bb57364315"
  },
  {
    "url": "assets/js/19.5f607df0.js",
    "revision": "6c2553142ba2885218865d78873f7159"
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
    "url": "assets/js/4.c9d16097.js",
    "revision": "db7b21f59940338d9ad1e098740b2416"
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
    "url": "assets/js/app.094b2883.js",
    "revision": "f011bbc22cd912864b6b8acd09f80bf4"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "49d76f77347fd54f532bad7c0c9b7716"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "5a19de8980969f98bc078f133837690e"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "dcaeaeb5a97286b09310d418cbc2d174"
  },
  {
    "url": "blog/index.html",
    "revision": "558a45d6be29989731dacae017902801"
  },
  {
    "url": "blog/React核心.html",
    "revision": "7d640d5d437c5cf84bcb34abeaede4e2"
  },
  {
    "url": "index.html",
    "revision": "69abd5df7db12f3d65685fe1da5c99f7"
  },
  {
    "url": "interview/index.html",
    "revision": "9229590fa9ed3e4e3051f88dded86823"
  },
  {
    "url": "interview/javascript.html",
    "revision": "dce242aee7206d280c257f061f8e5925"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "5ed0c092205f6781de99cfb7523ed756"
  },
  {
    "url": "leetcode/index.html",
    "revision": "91721ddb8bc07c60f07643de24d5e834"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "c570d5c11124db956c0b70cc5ced9aca"
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
