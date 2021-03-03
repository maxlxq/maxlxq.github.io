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
    "revision": "78ddd44a23ea37a56324679234c2d72f"
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
    "url": "assets/js/25.03c426eb.js",
    "revision": "fb9b93a14325d8535c0a06e121df8ad7"
  },
  {
    "url": "assets/js/26.9acbe081.js",
    "revision": "3b50eb273e1e11f1e68aff502e9520d8"
  },
  {
    "url": "assets/js/27.283f533b.js",
    "revision": "f054b19d412058bfa62dbf097625fc09"
  },
  {
    "url": "assets/js/28.e3193d36.js",
    "revision": "bc65aaa1cfc763748f7db7b84e296b64"
  },
  {
    "url": "assets/js/29.b6465eae.js",
    "revision": "f231a3b22c01c2cf83fc986be698efdf"
  },
  {
    "url": "assets/js/3.a14a11a0.js",
    "revision": "6ceff1c3367f29fb896bad7866de09ae"
  },
  {
    "url": "assets/js/30.eb8bc8f0.js",
    "revision": "61048d37d6625c4608cbfcc07fff0707"
  },
  {
    "url": "assets/js/31.aa44b7bc.js",
    "revision": "a417a648fb915dd3d04f55ae4ed0937b"
  },
  {
    "url": "assets/js/32.c1102041.js",
    "revision": "bdfe2ca0d9fab15aede2f49a97f8adfe"
  },
  {
    "url": "assets/js/4.fe0467e7.js",
    "revision": "22bf758592b0b064176e4afd20cdfbfa"
  },
  {
    "url": "assets/js/5.0022a1d7.js",
    "revision": "6ad089e51392156423d3aa1ea1666e85"
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
    "url": "assets/js/app.c5f21a7c.js",
    "revision": "c560c77b439d65aa821562305843375c"
  },
  {
    "url": "blog/ECMAScript.html",
    "revision": "af4d83eaac569ced1a5252a8a0dae1b9"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "703ce963fa71c507026a419eb85fe607"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "54362098a82a776ed8d8c3afdec0e6ff"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "754b935d3c6a11c081acfb8be3e941d7"
  },
  {
    "url": "blog/index.html",
    "revision": "8e713481d0c08893d0336cf66125ce1d"
  },
  {
    "url": "blog/基础建设和架构.html",
    "revision": "a32da5fa06621390372ff456fded6542"
  },
  {
    "url": "index.html",
    "revision": "08a115621b37c0e1a16583d33269329b"
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
    "revision": "6536c3a0c39ca2f1c1f003d369e854fd"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "86004336b76baa2f78e10a1620100865"
  },
  {
    "url": "interview/Event.html",
    "revision": "a920c5787547930725b7491fe5eab0ba"
  },
  {
    "url": "interview/GoF介绍.html",
    "revision": "7d91fd30b2cb87f40cd1c007673de717"
  },
  {
    "url": "interview/index.html",
    "revision": "35627560d179c3e878483ef82e1da6e3"
  },
  {
    "url": "interview/javascript.html",
    "revision": "ad7a2002c661505fd425a66392fccbff"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "9eef67c2cfe8b99cd9cdd0640694d252"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "f6bb4a66bca501dc3dccee833681895b"
  },
  {
    "url": "interview/react_lifestyle.png",
    "revision": "c34d554306b1d455d4da1b61c1cd7172"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "86b18a5637eb2228659ca0feaa399b8f"
  },
  {
    "url": "interview/requestIdleCallback模拟实现.html",
    "revision": "fc334b7ed42f570d20b7d5f61b7f58f8"
  },
  {
    "url": "interview/垃圾回收.html",
    "revision": "e755a5f3469d8e6350910ba6f312f8cc"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "1b8baf836b8f7c741c141114f4d3d936"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "055ca4e579afffae3f13409c3e5583a0"
  },
  {
    "url": "leetcode/index.html",
    "revision": "5f29ba189e4432a84902181fc19bf4b8"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "ff365899280056f01373fc5faabce369"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "59151251d51f3e8a5dd4012c5949b345"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "c2397b48f872c41bfcdfdcc4b7b24564"
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
