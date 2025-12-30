# BeyondChats Assignment – Phase 1 (Backend & Scraping)

## Overview
Phase 1 implements the backend system for the BeyondChats assignment.  
It scrapes blog articles from the BeyondChats website, stores them in MongoDB, and exposes full CRUD APIs to manage the articles.

---

## Features
- Scrapes the **5 oldest blog articles** from BeyondChats
- Stores articles in **MongoDB**
- Provides **full CRUD APIs**
- Includes a **health check endpoint**
- Prevents duplicate articles using source URL checks

---

## Data Source
- Blogs scraped from:  
  https://beyondchats.com/blogs/

---

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Axios**
- **Cheerio**
- **dotenv**

---

## API Endpoints

### Scraping
- `GET /api/scrape-blogs`  
  Scrapes and stores the 5 oldest blogs from BeyondChats

### Articles CRUD
- `GET /api/articles` – Fetch all articles  
- `PUT /api/articles/:id` – Update an article  
- `DELETE /api/articles/:id` – Delete an article  

### Health Check
- `GET /health` – Server health status

---

## Environment Variables
Create a `.env` file in the backend root directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
