export interface ytdlsOptions {
  url: string;
  format?: "mp3" | "mp4";
}

export declare function ytdl(options: ytdlsOptions): Promise<string>;