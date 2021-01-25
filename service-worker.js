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
    "revision": "69cc8abde4c16c0714560045f8be87ac"
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
    "url": "assets/js/14.806ee42a.js",
    "revision": "f77e6ab27d3b260771c0625e4ae8d047"
  },
  {
    "url": "assets/js/15.25056a90.js",
    "revision": "496c12f4bb6bf45dfd8fee65e56ff392"
  },
  {
    "url": "assets/js/16.659154bc.js",
    "revision": "1f60ccbcf0c4aa942fad8253f02d5674"
  },
  {
    "url": "assets/js/17.f0c9a431.js",
    "revision": "b55e43754a63fd5dfddd75990c3fdeff"
  },
  {
    "url": "assets/js/18.dd17f751.js",
    "revision": "84b876e83b63b9f334bdb1c7f590fbab"
  },
  {
    "url": "assets/js/19.d71e7709.js",
    "revision": "586479642479b7ef7729b5830399e5f1"
  },
  {
    "url": "assets/js/2.f858d565.js",
    "revision": "db009cc856da9d2c7e1126e6b71be97f"
  },
  {
    "url": "assets/js/20.e9222806.js",
    "revision": "884599360ac03897ef605889bdf44eea"
  },
  {
    "url": "assets/js/21.660d7999.js",
    "revision": "35eb64a48b4d605a4c835eee96874c42"
  },
  {
    "url": "assets/js/3.42dff118.js",
    "revision": "c8088fe0a969ac992df5689395b0937b"
  },
  {
    "url": "assets/js/4.63135e2d.js",
    "revision": "4e115195dc436320e2bcf0342173421b"
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
    "url": "assets/js/app.09e026f1.js",
    "revision": "5526a593622c0827065bdf71b14bfabe"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "2dd4e62a86d51a3a7129c636c955e653"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "b1ec6665e7778071e8332f099cccd01d"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "b762282306202f5225016c5b829bd659"
  },
  {
    "url": "blog/index.html",
    "revision": "236d458797a6325b68069bfe9a04bf57"
  },
  {
    "url": "blog/React核心.html",
    "revision": "f04245d2dfc0dca6e2230c9b3c616f86"
  },
  {
    "url": "index.html",
    "revision": "eb378ca2642b5490dfd5b8ea4233e2ca"
  },
  {
    "url": "interview/Event.html",
    "revision": "5ab6ff140d21e6b7737c2af30542e71f"
  },
  {
    "url": "interview/index.html",
    "revision": "b3b5ac4cd59d8ad8b796002649ea94fe"
  },
  {
    "url": "interview/javascript.html",
    "revision": "32a078e8f7f1e20af1c736971c5e7ece"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "db63ac8bbbd88eb92e043984935eb655"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "0f38b2e0e23ae46fd3d633c279d1b4a0"
  },
  {
    "url": "leetcode/index.html",
    "revision": "711fea281df75332b9764d7ededd5efb"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "4e74cc6a51d04285fd5e4037526b9fd9"
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
