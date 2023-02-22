import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({
  baseURL: `${Config.BASE_URL}`,
});

client.interceptors.request.use(async config => {
  try {
    const token = await AsyncStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  } catch (e) {
    return config;
  }
});

class Api {
  constructor(client) {
    this.client = client;
  }

  /** Example */
  login([email, password]) {
    return this.client
      .post('/auth/login', {
        email,
        password,
      })
      .then(response => response.data)
      .catch(e => e.response.data);
  }
}

export default new Api(client);
export {client};
