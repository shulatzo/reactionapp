const CACHE_NAME = 'reactiongame-v1';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBmpIcmyXtI0qYDrJIhr00C1ZR9cjyHdzM",
  authDomain: "reaksiyonapp-2f23e.firebaseapp.com",
  databaseURL: "reaksiyonapp-2f23e",
  projectId: "reaksiyonapp-2f23e.firebasestorage.app",
  storageBucket: "373143175025",
  messagingSenderId: "1:373143175025:web:41324026904c9701ad00d0",
  appId: "G-8CYNDJW1FM"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const userId = Math.random().toString(36).substring(7); // Rastgele bir kullanıcı ID'si oluştur
const userRef = ref(database, 'users/' + userId);

set(userRef, { status: "connected" }).then(() => {
  console.log("Kullanıcı kaydedildi:", userId);
  document.getElementById("status").textContent = "Bağlandı!";
});

const ASSETS = [
  '/reactiongame.html',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});