import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export async function scrapeArticleContent(url) {
  try {
    const res = await axios.get(url, {
      timeout: 15000,
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const dom = new JSDOM(res.data, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article || !article.textContent) {
      console.warn("⚠️ No readable content found");
      return null;
    }

    const text = article.textContent.trim();

    console.log(`✅ Extracted (${text.length} chars)`);

    return {
      title: article.title,
      content: text
    };
  } catch (err) {
    console.warn(`⚠️ Skipped (blocked or timeout): ${url}`);
    return null;
  }
}
