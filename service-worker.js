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
    "revision": "f734f5030eed72aaea45aa937c76b008"
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
    "url": "assets/js/17.1269caef.js",
    "revision": "8e126bff0cb9bb1524992ba22eb7ce52"
  },
  {
    "url": "assets/js/18.5cede34a.js",
    "revision": "b8a5de9fe324abb43918f2010b554f30"
  },
  {
    "url": "assets/js/19.d926ac26.js",
    "revision": "c7dd44e88603d3983a7b6150f2f612b9"
  },
  {
    "url": "assets/js/2.6620eda4.js",
    "revision": "ac14f2c21508c0fe03f185a2c7c12993"
  },
  {
    "url": "assets/js/20.cc50c93b.js",
    "revision": "936a4869af6e1d918cd13b3e9b00f0dd"
  },
  {
    "url": "assets/js/21.d17d7191.js",
    "revision": "b01f4dff94ac67528f06a23bcf0fac36"
  },
  {
    "url": "assets/js/22.969f34b9.js",
    "revision": "06f20ca1407b6492adb0e39503496b11"
  },
  {
    "url": "assets/js/23.02887f74.js",
    "revision": "3c07845857aad8899e210929a728db8e"
  },
  {
    "url": "assets/js/24.b73baeff.js",
    "revision": "df2bd2b7b6d0a77ae6e2219966fdd9f5"
  },
  {
    "url": "assets/js/25.e4b4807c.js",
    "revision": "5a50d786314527bca57dca17ea3e3df8"
  },
  {
    "url": "assets/js/3.7ee1a3e6.js",
    "revision": "9fcbec1c072c47be7e910e801b0fdf52"
  },
  {
    "url": "assets/js/4.19e7613d.js",
    "revision": "798921280d8ad6370b9d0937bb79c47e"
  },
  {
    "url": "assets/js/5.09e36ba5.js",
    "revision": "6beca6f922e50c5060e71fda2b50ca72"
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
    "url": "assets/js/app.66e1a963.js",
    "revision": "8f2a89c03f7aa33e50ab9e48ab8aae65"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "a7420ab4340dcd51c4f7747274c5d21d"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "593d23bbc786af92285d7dee5fa019e5"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "30ec94c7adede6a30c75744de990ad33"
  },
  {
    "url": "blog/index.html",
    "revision": "7106f761242523811fcc082f7dee87ac"
  },
  {
    "url": "blog/React核心.html",
    "revision": "69c42333dd6a01fbfd0a4f0715fc7b44"
  },
  {
    "url": "index.html",
    "revision": "33eccd2faf398dd3a2a0038f53dfc631"
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
    "revision": "5e1f028064f58e3499a42c88d21814d4"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "503d6eb45965a2df1866d1db35a79857"
  },
  {
    "url": "interview/Event.html",
    "revision": "9e3314f447c82f0e8505ab90e3ea080d"
  },
  {
    "url": "interview/index.html",
    "revision": "f2449fbfa3507436a07dd065e1ead5be"
  },
  {
    "url": "interview/javascript.html",
    "revision": "0b605f923d0540ba69661875eadf892b"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "14263c5c1e266079a8650c7eab5ed9f0"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "7163f363eaf55541393d1949c8ab8908"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "03a07c73d16afaba0e04f5dfce115f73"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "1904942c222875aeb934d1b86918dea3"
  },
  {
    "url": "leetcode/index.html",
    "revision": "a09d4827f8f797feeebcfe2c2f19de36"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "cdda18d5652f6c234645ff58cb413cca"
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
