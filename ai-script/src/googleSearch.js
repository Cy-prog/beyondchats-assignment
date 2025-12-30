import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const SERP_API_URL = "https://serpapi.com/search";

/**
 * Search Google for article title
 * Returns top 2 external article URLs
 */
export async function searchCompetingArticles(title) {
  const response = await axios.get(SERP_API_URL, {
    params: {
      q: title,
      api_key: process.env.SERP_API_KEY,
      engine: "google",
      num: 5,
    },
  });

  const results = response.data.organic_results || [];

  // Filter out beyondchats.com links
  const filtered = results.filter(
    r => r.link && !r.link.includes("beyondchats.com")
  );

  // Return top 2 links
  return filtered.slice(0, 2).map(r => ({
    title: r.title,
    url: r.link,
  }));
}
