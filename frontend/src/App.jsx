import { useEffect, useState } from "react";
import { fetchArticles } from "./services/api";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await fetchArticles();
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  if (loading) {
    return <p className="loading">Loading articles...</p>;
  }

  const aiArticles = articles.filter(a => a.updatedByAI);
  const originalArticles = articles.filter(a => !a.updatedByAI);

  return (
    <div className="container">
      <h1>BeyondChats Articles</h1>

      {/* AI Updated Articles */}
      <section>
        <h2>AI Updated Articles</h2>
        {aiArticles.length === 0 ? (
          <p>No AI-updated articles yet.</p>
        ) : (
          <div className="articles">
            {aiArticles.map(article => (
              <ArticleCard key={article._id} article={article} isAI />
            ))}
          </div>
        )}
      </section>

      {/* Original Articles */}
      <section>
        <h2>Original Articles</h2>
        {originalArticles.length === 0 ? (
          <p>No original articles.</p>
        ) : (
          <div className="articles">
            {originalArticles.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ArticleCard({ article, isAI }) {
  return (
    <div className={`card ${isAI ? "ai" : ""}`}>
      <h3>{article.title}</h3>

      {article.content ? (
        <p>{article.content.slice(0, 220)}...</p>
      ) : (
        <p className="muted">No generated content available.</p>
      )}

      <a href={article.url} target="_blank">
        View Original Article →
      </a>

      {article.references?.length > 0 && (
        <div className="refs">
          <strong>References</strong>
          <ul>
            {article.references.slice(0, 2).map((ref, i) => (
              <li key={i}>
                <a href={ref} target="_blank">External Article {i + 1}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isAI && <span className="badge">AI Updated</span>}
    </div>
  );
}


export default App;
