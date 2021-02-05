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
    "revision": "5a0e2b32ff0e3095c5d4adf4c9f44825"
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
    "url": "assets/js/10.7ce100d2.js",
    "revision": "36eb31680ae473b8233edd0c0689fb66"
  },
  {
    "url": "assets/js/11.d7d7b062.js",
    "revision": "4ddb0ddb874042b246e50e8ccb2c11fe"
  },
  {
    "url": "assets/js/12.f6ab52a1.js",
    "revision": "8e3bfb6b63224ef92f7a0a7e22685eff"
  },
  {
    "url": "assets/js/13.ecb5775e.js",
    "revision": "0031c2f52cc6a30772b9e008304e22b1"
  },
  {
    "url": "assets/js/14.f5f34e33.js",
    "revision": "8c9e4fb49c2de975e9a834a31ee93c56"
  },
  {
    "url": "assets/js/15.ddb1de53.js",
    "revision": "c0eeb20812e67871b5154c259637638e"
  },
  {
    "url": "assets/js/16.b1f6e44b.js",
    "revision": "80d5959f9feabae186d08ae5d880744b"
  },
  {
    "url": "assets/js/17.3c04f11d.js",
    "revision": "a11509856da123c0ace7df3737712f23"
  },
  {
    "url": "assets/js/18.c5ffbed1.js",
    "revision": "f3c9a3a934b60fa5ce2188dbdefc7356"
  },
  {
    "url": "assets/js/19.8b2260c8.js",
    "revision": "84b8923902a8d3dc6f289fc9d24a29b3"
  },
  {
    "url": "assets/js/2.21334d0d.js",
    "revision": "5260d9b64f860798dfea660651372516"
  },
  {
    "url": "assets/js/20.5b6f6871.js",
    "revision": "756db72ae3453a596b587301fa2876da"
  },
  {
    "url": "assets/js/21.d1b88ebd.js",
    "revision": "647703a5bc1932ae8d4f92348abac3d2"
  },
  {
    "url": "assets/js/22.1bfc58c5.js",
    "revision": "df1bc4d6fe2c0bd304f92ebf5f5219d1"
  },
  {
    "url": "assets/js/23.96e20e83.js",
    "revision": "9f6bd61535ad3cfbe7a0aaf86754ac71"
  },
  {
    "url": "assets/js/24.5c9291b1.js",
    "revision": "bf55ffda9dbfa26dd72f3647607af0c2"
  },
  {
    "url": "assets/js/25.ff9ace4c.js",
    "revision": "ded6001f4acee23f9080668dce927fb0"
  },
  {
    "url": "assets/js/26.8141e56e.js",
    "revision": "07b6657b36e9702bc5a36bbad1a4bfd4"
  },
  {
    "url": "assets/js/27.1e68c7fe.js",
    "revision": "801cdf0b406f42f194584bbb061534a5"
  },
  {
    "url": "assets/js/28.c8395733.js",
    "revision": "77c088cf2feacaec884c56500d257870"
  },
  {
    "url": "assets/js/29.c3ae10b4.js",
    "revision": "695f0f68914d1a5e428a3a4ed1b83a62"
  },
  {
    "url": "assets/js/3.636a4af6.js",
    "revision": "62624731fcf9e9631ff667ab42e829e6"
  },
  {
    "url": "assets/js/4.aa6fc9dc.js",
    "revision": "b26d1e6eb47b561ec5e094fa814d68bc"
  },
  {
    "url": "assets/js/5.97dfc295.js",
    "revision": "fb78da2a9bb371e97751fb3cf4b17852"
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
    "url": "assets/js/app.2f60cac9.js",
    "revision": "ce93b156f1450bcc898b1a6c6e50b1a0"
  },
  {
    "url": "blog/ECMAScript.html",
    "revision": "5440e03208c91af86b0d58ef9cd609e9"
  },
  {
    "url": "blog/Fiber详解.html",
    "revision": "4e36164251497b5855282c59bf5cf1d3"
  },
  {
    "url": "blog/Git使用.html",
    "revision": "6bd61f6641db71a4c86940c9d2af76af"
  },
  {
    "url": "blog/HTTP发展.html",
    "revision": "fbed154e846ce836306f0be134bd4c9e"
  },
  {
    "url": "blog/index.html",
    "revision": "33bfe0910f0d1365d59f2244e76ef19d"
  },
  {
    "url": "blog/React核心.html",
    "revision": "35329c17b61d7c74a63cab8caa6eec18"
  },
  {
    "url": "index.html",
    "revision": "058cc008452ebdd99f362cdb2f8cc0af"
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
    "revision": "282760ae49566976882c893ec9d44e82"
  },
  {
    "url": "interview/call和apply模拟实现.html",
    "revision": "a5961019a49f809bc6080f72b9aa4809"
  },
  {
    "url": "interview/Event.html",
    "revision": "bcf2a14a758dff46944cc877660f1931"
  },
  {
    "url": "interview/index.html",
    "revision": "4952cf856f099a8c0a8aeddc00a971ac"
  },
  {
    "url": "interview/javascript.html",
    "revision": "e44e298f85a3a837da8c77cf77b1b509"
  },
  {
    "url": "interview/JS基础.html",
    "revision": "200c999c5288de5c1c269d6c36a54176"
  },
  {
    "url": "interview/new模拟实现.html",
    "revision": "a9ae10d0ccefeed428b6650d72cbdd93"
  },
  {
    "url": "interview/React知识点.html",
    "revision": "4730f0396d91a46404ac3c6e3ccd5842"
  },
  {
    "url": "interview/浏览器输入URL系列.html",
    "revision": "0ec295f5c88e8baaed9466c4b1deda23"
  },
  {
    "url": "leetcode/Array.html",
    "revision": "462c75007bcea4aa274ae4baf1fa75ac"
  },
  {
    "url": "leetcode/index.html",
    "revision": "77a48af719c7c2f7ef0cec668441bcc9"
  },
  {
    "url": "leetcode/Tree.html",
    "revision": "7e3d1e10267feef812353c3fa8a0b7f5"
  },
  {
    "url": "logo.jpg",
    "revision": "d03551ee4850b458def4a39cc01790b7"
  },
  {
    "url": "mdn/index.html",
    "revision": "a70da2f2eb2ec7814fa2d9627261caae"
  },
  {
    "url": "mdn/真_基础.html",
    "revision": "1d658700acc37abc44dd504aa3fa851e"
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
