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
    "revision": "0f28c52094bfcada6268de0d7dd7127f"
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
    "url": "assets/js/10.6faed654.js",
    "revision": "ad9a1bbae06e397b1e6ba889a1156c12"
  },
  {
    "url": "assets/js/2.50d8ba93.js",
    "revision": "523fa4241e637e254a70b2acb3ca7278"
  },
  {
    "url": "assets/js/3.c3c99355.js",
    "revision": "412665b5f3b4e72f4e4e787017de5df5"
  },
  {
    "url": "assets/js/4.800e3b83.js",
    "revision": "8bb136baec000c3d3b80ea110fb2ca86"
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
    "url": "assets/js/8.9516cb86.js",
    "revision": "18098f0acd0ab2b7d407544a66ebafa9"
  },
  {
    "url": "assets/js/9.2195454c.js",
    "revision": "672dcc136e3322f591de13c8beb8d029"
  },
  {
    "url": "assets/js/app.558e9417.js",
    "revision": "1726ab4a900b070377ff2f02aabc04f7"
  },
  {
    "url": "blog/index.html",
    "revision": "89d322748130c871da80ced5db0a1318"
  },
  {
    "url": "index.html",
    "revision": "db4c4c1d90d0eae36cfdc1c278eb9967"
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
