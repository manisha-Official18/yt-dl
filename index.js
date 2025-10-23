const axios = require("axios");
const qs = require("qs");

const LOADER_BASE = "https://loader.to/ajax";

/**
 * Get loader.to download ID
 * @param {string} url Video URL
 * @param {"mp3"|"mp4"} format
 * @returns {Promise<string>}
 */
async function getLoaderId(url, format = "mp4") {
  const data = qs.stringify({
    url,
    f: format,
    quality: "best",
  });

  const res = await axios.post(`${LOADER_BASE}/convert.php`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    },
  });

  if (res.data && res.data.id) {
    return res.data.id;
  }

  throw new Error("Failed to get loader ID");
}

/**
 * Poll loader.to for download link
 * @param {string} id Loader ID
 * @param {"mp3"|"mp4"} format
 * @returns {Promise<string>}
 */
async function getDownloadLink(id, format = "mp4") {
  let progress = 0;
  let link = null;

  while (progress < 100) {
    const res = await axios.get(`${LOADER_BASE}/progress.php?id=${id}`);
    if (res.data?.progress) progress = res.data.progress;
    if (res.data?.download_url) {
      link = res.data.download_url;
      break;
    }
    await new Promise((r) => setTimeout(r, 2000));
  }

  if (!link) {
    // fallback
    const res = await axios.get(
      `${LOADER_BASE}/download.php?button=1&format=${format}&id=${id}`
    );
    link = res.data?.download_url || null;
  }

  return link;
}

/**
 * Download video/audio via loader.to
 * @param {{url:string,format?: "mp3"|"mp4"}} options
 * @returns {Promise<string>} Direct download link
 */
async function ytdl({ url, format = "mp4" }) {
  if (!url) throw new TypeError("URL is required");
  if (!["mp3", "mp4"].includes(format))
    throw new TypeError("Format must be 'mp3' or 'mp4'");

  const id = await getLoaderId(url, format);
  const downloadLink = await getDownloadLink(id, format);
  return downloadLink;
}

module.exports = { ytdl };