const express = require("express");
const loder = require("./loder");
const app = express();

/**
 * Simple REST API Endpoint:
 * Example: /download?url=<YouTubeLink>&format=mp3
 */
app.get("/download", async (req, res) => {
  const { url, format } = req.query;

  if (!url || !format) {
    return res.status(400).json({
      success: false,
      error: "❌ URL and format are required.",
    });
  }

  try {
    const result = await loder.download(url, format);
    res.json({
      success: true,
      title: result.title,
      thumbnail: result.thumbnail,
      downloadUrl: result.downloadUrl,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 DownloadLoder API running at http://localhost:3000");
});