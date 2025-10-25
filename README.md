# 🎵 downloadloder

A lightweight and fast Node.js module for downloading YouTube videos and songs via the **Loader.to / SaveTube API**.

---

## 🚀 Installation

```bash
npm install downloadloder

## 🚀 Usage

```js

const loder = require("downloadloder");

(async () => {
  try {
    const result = await loder.download(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "mp3"
    );
    console.log(result);
  } catch (err) {
    console.error(err.message);
  }
})();

```

### Example Output

```js

{
  "title": "Rick Astley - Never Gonna Give You Up",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
  "downloadUrl": "https://loader.to/somefile.mp3"
}

```


# pluggins Example
```
const { cmd } = require("../utils");
const loder = require("downloadloder");

cmd({
  pattern: "song",
  alias: ["ytmp3", "music"],
  react: "🎶",
  desc: "Download YouTube song using downloadloder package",
  category: "download",
  use: "<YouTube link>",
  filename: __filename
}, async (conn, m, mek, { from, reply, q }) => {
  try {
    if (!q) return reply("🎵 කරුණාකර YouTube link එකක් දෙන්න!");

    await conn.sendMessage(from, { react: { text: "⏳", key: m.key } });

    const result = await loder.download(q, "mp3");

    await conn.sendMessage(from, {
      image: { url: result.thumbnail },
      caption: `🎶 *${result.title}*\n\n⬇️ *Downloading MP3...*`,
    }, { quoted: m });

    await conn.sendMessage(from, {
      audio: { url: result.downloadUrl },
      mimetype: "audio/mpeg",
      fileName: `${result.title}.mp3`,
      ptt: false
    }, { quoted: m });

    await conn.sendMessage(from, { react: { text: "✅", key: m.key } });
  } catch (err) {
    console.error("Song Download Error:", err.message);
    reply("❌ *Song download fail:* " + err.message);
  }
});

```