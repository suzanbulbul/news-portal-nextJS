import React, { useState, useEffect } from 'react'

//Data
import { getNews, deleteNewsItem, updateNewsItem, createNewsItem } from './api/news'

const AdminPanel = () => {
  const [news, setNews] = useState([]);
  const [editingCard, setEditingCard] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect (() =>{
    fecthData()
  }, [])

  const fecthData = async ()  => {
    try {
      const postsData = await getNews();
      setNews(postsData);
    }
    catch(error){
      console.log(error);
    }
  }

  const handleDeleteNewsItem = (postId) => {
    try{
      deleteNewsItem(postId);
      const updateNews = news.filter((newsItem) => newsItem.id !== postId);
      setNews(updateNews)
    }
    catch(error){
      console.log(error);
    }
  }

  const handleEditingCard = (newsItemID) => {
    setEditingCard(newsItemID)
  }
  
  const handleSaveCard = async(newsItemID) => {
    try{
      await updateNewsItem(newsItemID, editTitle, editDesc);
      const updateNews = news.map((newsItem) => {
        if (newsItem.id === newsItemID) {
          newsItem.title = editTitle ? editTitle : newsItem.title;
          newsItem.body = editDesc ? editDesc : newsItem.body;
        }
        return newsItem;
      });
      setNews(updateNews);
      setEditingCard(null);
    }
    catch(error){
      console.log(error);
    }
  }

  const handleNewCard = async() => {
    try{
      const newCard = await createNewsItem( newTitle, newDesc);
      setNews([newCard, ...news]);
      setShowTooltip(false);
      setNewTitle('');
      setNewDesc('');
      setShowTooltip(true);
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <span
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          data-bs-target="#exampleModal"
          title={`${
            showTooltip ? "You can add extra cards by paying money!" : ""
          }`}
        >
          <button
            type="button"
            class={`btn btn-${showTooltip ? "secondary" : "primary"}`}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            disabled={showTooltip}
          >
            {showTooltip ? "UPGRADE" : "ADD NEW CARD"}
          </button>
        </span>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <input
                type="string"
                className="form-control mb-2"
                value={newTitle}
                placeholder="Add Title"
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <input
                type="string"
                className="form-control mb-2"
                value={newDesc}
                placeholder="Add Description"
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                className="btn btn-success me-2 w-100"
                onClick={() => handleNewCard()}
                disabled={!newTitle || !newDesc}
                data-bs-dismiss={"modal"}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {news.map((newsItem) => (
          <div className="col-md-4 col-sm-12 mb-3" key={newsItem.id}>
            {editingCard === newsItem.id ? (
              <div className="card h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <input
                      type="string"
                      className="form-control mb-2"
                      value={editTitle}
                      placeholder={newsItem.title}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                      type="string"
                      className="form-control mb-2"
                      value={editDesc}
                      placeholder={newsItem.body}
                      onChange={(e) => setEditDesc(e.target.value)}
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-success me-2 w-100"
                      onClick={() =>
                        handleSaveCard(
                          newsItem.userId !== 1 ? newsItem.userId : newsItem.id
                        )
                      }
                    >
                      SAVE
                    </button>
                    <button
                      className="btn btn-secondary me-2 w-100"
                      onClick={() => setEditingCard(null)}
                    >
                      TAKE IT BACK
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title mb-2">{newsItem.title}</h5>
                    <p className="card-text mb-3">{newsItem.body}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className="btn btn-warning me-2 w-100"
                      onClick={() => handleEditingCard(newsItem.id)}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-danger ms-2 w-100"
                      onClick={() => handleDeleteNewsItem(newsItem.id)}
                    >
                      DELETE CARD
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminPanel;