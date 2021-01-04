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
    "revision": "120ff4fc79a78a8b751d3ebb1f0a040a"
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
    "url": "assets/js/10.210b63f9.js",
    "revision": "80694d3defed1a74fdfdf5c63aebf237"
  },
  {
    "url": "assets/js/11.0ec254b3.js",
    "revision": "76bbf2754454deeeae0eb6942eaea6bc"
  },
  {
    "url": "assets/js/12.228bda6c.js",
    "revision": "5049bd5227764c2443a0507d35ada73f"
  },
  {
    "url": "assets/js/13.16d48d9b.js",
    "revision": "9bee8b06161e1d81e4bf235c2e67a586"
  },
  {
    "url": "assets/js/2.3f822cc4.js",
    "revision": "523fa4241e637e254a70b2acb3ca7278"
  },
  {
    "url": "assets/js/3.6ff4cb8d.js",
    "revision": "e2c50b448f6fde3a325f13f9715f8566"
  },
  {
    "url": "assets/js/4.4a5c1fd4.js",
    "revision": "ed0abeaa63caa07ca020357b7a0aa91a"
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
    "url": "assets/js/9.50bb8b0a.js",
    "revision": "b8ae23576d99562306deab852224d70f"
  },
  {
    "url": "assets/js/app.98e54f8c.js",
    "revision": "0eba6d26cc852f27427a20f6ad43cbe7"
  },
  {
    "url": "blog/index.html",
    "revision": "fdf7cf042742fa43d75204a95725d151"
  },
  {
    "url": "blog/test.html",
    "revision": "398aa7e9c38b388e21326513e3e4d390"
  },
  {
    "url": "index.html",
    "revision": "c00b51f9fb2ecc5b1fe1c3c6ae5852e0"
  },
  {
    "url": "interview/index.html",
    "revision": "657e8d51e09c5c93ac6fea7efe73d0da"
  },
  {
    "url": "leetcode/index.html",
    "revision": "232f0d6c8864d5eb76e3156265506d08"
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
