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
    "revision": "037d1e2c43972824c60adc8684d063e9"
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
    "url": "assets/js/15.e4af28fe.js",
    "revision": "148fccc590134a75e754adc26185bc34"
  },
  {
    "url": "assets/js/16.06de8304.js",
    "revision": "a14e02b3ba3a6ef0c607e31900ae602f"
  },
  {
    "url": "assets/js/17.3afd2d85.js",
    "revision": "75f36604bbc5989102e61ff6974f7021"
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
    "url": "assets/js/4.aabf2f10.js",
    "revision": "a747738f83f10aac6f82ad48c937f433"
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
    "url": "assets/js/app.74b4904d.js",
    "revision": "2b969b2ee2b6207785339832c91b7246"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "8c4dec7b4e656fdf2269d652d8fe6c68"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "c114fddcfd5cd9d4c8ddc3bc93f9bbe6"
  },
  {
    "url": "blog/index.html",
    "revision": "b450efbaf4ccb1e0b06714296d714ebd"
  },
  {
    "url": "blog/React核心.html",
    "revision": "3c81070a366b453d0350be2676f5e9d5"
  },
  {
    "url": "index.html",
    "revision": "ea6fd4b8e7d1f6fdf1dd75802dd28322"
  },
  {
    "url": "interview/index.html",
    "revision": "cae0ce40c83111d73cd710f32f80a07c"
  },
  {
    "url": "interview/javascript.html",
    "revision": "612336d0ed507add1140b8370d3422e3"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "d0ba12d65af669a87119fe17efee9e52"
  },
  {
    "url": "leetcode/index.html",
    "revision": "bc613e232b1512b5cd3de618a34557cc"
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
