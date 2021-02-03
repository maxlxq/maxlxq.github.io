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
    "revision": "3af033d76664287d3b5c0096bb051ca2"
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
    "url": "assets/js/17.70568335.js",
    "revision": "7a9fc68f8759bf8d831d1ac1f39e47a6"
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
    "url": "assets/js/app.4074fcb6.js",
    "revision": "6ba1130be0c499c52778c00244a3f042"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "bd9857992982dfd82723cf5f0f4f75a1"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "cab381a27827e0f52c5b36c2368fb2a6"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "b42ba5795c800e0c7d780cb427f8410c"
  },
  {
    "url": "blog/index.html",
    "revision": "ebbcb529612b5e2918ccfa7281c80374"
  },
  {
    "url": "blog/React核心.html",
    "revision": "bdc8f02cb6527551152ca74522227096"
  },
  {
    "url": "index.html",
    "revision": "6a5451f03d7a93bd5b821135ba4ceacb"
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
    "revision": "a85a88d521aa29a7b33f5d15a76fceb0"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "dce4c8b00f2192c843d523c950379294"
  },
  {
    "url": "interview/Event.html",
    "revision": "ac1a346acb57c3d181711ffa21da8277"
  },
  {
    "url": "interview/index.html",
    "revision": "68505f7097f9807203d4a06820ec6069"
  },
  {
    "url": "interview/javascript.html",
    "revision": "838e9c422d367b2ff3374de443d99781"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "9bc7c4c4f39cdf4fafb265946032e948"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "7f564eb10f66c9115925cc03e6a807c4"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "ff8b80a177a45332f2131dffb97b0405"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "017fdc3d5925934691fef9b789aad23c"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "643396034a785793350b27cbb7531da8"
  },
  {
    "url": "leetcode/index.html",
    "revision": "17a886fafcdcd09409155f106e579435"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "1cd7ba5153b301d20c4be43433a79ba0"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "e8fd52809b844854252c4cf1e8b23361"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "e4083c725d5acba09d54f9ecefc77c4f"
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
