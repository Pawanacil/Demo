import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_URL;

const fetchMain = async(method, url, body) => {
   try {
    return axios({
        method: method,
        url: url,
        body: body ? body : {}
    })
    
   } catch (error) {
        throw new Error(error)
   };

};
export default fetchMain;