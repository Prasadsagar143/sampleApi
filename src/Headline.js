import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: 'f68d0fb3221b49a690b1b411ce030591', 
            pageSize: 5
          }
        });
        setHeadlines(response.data.articles);
      } catch (err) {
        setError('Failed to fetch headlines');
      }
    };

    fetchHeadlines();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Latest Headlines</h2>
      <ul>
        {headlines.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsHeadlines;
