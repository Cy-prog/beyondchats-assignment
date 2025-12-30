# Phase 2: AI-Powered Article Enhancement Pipeline

Phase 2 extends the backend system by introducing an automated pipeline that enhances existing articles using external references and AI-driven rewriting, and then publishes the updated content back to the backend using CRUD APIs.

---

## 🎯 Objectives

The objectives of Phase 2 are to:

- Fetch articles created in Phase 1 via backend APIs
- Search Google for related competitor articles
- Scrape content from competitor blogs/articles
- Rewrite the original article using an AI-based (or simulated) approach
- Publish the updated article back to the database using existing CRUD APIs

---

## 🧱 Architecture Overview

Phase 2 is implemented as a **separate Node.js script** (`ai-script`) to maintain separation of concerns between backend APIs and AI processing.

### High-Level Flow

1. Fetch articles from backend API  
2. Search Google for competitor articles  
3. Scrape competitor article content  
4. Rewrite article using AI (or fallback)  
5. Update the article using backend CRUD APIs  

---

## 📁 Folder Structure (Phase 2)

ai-script/
└── src/
├── index.js # Orchestrates the entire Phase 2 pipeline
├── apiClient.js # Backend API communication
├── googleSearch.js # Google search integration
├── contentScraper.js # Scrapes competitor article content
├── aiRewriter.js # AI / fallback article rewriting logic


---

## 🔹 Step 1: Fetch Articles from Backend

Articles are fetched from the backend created in Phase 1.

**API Used**

GET /api/articles


**Purpose**
- Retrieve original articles stored in MongoDB
- Provide input data for enrichment and rewriting

---

## 🔹 Step 2: Google Search Integration

For each article title, a Google search is performed to find **two relevant competitor articles** published by other websites.

**Purpose**
- Identify authoritative or high-ranking content
- Use external references as inspiration for rewriting

---

## 🔹 Step 3: Scrape Competitor Articles

The competitor URLs obtained from Google search are scraped to extract the **main readable content**.

**Implementation Details**
- Uses `axios` for HTTP requests
- Uses `jsdom` and `@mozilla/readability` to extract article text
- Implements timeout handling and graceful error recovery

**Fault Tolerance**
- Blocked or timed-out websites are skipped
- Pipeline continues execution without crashing
- At least one valid competitor article is sufficient to proceed

---

## 🔹 Step 4: AI-Based Article Rewriting

The scraped competitor content is used to rewrite the original article.

### Rewriting Rules
- Content is rewritten to improve clarity, structure, and depth
- Competitor content is used only for inspiration
- No direct copying of text
- Headings and paragraphs are added
- A **References** section is appended at the end

### LLM Integration Note
The system is designed with a **pluggable LLM interface**.

- Real LLMs such as Gemini or OpenAI can be integrated easily
- Due to API availability, quota, or regional limitations, a **fallback implementation** is provided
- The fallback simulates rewritten content while preserving:
  - Pipeline integrity
  - Reference citation
  - Backend update flow

This design ensures the pipeline remains **robust, reproducible, and production-ready**.

---

## 🔹 Step 5: Publish Updated Articles via CRUD API

Once an article is rewritten, it is published back to the backend using existing CRUD APIs.

**API Used**

PUT /api/articles/:id


**Request Payload Example**
```json
{
  "content": "AI-generated rewritten article content",
  "references": [
    "https://example.com/reference-1",
    "https://example.com/reference-2"
  ],
  "updatedByAI": true
}

Purpose

Persist enhanced content in MongoDB

Clearly mark articles updated by AI

Reuse Phase 1 APIs without modification