import dotenv from "dotenv";
dotenv.config();

import { fetchArticles, updateArticle } from "./apiClient.js";
import { searchCompetingArticles } from "./googleSearch.js";
import { scrapeArticleContent } from "./contentScraper.js";
import { rewriteArticle } from "./aiRewriter.js";

async function startPhase2() {
  console.log("🚀 Phase 2 – Full pipeline started\n");

  // 1️⃣ Fetch original articles from backend (Phase 1 API)
  const articles = await fetchArticles();

  for (const article of articles) {
    console.log(`\n📰 Original Article: ${article.title}`);

    // 2️⃣ Search Google for competitor articles
    const competitors = await searchCompetingArticles(article.title);

    const competitorContents = [];
    const references = [];

    // 3️⃣ Scrape competitor content
    for (const comp of competitors) {
      console.log(`\n🔗 Scraping competitor: ${comp.url}`);

      const scraped = await scrapeArticleContent(comp.url);

      if (scraped && scraped.content) {
        console.log(`✅ Extracted (${scraped.content.length} chars)`);

        competitorContents.push(scraped.content.slice(0, 3000));
        references.push(comp.url);
      } else {
        console.log("⚠️ Skipped competitor");
      }
    }

    if (competitorContents.length === 0) {
      console.log("❌ Not enough competitor data, skipping article");
      continue;
    }

    // 4️⃣ Rewrite article using LLM (or fallback)
    console.log("\n🧠 Rewriting article using AI...\n");

    const rewrittenContent = await rewriteArticle(
      article.title,
      competitorContents,
      references
    );

    console.log("✍️ AI GENERATED CONTENT (Preview):\n");
    console.log(rewrittenContent.slice(0, 500));

    // 5️⃣ Publish updated article back to backend (CRUD API)
    await updateArticle(article._id, {
      content: rewrittenContent,
      references,
      updatedByAI: true
    });

    console.log("✅ Article updated in database\n");
  }

  console.log("🎉 Phase 2 COMPLETED successfully");
}

startPhase2();
