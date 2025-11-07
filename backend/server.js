import express from "express";
import compression from "compression";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

import { catalog, collections, hero, timeline, movies } from "./data/catalog.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = Number(process.env.PORT ?? 8080);
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN ?? "*";

app.use(
  cors({
    origin: CLIENT_ORIGIN === "*" ? CLIENT_ORIGIN : CLIENT_ORIGIN.split(","),
  })
);
app.use(compression());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/hero", (_req, res) => {
  res.json(hero);
});

app.get("/api/movies", (req, res) => {
  const { category } = req.query;
  if (!category) {
    res.json(catalog);
    return;
  }
  const dataset = catalog[category];
  if (!dataset) {
    res.status(404).json({ error: "Категория не найдена" });
    return;
  }
  res.json(dataset);
});

app.get("/api/timeline", (_req, res) => {
  res.json(timeline);
});

app.get("/api/collections", (_req, res) => {
  res.json(collections);
});

app.get("/api/search", (req, res) => {
  const query = String(req.query.q ?? "").trim().toLowerCase();
  if (!query) {
    res.json([]);
    return;
  }
  const results = movies.filter((movie) =>
    [movie.title, movie.genre].some((value) =>
      value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(query)
    )
  );
  res.json(results.slice(0, 10));
});

const staticRoot = path.join(__dirname, "..", "wwwroot");

if (fs.existsSync(staticRoot)) {
  app.use(express.static(staticRoot));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticRoot, "index.html"));
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
