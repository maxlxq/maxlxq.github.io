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
    "revision": "7f15915787139cb5889925f18cea7615"
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
    "url": "assets/js/17.e40f50a5.js",
    "revision": "a6ebb0d2123f73495f0c1cbdc450c1d1"
  },
  {
    "url": "assets/js/18.c75e671c.js",
    "revision": "8a4292cd1aa490c21cb42235bfc2ebcc"
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
    "url": "assets/js/app.ea7d4dce.js",
    "revision": "720709477a1a18daf6220b1eaee0ff1d"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "e4875636de232ffeb166e04033db0e67"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "c38417bc4124026623c965a245e01c30"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "12daa3428d36de45494ab8991b1b0e33"
  },
  {
    "url": "blog/index.html",
    "revision": "e6c4f9fcf518505d8108abf0e10f9351"
  },
  {
    "url": "blog/React核心.html",
    "revision": "c31602c2ee411e1e874393037bb0522f"
  },
  {
    "url": "index.html",
    "revision": "ffda53e7e13604c4e5ccb337bc5c5cd8"
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
    "revision": "7fc9c618e460d8870ad4d20b0364151c"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "a5babf9cd2200e4a52376acf090fa45a"
  },
  {
    "url": "interview/Event.html",
    "revision": "0e8f9511ffbfdf574651cce007984aec"
  },
  {
    "url": "interview/index.html",
    "revision": "0e85af26481a24d07475d5dd1cfd14ac"
  },
  {
    "url": "interview/javascript.html",
    "revision": "8123068e74cb0e0daf1d6a4861a749ee"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "2001fa0d339c80576483cba40b1925f8"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "07829b5d4da1def737bf9f6418d73c26"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "4027dc1603c5c9ab9701c909a122b738"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "a620d9e8da823914c31707f9d7dab8a0"
  },
  {
    "url": "leetcode/index.html",
    "revision": "98a4dfb8aa429f6f9709a4e68664e21f"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "c4e9447f2c7446cd696d53460683cecb"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "768dd91c4906523c904c7d9a30eed68f"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "4a7d05e276b7c5ec2bd8f399fccc66cf"
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
