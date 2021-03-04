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
    "revision": "349ea430815f51ffa4afe163cb5ce709"
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
    "url": "assets/img/react_lifestyle.c34d5543.png",
    "revision": "c34d554306b1d455d4da1b61c1cd7172"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.dec0bc3e.js",
    "revision": "60fe3fe536bb9f81fda0d24ce9f9b88f"
  },
  {
    "url": "assets/js/11.15a1b851.js",
    "revision": "7c8f3c7c9aa6b45ecea259be6a67bcd0"
  },
  {
    "url": "assets/js/12.bada438e.js",
    "revision": "35d5f218d4c10e588965ed2f253d995c"
  },
  {
    "url": "assets/js/13.17ed9eb1.js",
    "revision": "f8703214a9ab553a4fd074a945c098b6"
  },
  {
    "url": "assets/js/14.4d43cef5.js",
    "revision": "69bc2b2b9dfccb7b00eb48e17df763d3"
  },
  {
    "url": "assets/js/15.2b0a9564.js",
    "revision": "a8bf370fe652dbf794fb251ee0a56326"
  },
  {
    "url": "assets/js/16.748fdd6e.js",
    "revision": "5a96cb284f0d340f7cf6b733294461dc"
  },
  {
    "url": "assets/js/17.fc963a96.js",
    "revision": "f1a204ae3e7634f3c0e1b1c8d6231c79"
  },
  {
    "url": "assets/js/18.11dc1290.js",
    "revision": "8b9189d8741fd634000ded37464be2d4"
  },
  {
    "url": "assets/js/19.5bfe1c02.js",
    "revision": "be83a5fc79360053f7436a2b32dbc9c8"
  },
  {
    "url": "assets/js/2.4b99fd0d.js",
    "revision": "b208bb8b06f2b09e041330d04362579e"
  },
  {
    "url": "assets/js/20.2d26bc50.js",
    "revision": "a58ef792a1e2f972660db676156e8c59"
  },
  {
    "url": "assets/js/21.95550a41.js",
    "revision": "4713b995925ef2fe8bd745031b6ca86e"
  },
  {
    "url": "assets/js/22.bb9189fa.js",
    "revision": "88fd4254638b30c7afcd02efab988e4a"
  },
  {
    "url": "assets/js/23.7fe8cfa2.js",
    "revision": "9d841250db5ecd3c59214164c07fe588"
  },
  {
    "url": "assets/js/24.d5abdcc4.js",
    "revision": "253bd107137b019a41e87d5b5f375c40"
  },
  {
    "url": "assets/js/25.27a930a2.js",
    "revision": "56ec15194418edbcb1e14317b1b5be73"
  },
  {
    "url": "assets/js/26.b26d31d8.js",
    "revision": "c70b2bc3d4e77fe902f3cf18bb53faf0"
  },
  {
    "url": "assets/js/27.a7df5069.js",
    "revision": "7d5e1d8eb7c669fe2d0d7a6237fac2fa"
  },
  {
    "url": "assets/js/28.4a64bb42.js",
    "revision": "c8133565f0b081ac666b45fbebddf7aa"
  },
  {
    "url": "assets/js/29.d9d062a3.js",
    "revision": "5dc22d72175d3e68e5dc2786b8c5c2cc"
  },
  {
    "url": "assets/js/3.a14a11a0.js",
    "revision": "6ceff1c3367f29fb896bad7866de09ae"
  },
  {
    "url": "assets/js/30.8c304dd2.js",
    "revision": "7dc28b3e2869bc18212a095e940960eb"
  },
  {
    "url": "assets/js/31.4d2a936b.js",
    "revision": "d5939dc2ee2d6ef34d8b437282e1711d"
  },
  {
    "url": "assets/js/32.24381f71.js",
    "revision": "37c8a6b9707537c838cce66083be4727"
  },
  {
    "url": "assets/js/33.df062aa9.js",
    "revision": "0f5d8dec434b4a434e6ca86cd81449ab"
  },
  {
    "url": "assets/js/4.c8a6c212.js",
    "revision": "9f59762e59d53c6c05232981f5dfb92a"
  },
  {
    "url": "assets/js/5.8b0a7375.js",
    "revision": "36c10c886c3f8696fbd8dff492fb1668"
  },
  {
    "url": "assets/js/6.c5beb5cf.js",
    "revision": "5d787435ad8598fb0eeab61bcac924dd"
  },
  {
    "url": "assets/js/7.1c630009.js",
    "revision": "68eb1f512f7c837a7abf3b975c797ab5"
  },
  {
    "url": "assets/js/8.376a667c.js",
    "revision": "028b6d1ca280355c7e2fcbd7d4bfc543"
  },
  {
    "url": "assets/js/9.c6729c9a.js",
    "revision": "8b634e585ddec52ca948232fa0778c56"
  },
  {
    "url": "assets/js/app.a4f76994.js",
    "revision": "612cdf90f11d4813826b0d491a931c7e"
  },
  {
    "url": "blog/ECMAScript.html",
    "revision": "e1c43d4737c8605d64c858c2ebede42a"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "63afd1c3786c8f886c14bf4e0ac1b279"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "2325d2b5f437bf572598cbfafffcd588"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "333acd2e835acdb2e69bd528293a57ab"
  },
  {
    "url": "blog/index.html",
    "revision": "d71ad170a7dd9cc3a2e198604654d424"
  },
  {
    "url": "blog/基础建设和架构.html",
    "revision": "f014bb39b2694b2d67a37f53ca0b2d58"
  },
  {
    "url": "index.html",
    "revision": "6725c9499cd91ca77fa79d2b32a25872"
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
    "revision": "14753d87b316113b70045c20190f1cdc"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "aa75faae010e9d58f6065ea3dbc88fba"
  },
  {
    "url": "interview/Event.html",
    "revision": "328db122aafc85754e9d63cec8bfcfa3"
  },
  {
    "url": "interview/GoF介绍.html",
    "revision": "7a21bb4c9dfcfcd0e2acdd1426645781"
  },
  {
    "url": "interview/index.html",
    "revision": "ca5e5eab777fd7a61f1a0d32351f37de"
  },
  {
    "url": "interview/javascript.html",
    "revision": "8cae6dbccfacbd44606c30a18d3f4e6f"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "a94b28f30fd380f13aec613d7d9f19e5"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "58ba4f3370264eb041e0c42d928f87b3"
  },
  {
    "url": "interview/react_lifestyle.png",
    "revision": "c34d554306b1d455d4da1b61c1cd7172"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "fc5e4985b4cab346efb0acf3c0c56bd0"
  },
  {
    "url": "interview/requestIdleCallback模拟实现.html",
    "revision": "b2a58a6b3a5077ecdc21df81bb00285b"
  },
  {
    "url": "interview/原型和原型链.html",
    "revision": "c96a7366904bbb13e4ce502797ba8704"
  },
  {
    "url": "interview/垃圾回收.html",
    "revision": "4a28fdf8233c80c7b44b16d5b8e9e42d"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "78f55740052919c95c0a297a883ba464"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "c701426f2f2dd340de1981d23ad1f7a7"
  },
  {
    "url": "leetcode/index.html",
    "revision": "0c8eea137e8e895fee98670964103508"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "efafc36927b3278e89fb03b94818ee88"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "b9149fe7de9328aecc4e6208436625a9"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "d0492c9bcfc5aa1f347d2e152d3fa10d"
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
