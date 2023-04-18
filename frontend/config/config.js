import axios from 'axios';
import ENDPOINT from './ENDPOINT';

export default axios.create({ baseURL:ENDPOINT });