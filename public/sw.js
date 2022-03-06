<<<<<<< HEAD
if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,r,i)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const a={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return n;case"module":return a;default:return e(s)}}))).then((e=>{const s=i(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-21b21c9a"],(function(e){"use strict";importScripts("fallback-dJXopkd1dIbb3ejOsrpsf.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/20210921-job.xml",revision:"aeae645b9e7cb99254ce860010cd9808"},{url:"/20210921-job.xml.gz",revision:"a9f4bf1724ffb910c58002f8ab9d79b0"},{url:"/_next/static/chunks/106.d293aa1293cfa4faa472.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/127.e23dc84d93bcb9983721.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/130.bebbfc4c8b81fc7537a2.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/142.cb645abc5f8d906056fa.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/146.08358d55c96a46914bbb.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/196-1437daf6b70190849e8c.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/269-43e8acd1af4ea059a01e.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/3.f3e7a8a10b1fadbb98a7.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/364.512d2979e20dd2c9c7b9.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/406-58e8b980306025997fe2.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/443.0820701b1870516b6384.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/548.d48ec7166a22a4a55271.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/557.48882f1a4da1dc262048.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/594.5f666d1fbc42b428cd07.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/61-3f4541c8f0626a76cd95.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/645.00f56b131b690fe3a88f.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/659.b312a5fbd1901213506a.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/671.545869df647016fd3494.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/705.9e561143fa0177cee1fa.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/783.45aecfe6eacf1b6c07d4.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/826.b0258812bbe43b6eba4e.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/918.23a7fc9ee580fb7bd449.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/eabe11fc.21f1b117605f34abd337.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/framework-d0785ac6afe5ff41719e.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/main-8271677d4fed07a5771f.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/404-1ae82f4763f72596dcf0.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/500-dacfb2e03c51fa2e381a.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/_app-798ac7ba356305e23327.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/_error-0e149838be53f5361c07.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/_offline-5d04a81fc365e34a9ff4.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/about-ada93447c8486be19e48.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/about/%5BuserSlug%5D-cda1256cc84e50bce479.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/index-e5a03c2344a89a783883.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/job-4385d68626738a4f0181.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/job/%5BjobSlug%5D-37301214e2e30016b17e.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/job/about/%5BjobSlug%5D-69a17cae88808fb2af49.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/job/postjob-740d9f1d40e31faef694.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/legal/privacy-policy-e996c4a2b2aa2bbb3d74.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/legal/terms-conditions-8d56dae67bb794ec7865.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/login-9b67ea8e2cbae1a6b285.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/login/logout-09a59bc1d4f77d5878e3.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/login/verify-1b6371b9a3174634b2f5.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/pages/report-3168e6499f08375409a2.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/chunks/webpack-84c4605f3a97428e1d63.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/css/006024f9cbb5df2c2863.css",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/css/ce2ecdcd3f234e49efe9.css",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/dJXopkd1dIbb3ejOsrpsf/_buildManifest.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/dJXopkd1dIbb3ejOsrpsf/_ssgManifest.js",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_next/static/image/public/icons/logo.2b5024f176beff584cc039179d038098.png",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/_offline",revision:"dJXopkd1dIbb3ejOsrpsf"},{url:"/favicon.ico",revision:"c125e2c5afb07b2ff4e8c12d7daa3b25"},{url:"/google7921e676a7102fd5.html",revision:"4fdb992801f07d932eeb48c97ffff822"},{url:"/icons/icon-128x128.png",revision:"d626cfe7c65e6e5403bcbb9d13aa5053"},{url:"/icons/icon-144x144.png",revision:"e53a506b62999dc7a4f8b7222f8c5add"},{url:"/icons/icon-152x152.png",revision:"18b3958440703a9ecd3c246a0f3f7c72"},{url:"/icons/icon-16x16.png",revision:"83703514f19796ee15151e450984416d"},{url:"/icons/icon-192x192.png",revision:"27dc12f66697a47b6a8b3ee25ba96257"},{url:"/icons/icon-32x32.png",revision:"25e2c6ee34840568012b32e4314278df"},{url:"/icons/icon-384x384.png",revision:"a40324a3fde2b0b26eeffd4f08bf8be8"},{url:"/icons/icon-512x512.png",revision:"93d6e8e15cfa78dfee55446f607d9a28"},{url:"/icons/icon-72x72.png",revision:"f2ffc41b3482888f3ae614e0dd2f6980"},{url:"/icons/icon-96x96.png",revision:"fba02a40f7ba6fc65be8a2f245480f6d"},{url:"/icons/logo.png",revision:"7316a44f79c833012b4e792a45a6be99"},{url:"/manifest.json",revision:"c2556a669febee83260ad7a0f5cc07d3"},{url:"/robots.txt",revision:"33162d20f6b350ece5f8caa0e43b5884"},{url:"/sitemap.xml",revision:"8146fe070d6da103597ab4343f4eb3ae"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:r})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));
=======
/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-d1b0e804'], (function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  importScripts("fallback-development.js");
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }

        return response;
      }
    }, {
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: [{
      handlerDidError: async ({
        request
      }) => self.fallback(request)
    }]
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
>>>>>>> 7885e9ba8abc3ddb50b7fe527e5208bcb46ee879
