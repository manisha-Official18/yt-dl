const axios = require("axios");

class Loader {
  async download(link, format = "mp3") {
    try {
      // Step 1: Create a conversion task
      const createUrl = `https://loader.to/ajax/download.php?button=1&format=${format}&url=${encodeURIComponent(
        link
      )}`;

      const createRes = await axios.get(createUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127 Safari/537.36",
          Referer: "https://yt.savetube.me/",
        },
      });

      if (!createRes.data.success || !createRes.data.id) {
        throw new Error("❌ Invalid YouTube link or unsupported format.");
      }

      const taskId = createRes.data.id;

      // Step 2: Poll progress until ready
      let downloadUrl = null;
      let title = "";
      let thumbnail = "";

      while (!downloadUrl) {
        await new Promise((r) => setTimeout(r, 3000));
        const statusUrl = `https://loader.to/ajax/progress.php?id=${taskId}`;
        const statusRes = await axios.get(statusUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127 Safari/537.36",
            Referer: "https://yt.savetube.me/",
          },
        });

        if (statusRes.data.download_url) {
          downloadUrl = statusRes.data.download_url;
          title = statusRes.data.title || "";
          thumbnail = statusRes.data.thumbnail || "";
        } else if (statusRes.data.error) {
          throw new Error("Conversion failed: " + statusRes.data.error);
        }
      }

      return { title, thumbnail, downloadUrl };
    } catch (err) {
      throw new Error("⚠️ Error: " + err.message);
    }
  }
}

module.exports = new Loader();