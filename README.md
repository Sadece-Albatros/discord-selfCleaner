# DM Cleaner

---

## 🇬🇧 English

A selfbot tool that bulk deletes your own messages from Discord DM history.

### Requirements

- [Node.js](https://nodejs.org)

### Installation

Run `install.bat`

### Configuration

Open `config.js` and fill in your details:

```js
export default {
  token: "YOUR_DISCORD_TOKEN",     // Your Discord account token
  targetUserIds: ["USER_ID"],      // IDs of users whose DM history you want to clean
  batchSize: 100,                  // Messages fetched per request
  concurrency: 3,                  // Number of parallel operations
  retryAttempts: 3,                // Retry count on failure
  retryDelay: 1000                 // Delay between retries (ms)
};
```

> **How to get your token?**
>
> **Method 1 — Browser Network tab:**
> Open Discord in browser → F12 → Network tab → look for the `Authorization` header in any request.
>
> **Method 2 — Browser Console:**
> Open Discord in browser → F12 → Console tab → paste this and hit Enter:
> ```js
> window.webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]);m.find(m=>m?.exports?.default?.getToken).exports.default.getToken()
> ```
>
> **Method 3 — Desktop App:**
> Open Discord desktop app → `Ctrl + Shift + I` → Console tab → paste the same code above.

### Usage

Run `start.bat`

### Disclaimer

This project is for educational purposes only. The developer is not responsible for any account suspensions, data loss, or other damages that may arise from its use. Use at your own risk.

---

## 🇹🇷 Türkçe

Discord DM geçmişindeki kendi mesajlarını toplu olarak silen selfbot aracı.

### Gereksinimler

- [Node.js](https://nodejs.org)

### Kurulum

`install.bat` dosyasını çalıştır.

### Yapılandırma

`config.js` dosyasını aç ve düzenle:

```js
export default {
  token: "DISCORD_TOKENIN",        // Discord hesap tokenin
  targetUserIds: ["KULLANICI_ID"], // Mesajları silinecek kullanıcı ID'leri
  batchSize: 100,                  // Her seferinde çekilecek mesaj sayısı
  concurrency: 3,                  // Eş zamanlı işlem sayısı
  retryAttempts: 3,                // Hata durumunda tekrar deneme sayısı
  retryDelay: 1000                 // Denemeler arası bekleme süresi (ms)
};
```

> **Token nasıl alınır?**
>
> **Yöntem 1 — Tarayıcı Network sekmesi:**
> Discord'u tarayıcıda aç → F12 → Network sekmesi → herhangi bir isteğin `Authorization` başlığına bak.
>
> **Yöntem 2 — Tarayıcı Console:**
> Discord'u tarayıcıda aç → F12 → Console sekmesi → şunu yapıştır ve Enter'a bas:
> ```js
> window.webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]);m.find(m=>m?.exports?.default?.getToken).exports.default.getToken()
> ```
>
> **Yöntem 3 — Masaüstü Uygulama:**
> Discord masaüstü uygulamasını aç → `Ctrl + Shift + I` → Console sekmesi → aynı kodu yapıştır.

### Kullanım

`start.bat` dosyasını çalıştır.

### Yasal Uyarı

Bu proje yalnızca eğitim amaçlıdır. Kullanımdan doğabilecek hesap askıya almaları, veri kayıpları veya diğer zararlardan geliştirici sorumlu tutulamaz. Kullanım tamamen kullanıcının sorumluluğundadır.
