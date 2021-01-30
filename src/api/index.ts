import Axios from 'axios';
const { REACT_APP_API } = process.env;

const Api = Axios.create({
    baseURL: REACT_APP_API,
    timeout: 20000
});

export default Api;