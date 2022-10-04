const version = "1.0.0" // change version to push update to mobile app
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