declare module "downloadloder" {
  interface DownloadResult {
    title: string;
    thumbnail: string;
    downloadUrl: string;
  }

  export function download(
    url: string,
    format: string
  ): Promise<DownloadResult>;
}