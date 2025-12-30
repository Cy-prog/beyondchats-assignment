import axios from "axios";
import * as cheerio from "cheerio";

const BLOG_URL = "https://beyondchats.com/blogs/";

export const scrapeOldestBlogs = async () => {
  const { data } = await axios.get(BLOG_URL);
  const $ = cheerio.load(data);

  const articles = [];

  $(".blog-item a").each((_, el) => {
    const title = $(el).text().trim();
    const url = $(el).attr("href");

    if (title && url) {
      articles.push({
        title,
        url
      });
    }
  });

  // Return last 5 (oldest)
  return articles.slice(-5);
};
