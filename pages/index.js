import React, { useState, useEffect } from 'react'

// Data
import { getNews } from './api/news'

const Index = () => {
  const [news, setNews] = useState([]);

  const fetchData = async () => {
    try {
      const postsData = await getNews();
      setNews(postsData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="row">
        {news.map((newsItem) => (
          <div className="col-md-4 col-sm-12 mb-3" key={newsItem.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{newsItem.title}</h5>
                <p className="card-text">{newsItem.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Index;
