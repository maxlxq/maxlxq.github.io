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
    "revision": "a9bd3fcf3c35a7db9e6b57d07ba6aa11"
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
    "url": "assets/js/25.4f4d34dd.js",
    "revision": "bf12aa6b8b110c12e5dce53f78036434"
  },
  {
    "url": "assets/js/26.a7901b76.js",
    "revision": "fc269ad06d9c28dd32395d69adec9117"
  },
  {
    "url": "assets/js/27.44caee2d.js",
    "revision": "b6433046633cf5c937d11e240a3fa1ad"
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
    "url": "assets/js/5.d643c6f4.js",
    "revision": "e1be84fdf7e9dad45db2edb58844dd47"
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
    "url": "assets/js/app.249a9c37.js",
    "revision": "6b75ceeb6583544340203b34b83a5ce3"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "bf0ed0353b532450a295550126d6e970"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "60b249c98b7bdf4bb9ef6242c7a37688"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "0cc6040b9907c09cdff9c7536f6b3b2f"
  },
  {
    "url": "blog/index.html",
    "revision": "c32b6a6b67bd3c5bd8869e028e1bcf4f"
  },
  {
    "url": "blog/React核心.html",
    "revision": "6df53a7eb7e309fa2fa8760cc5ceded4"
  },
  {
    "url": "index.html",
    "revision": "482a0decb58ca90b8cc2cfdfc45111d7"
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
    "revision": "2d1ddf7b6922bf78120012b7a762999e"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "71428155baace3df21df417ea21a384a"
  },
  {
    "url": "interview/Event.html",
    "revision": "a44eaf4d0aa25e916211ae9f5bf9b577"
  },
  {
    "url": "interview/index.html",
    "revision": "2f0d8479e94403025de38299344eef93"
  },
  {
    "url": "interview/javascript.html",
    "revision": "a4ca8486f42439be8e0052986f9d83d0"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "06f46018ce5e9445f49c63bf249eb818"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "7039c53bb8c82a003cfbe7d50d9cf5d0"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "d7503687ac73157da17775fea404dc38"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "a5cc57eabd7fd5bb99dadc915095c34c"
  },
  {
    "url": "leetcode/index.html",
    "revision": "857685c6fda8927c2e1e7b787e94e162"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "e6176882ab9c64faf579cf1bde222622"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "a5452123432b3477006d74d34736e50a"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "7951abaf4dcfc6400175d46d5f5ea880"
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
