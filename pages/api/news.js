import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const getNews = async () => {
  try {
    const response = await apiClient.get('/posts');
    const filterData = response.data.slice(0, 10);
    return filterData;
  } catch (error) {
    throw error;
  }
};

const deleteNewsItem = async (postId) => {
  try {
    const response = await apiClient.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateNewsItem = async (postId, newTitle, newBody) => {
  try {
    const response = await apiClient.put(`/posts/${postId}`, {
      title: newTitle,
      body: newBody,
    });

    if (response.status === 200) {
      return response.data; // Başarılı yanıtı geri döndürün (isteğe bağlı)
    } else {
      throw new Error('UPDATE ERROR');
    }
  } catch (error) {
    throw new Error('ERROR ' + error.message);
  }
};

const createNewsItem = async (newTitle, newBody) => {
  try {
    const response = await apiClient.post('/posts', {
      title: newTitle,
      body: newBody,
    });

    if (response.status === 201) {
      return response.data; // Başarılı yanıtı geri döndürün (isteğe bağlı)
    } else {
      throw new Error('CREATE ERROR');
    }
  } catch (error) {
    throw new Error('ERROR ' + error.message);
  }
}

export { getNews, deleteNewsItem, updateNewsItem, createNewsItem };
