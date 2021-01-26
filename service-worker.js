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
    "revision": "936c8294eaeac22d27c73007c860c0e2"
  },
  {
    "url": "assets/css/0.styles.f85f523a.css",
    "revision": "2215f82e28cc5408f4c946e26348e7b3"
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
    "url": "assets/js/10.0217def4.js",
    "revision": "34081c8ab9d9bf33c84b44c791540363"
  },
  {
    "url": "assets/js/11.c98e243a.js",
    "revision": "34711b941cfc62e13fc4d5f64f6bf7d3"
  },
  {
    "url": "assets/js/12.b73f0c78.js",
    "revision": "0b6d465c6fd62c67ae85d6949b5c70d6"
  },
  {
    "url": "assets/js/13.0548ed0e.js",
    "revision": "bc2f43efabadde2919adbad65206ea66"
  },
  {
    "url": "assets/js/14.b753c25d.js",
    "revision": "bf1142eef929a9956589131228fbf746"
  },
  {
    "url": "assets/js/15.1193134e.js",
    "revision": "55737f09211134c6a830425aa8a05bdf"
  },
  {
    "url": "assets/js/16.96fb9169.js",
    "revision": "63de3a61ecb921917978edade3afcd1d"
  },
  {
    "url": "assets/js/17.29ca8b46.js",
    "revision": "b58878edc177655260a02080507371ef"
  },
  {
    "url": "assets/js/18.6cddb019.js",
    "revision": "f9ebb8f9aed9546a9ef26e0bfbd99ec0"
  },
  {
    "url": "assets/js/19.cb77db9f.js",
    "revision": "c22926521fabb8de20ef472cbcfc93b6"
  },
  {
    "url": "assets/js/2.4f86b7d5.js",
    "revision": "357524cb08d487b81a0dec7b6039d898"
  },
  {
    "url": "assets/js/20.fe67579a.js",
    "revision": "15e3f913186cf3bf70833f3a1415d9b6"
  },
  {
    "url": "assets/js/21.aa140c6c.js",
    "revision": "8c40c31a5859d028cc192b0314ec7eac"
  },
  {
    "url": "assets/js/22.b9dee439.js",
    "revision": "ff38141e963bef9fae0ab24613a20558"
  },
  {
    "url": "assets/js/3.7ee1a3e6.js",
    "revision": "9fcbec1c072c47be7e910e801b0fdf52"
  },
  {
    "url": "assets/js/4.ec3551d8.js",
    "revision": "8e5f4ae061858397eae908b173b78620"
  },
  {
    "url": "assets/js/5.47b8a6e7.js",
    "revision": "6f3b08e378abc6226da881fa1db7b3cd"
  },
  {
    "url": "assets/js/6.ec5451c7.js",
    "revision": "f6ea27bf58c9a6dd2d8934e23d671f7c"
  },
  {
    "url": "assets/js/7.5ec62129.js",
    "revision": "dd46657690cead72dda05098dda3f799"
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
    "url": "assets/js/app.daee9557.js",
    "revision": "794c3bc4da5590a808f310a06a8c8aa4"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "cae1fd1ebd667c94abae95adb0e946dd"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "02f475fb6f3bb87157add7bd48bdd477"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "481a26519f24e8c2b8bc599ccb8cfaef"
  },
  {
    "url": "blog/index.html",
    "revision": "f9c4ff7d9a66861566bbb253642f3938"
  },
  {
    "url": "blog/React核心.html",
    "revision": "8ac44e6a3ae6707a40927055da94b4b4"
  },
  {
    "url": "index.html",
    "revision": "0f9c65f41ddd6b3f2d2ae8c1c2c9d7bf"
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
    "url": "interview/Event.html",
    "revision": "250e5c023c8669ea9ee43bf3ad69a0ab"
  },
  {
    "url": "interview/index.html",
    "revision": "94943eb3e0db1399e7a51d9bf10d7829"
  },
  {
    "url": "interview/javascript.html",
    "revision": "ca7389eb53d8b2464430f6696d6405c7"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "e94731dce44e9273e1a4535aa1202312"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "dbb84bf96317a5783fc1d691cdaa17e0"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "68bc63994a84055ddce38f1a67d36d28"
  },
  {
    "url": "leetcode/index.html",
    "revision": "c892f19032c145e4919ad44412caf042"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "41deb55fa4f806b46e4a645fbff0f67f"
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
