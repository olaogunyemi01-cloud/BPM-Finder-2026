import { config } from "../config.js";

//function that calls API and makes a GET request to find a song's BPM
export async function searchSongs(title, artist) {
  if (!config.getSongBpmApiKey) {
    throw new Error("GETSONGBPM_API_KEY has not been configured.");
  }

  const lookup = artist
    ? `song:${title} artist:${artist}`
    : title;

  const parameters = new URLSearchParams({
    type: artist ? "both" : "song",
    lookup,
    limit: "10"
  });

  const url = `${config.getSongBpmBaseUrl}/search/?${parameters}`;

  const response = await fetch(url, {
    headers: {
      "X-API-KEY": config.getSongBpmApiKey,
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(
      `GetSongBPM request failed with status ${response.status}.`
    );
  }

  const body = await response.json();

  return body.search ?? [];
}
