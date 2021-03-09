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
    "revision": "1982126fe310140793e8d06314e97e48"
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
    "url": "assets/js/32.38cb9a47.js",
    "revision": "63ce83f8175de2b7ac99a2f0db826c2b"
  },
  {
    "url": "assets/js/33.cfadd31a.js",
    "revision": "1f2818159cea263ee85e95d20834b4ba"
  },
  {
    "url": "assets/js/34.ba660f57.js",
    "revision": "d579115a254ca7da0ecdf33e7008719b"
  },
  {
    "url": "assets/js/4.c8a6c212.js",
    "revision": "9f59762e59d53c6c05232981f5dfb92a"
  },
  {
    "url": "assets/js/5.3981a26a.js",
    "revision": "d27a93066e10bb0a21675002cb476f49"
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
    "url": "assets/js/app.d93c569d.js",
    "revision": "122bbe877db55b7fbddefe03b83bcd89"
  },
  {
    "url": "blog/ECMAScript.html",
    "revision": "474bfa74cbd2c116bf68e8264713182c"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "97b474db736266a0b0db4d9bb3ee1a50"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "09b02f3881762ebdc0e849720242863c"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "4d6c230d94ecdd2ee36fb7ec7c49e2db"
  },
  {
    "url": "blog/index.html",
    "revision": "1f958576a3ed5701b306267a0133a87f"
  },
  {
    "url": "blog/基础建设和架构.html",
    "revision": "6beab2a764aa45d2d4d4a773e10fd252"
  },
  {
    "url": "index.html",
    "revision": "e88a8c8ebfbf67afe8b2513fc6488a33"
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
    "revision": "ea9075e5ef3ec4201942ee9abadb457b"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "3e8671a52eaec9202825b91ec05fe167"
  },
  {
    "url": "interview/Event.html",
    "revision": "c0c1d86438b7f4c1a4608c5b7e30d38b"
  },
  {
    "url": "interview/GoF介绍.html",
    "revision": "ab1f41e8cf2cd86ba1eb35788b4de6ca"
  },
  {
    "url": "interview/index.html",
    "revision": "e562a9cd1efab74e4410ff03a4c57b80"
  },
  {
    "url": "interview/javascript.html",
    "revision": "50dc18d3a3d9489211fc1c72ee06e128"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "b275b63133af3ba84a9d59de83a5c802"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "bc7712af5d960336d563ea0a427ba5f9"
  },
  {
    "url": "interview/react_lifestyle.png",
    "revision": "c34d554306b1d455d4da1b61c1cd7172"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "944ea16b8f6c3600ded7554c1c61a359"
  },
  {
    "url": "interview/requestIdleCallback模拟实现.html",
    "revision": "26e4f660bce9d4bbdfdd5b3fec70d9fc"
  },
  {
    "url": "interview/原型和原型链.html",
    "revision": "81c6146033bccce96d5b4c4b98b2b6b2"
  },
  {
    "url": "interview/垃圾回收.html",
    "revision": "a8b05c3662a82673c37f5c00b1607a9a"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "4de8290f279cf698c4b549bab15652c1"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "afa4a9250e19d79c25f4616d78eb5b94"
  },
  {
    "url": "leetcode/index.html",
    "revision": "cb7cd50ddfe22195a010c4f51ba7eec4"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "0b056f0c724be609783f1756314ecaed"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "bd20366d0968310aa6dbfdfb72bb9bf4"
  },
  {
    "url": "mdn/Symbol.html",
    "revision": "504f96af0aa3a40941a889417b27aad9"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "0e7e0bc18a97a5cc236e09f63ad21e8f"
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
