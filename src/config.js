import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 3000,
  getSongBpmBaseUrl:
    process.env.GETSONGBPM_BASE_URL || "https://api.getsong.co",
  getSongBpmApiKey: process.env.GETSONGBPM_API_KEY
};
