import axios from 'axios';

axios.defaults.baseURL = `https://pixabay.com`;

export async function getImages(value, currentPage, signal) {
  const response = await axios.get('/api/', {
    signal,
    params: {
      q: value,
      key: '35861732-765d2ea3a6aad5336048671b3',
      page: currentPage,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return response.data;
}
