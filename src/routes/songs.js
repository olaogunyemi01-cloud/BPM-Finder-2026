import express from "express";
import { searchSongs } from "../clients/getSongBpmClient.js";

export const songsRouter = express.Router();

//converts GetSongBPM’s response into a cleaner format and returns response code
songsRouter.get("/", async (request, response) => {
  const title = request.query.title?.trim();
  const artist = request.query.artist?.trim();

  if (!title) {
    return response.status(400).json({
      error: "The title query parameter is required."
    });
  }

  try {
    const songs = await searchSongs(title, artist);

    const matches = songs.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist?.name ?? "Unknown artist",
      bpm: song.tempo ? Number(song.tempo) : null,
      timeSignature: song.time_sig ?? null,
      album: song.album?.title ?? null,
      sourceUrl: song.uri
    }));

    return response.status(200).json({
      query: {
        title,
        artist: artist ?? null
      },
      count: matches.length,
      matches
    });
  } catch (error) {
    console.error(error.message);

    return response.status(502).json({
      error: "Unable to retrieve song information.",
      detail: error.message
    });
  }
});