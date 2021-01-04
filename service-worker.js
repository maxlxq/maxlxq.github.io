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
    "revision": "13a714a0ea59afba2e000dd87332185a"
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
    "url": "assets/js/15.8459e7ea.js",
    "revision": "f2d398904af9619e1a947ddee88fc260"
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
    "url": "assets/js/app.0f4d0313.js",
    "revision": "31e252c7cea76c984aa8570ec8b77d25"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "0f07d3571efa7a04150c87ddf7414034"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "b65680b2a8011b023199ab78ca7e42ea"
  },
  {
    "url": "blog/index.html",
    "revision": "b8b2e1a2e6cc49107b7560a0c3ccc31e"
  },
  {
    "url": "blog/React核心.html",
    "revision": "0d8ea3ffa86a9094baa95ea37ee93681"
  },
  {
    "url": "index.html",
    "revision": "49f9001ca4d2707e8d5e5d4a7d4acde5"
  },
  {
    "url": "interview/index.html",
    "revision": "9d0238065f48d4e8f96eb8bb9f80cd71"
  },
  {
    "url": "interview/javascript.html",
    "revision": "d349f2a87249b219c03df86be44fcfa4"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "5dbb946d4558cef39476c84b52e2473d"
  },
  {
    "url": "leetcode/index.html",
    "revision": "d67467692f0261442f61f833b343b2cc"
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
