const cacheName = "TS-CACHE"
const assets = [
	"./",
	"./index.html",
	"./style.css",
	"./darkMode.js",
	"./script.js",
	".manifest.json",
	"./assets/forex-logo.png",
	"./assets/android-chrome-192x192.png",
	"./assets/android-chrome-512x512.png"
]

// freecodecamp blog

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open(cacheName).then(cache => {
			cache.addAll(assets)
		})
	)
})

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request)
		})
	)
})

// pwa in 10 minutes YT video

// self.addEventListener("install", async e => {
// 	const cache = await caches.open(cacheName)
// 	await cache.addAll(assets)
// 	return self.skipWaiting()
// })

// self.addEventListener("activate", e => {
// 	self.clients.claim()
// })

// self.addEventListener("fetch", async e => {
// 	const req = e.request
// 	const url = new URL(req.url)

// 	if (url.origin === location.origin) {
// 		e.respondWith(cacheFirst(req))
// 	} else {
// 		e.respondWith(networkAndCache(req))
// 	}
// })