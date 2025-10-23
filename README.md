# YTDL DOWNLOADER

A Node.js module and WhatsApp bot commands for downloading YouTube videos and songs via [loader.to](https://loader.to), supporting **mp3** and **mp4** formats. Also supports searching YouTube using `yt-search`.

---

## Installation

```
/// USE 
// Example usage
if (require.main === module) {
  (async () => {
    try {
      const url = "https://www.youtube.com/watch?v=XXXXXXX";
      const mp4Link = await ytdl({ url, format: "mp4" });
      console.log("MP4 Download Link:", mp4Link);

      const mp3Link = await ytdl({ url, format: "mp3" });
      console.log("MP3 Download Link:", mp3Link);
    } catch (e) {
      console.error(e);
    }
  })();
}
```
```bash
npm install
