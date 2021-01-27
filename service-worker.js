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
    "revision": "e009254d29e3447c03f8da64bc73cb79"
  },
  {
    "url": "assets/css/0.styles.aee30c31.css",
    "revision": "06ac54877e7d9c4eb1ce3094ee21121d"
  },
  {
    "url": "assets/img/1.c85755dc.png",
    "revision": "c85755dc5ed9e965ac07c02b7a76d03d"
  },
  {
    "url": "assets/img/2.c7ca719b.png",
    "revision": "c7ca719b809cd96fc6f229d746304d66"
  },
  {
    "url": "assets/img/3.79c24c33.png",
    "revision": "79c24c33bc8d230f5e454176bedc5b25"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.862d2240.js",
    "revision": "c6e8559a1fe91cef74c3440b42c78a98"
  },
  {
    "url": "assets/js/11.6d97e111.js",
    "revision": "a78f3bf253bf51b6eea5896f0607ddab"
  },
  {
    "url": "assets/js/12.e90cda0e.js",
    "revision": "2c406d48d27c123e878b62b589328fc7"
  },
  {
    "url": "assets/js/13.b1225d30.js",
    "revision": "a84b04ccd07eb2cb0af5c30ca595e06d"
  },
  {
    "url": "assets/js/14.43c0e69d.js",
    "revision": "597f424e1814eb1f6bf7c1a672f8aae7"
  },
  {
    "url": "assets/js/15.48d34e21.js",
    "revision": "577e19155ca7308e9bb625619a5feef3"
  },
  {
    "url": "assets/js/16.4bc76ee5.js",
    "revision": "192fea4371563e75150729894e810dcd"
  },
  {
    "url": "assets/js/17.a3aef07d.js",
    "revision": "fcfbeae4d7f7f8a57628d96255252e35"
  },
  {
    "url": "assets/js/18.419ce2f4.js",
    "revision": "6fa1988b79cb8117b69cf7de05283a1f"
  },
  {
    "url": "assets/js/19.1b27a0e1.js",
    "revision": "aa30984374103c6902a45d832444afdd"
  },
  {
    "url": "assets/js/2.21334d0d.js",
    "revision": "5260d9b64f860798dfea660651372516"
  },
  {
    "url": "assets/js/20.45aa2666.js",
    "revision": "508f0a5d2dd0e874b3a33ba89246c06e"
  },
  {
    "url": "assets/js/21.68c10e2b.js",
    "revision": "883970d01f48f9ea064908a66c58eab8"
  },
  {
    "url": "assets/js/22.dd231130.js",
    "revision": "2ec35187d433d324cbf14fe4fb596cec"
  },
  {
    "url": "assets/js/23.c582a78c.js",
    "revision": "b7a0af31a4d38da7bd78952ee5de8d4c"
  },
  {
    "url": "assets/js/24.44597461.js",
    "revision": "8820ccfa5e9b5e4c68b0b393cb1a5591"
  },
  {
    "url": "assets/js/25.c21a93fe.js",
    "revision": "2f8d8004ba649aed288e4d3644c239f2"
  },
  {
    "url": "assets/js/3.d6c07ef7.js",
    "revision": "fe904ce889c70c923596758aca23c1c5"
  },
  {
    "url": "assets/js/4.aa6fc9dc.js",
    "revision": "b26d1e6eb47b561ec5e094fa814d68bc"
  },
  {
    "url": "assets/js/5.6a4c65c3.js",
    "revision": "a0f90f4bd924584aaee1a4f05c7cabb9"
  },
  {
    "url": "assets/js/6.46292f8c.js",
    "revision": "31a62dc50a54747b4470a171d96c15c3"
  },
  {
    "url": "assets/js/7.10572e47.js",
    "revision": "0ef192bf1002987205c021c41627184b"
  },
  {
    "url": "assets/js/8.36f7bd17.js",
    "revision": "97bf10e13a5e2cb188ec27710b71b3f7"
  },
  {
    "url": "assets/js/9.54304245.js",
    "revision": "0ce67e5b68d4e750f792567f7e6d6ce7"
  },
  {
    "url": "assets/js/app.8e9d57c2.js",
    "revision": "a4a77a3542a57db377a9a3d8c252bfcd"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "66dd6e22b29347b7a5a1d1563e86104e"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "812a828a4ee1eca2fe11c85e24625558"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "600b7258e1af41d0934de4ff6a0bfa5b"
  },
  {
    "url": "blog/index.html",
    "revision": "cf943f6f3d6ac7626d3c781070e6cace"
  },
  {
    "url": "blog/React核心.html",
    "revision": "f86ba66b8fcfd13608b90509676212de"
  },
  {
    "url": "index.html",
    "revision": "de26f37b16b0353890a6da9791a42bd8"
  },
  {
    "url": "interview/1.png",
    "revision": "c85755dc5ed9e965ac07c02b7a76d03d"
  },
  {
    "url": "interview/2.png",
    "revision": "c7ca719b809cd96fc6f229d746304d66"
  },
  {
    "url": "interview/3.png",
    "revision": "79c24c33bc8d230f5e454176bedc5b25"
  },
  {
    "url": "interview/bind模拟实现.html",
    "revision": "47398d3a9f4670810d52de9ea14e16f2"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "cc6abca7afc6cad85e2e14e6c226b609"
  },
  {
    "url": "interview/Event.html",
    "revision": "c4686ba141493ce2d2b66b0ed1082f43"
  },
  {
    "url": "interview/index.html",
    "revision": "1c7962e4d4c57ec16cd02b0ab3db9526"
  },
  {
    "url": "interview/javascript.html",
    "revision": "d7626a94a74c68f6821619b9959100a5"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "2d230a758e2c919c888331902b41524d"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "b7eacace0547c6d8d347286d2119b99b"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "fb685660786719b59ec0cb920951fc0a"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "a1088347e02d0df59840883a3ced129e"
  },
  {
    "url": "leetcode/index.html",
    "revision": "5d758828b7be8976bb21f3f3901a7a7f"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "fbcefba62fd90470eaa689e2b05c2bae"
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
