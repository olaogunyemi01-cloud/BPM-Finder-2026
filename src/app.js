import express from "express";
import cors from "cors";
import { songsRouter } from "./routes/songs.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (request, response) => {
  response.status(200).json({
    status: "ok",
    service: "bpm-finder"
  });
});

app.use("/api/songs", songsRouter);

app.use((request, response) => {
  response.status(404).json({
    error: "Route not found."
  });
});