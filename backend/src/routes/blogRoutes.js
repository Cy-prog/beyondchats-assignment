import express from "express";
import { scrapeOldestBlogs } from "../scraper/blogScraper.js";
import Article from "../models/Article.js";

const router = express.Router();

/**
 * SCRAPE & CREATE
 */
router.get("/scrape-blogs", async (req, res) => {
  try {
    const blogs = await scrapeOldestBlogs();
    const saved = [];

    for (const blog of blogs) {
      const exists = await Article.findOne({ url: blog.url });
      if (!exists) {
        const article = await Article.create(blog);
        saved.push(article);
      }
    }

    res.json({
      message: "Scraping completed",
      totalScraped: blogs.length,
      saved: saved.length,
      data: saved
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * READ ALL
 */
router.get("/articles", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 1 });
  res.json(articles);
});

/**
 * UPDATE
 */
router.put("/articles/:id", async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * DELETE
 */
router.delete("/articles/:id", async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
