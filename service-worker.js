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
    "revision": "f6ddf64f5805bf2f4205c644d8682d71"
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
    "url": "assets/js/17.3a810871.js",
    "revision": "07b25bf741d7150e05b41ecb9da296a3"
  },
  {
    "url": "assets/js/18.bdb00ec5.js",
    "revision": "cedf9dadf19398a9bf849a8960f5dfdf"
  },
  {
    "url": "assets/js/19.c3d8c4cb.js",
    "revision": "a86d9bbb912eece8a7bb7255daea7c40"
  },
  {
    "url": "assets/js/2.21334d0d.js",
    "revision": "5260d9b64f860798dfea660651372516"
  },
  {
    "url": "assets/js/20.0c389081.js",
    "revision": "3ef92dc606e0095122afa99fd8660aa6"
  },
  {
    "url": "assets/js/21.a8cd74d1.js",
    "revision": "12e19e4bfa1397ec628b4332afce25a0"
  },
  {
    "url": "assets/js/22.ae287dff.js",
    "revision": "d74ee29b18b9bda3bb771d7db0cc3653"
  },
  {
    "url": "assets/js/23.30e12365.js",
    "revision": "96bb47d194cc8b960dd00877cfff31c3"
  },
  {
    "url": "assets/js/24.d1b26a17.js",
    "revision": "599171a1a4348f0ed0e9bc119a57a638"
  },
  {
    "url": "assets/js/25.4374c6e6.js",
    "revision": "0c635c933a62e345285a2f358e64c1bb"
  },
  {
    "url": "assets/js/26.74f1054f.js",
    "revision": "e2666ed7e09dc79dc0fc5f96ee9f1445"
  },
  {
    "url": "assets/js/27.ca9a0ddc.js",
    "revision": "a65b0ce5932db92748f7f90431161b24"
  },
  {
    "url": "assets/js/28.70011c88.js",
    "revision": "b9aec8cbc929dafd9fcacb31a5475698"
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
    "url": "assets/js/5.6ae0260d.js",
    "revision": "d35b27ce2467fa414d984c63fa210a19"
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
    "url": "assets/js/app.9e61676a.js",
    "revision": "c49783e5bae036aa5d5134c99fce2707"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "e90f0adcea6071d1e16f60d8ab46a6ac"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "25455b70cacfb5c8044edd25ea336679"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "fc84cde849598f34d67c2499da75c8a6"
  },
  {
    "url": "blog/index.html",
    "revision": "31466d173220600f079f36834aedd8b9"
  },
  {
    "url": "blog/React核心.html",
    "revision": "47eb71cdae83cbec5def8fc2d7ce85c8"
  },
  {
    "url": "index.html",
    "revision": "c65b258adbe24231f9b15691f5073178"
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
    "revision": "ac8a82ea976c20b5feda5752ecb51ac9"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "30f3e0bef381555c2e9b037d3b46fc8a"
  },
  {
    "url": "interview/Event.html",
    "revision": "eb5e8fe9a458df86a81ec9c27354edbc"
  },
  {
    "url": "interview/index.html",
    "revision": "2a5e513fd45e7a79c006fcfe26296375"
  },
  {
    "url": "interview/javascript.html",
    "revision": "75f704d04ae7a55e6bef2381df80381e"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "89b7f8638a32ad47412100c5201d8ad6"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "246008db065c099e0e9fe3074dc01ad1"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "ac38b7214275a0769ff35938ae21e1d9"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "714d3712a8ca67989a9c307915bc3b9c"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "43d36f1653d7e7abb8766c0b7704ef0f"
  },
  {
    "url": "leetcode/index.html",
    "revision": "3aaceda5a0fec3e085a1a4af5012960a"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "631118622391ea92aaa5b405e3e10a93"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "03e32368cba95566bc39e74eac9c7946"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "531c84fae54e24176fa6533f1e3b59d8"
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
