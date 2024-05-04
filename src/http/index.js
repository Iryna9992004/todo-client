import axios from 'axios';

export const API_URL='https://quiet-escarpment-67035-0c4acc4ec02e.herokuapp.com/api'

const $api=axios.create({
    withCredentials:true,
    baseURL:API_URL
})

$api.interceptors.request.use((config)=>{
    config.headers.Authorization=`Bearer ${sessionStorage.getItem('token')}`
    return config;
});

$api.interceptors.response.use((config)=>{
    return config;
},async(error)=>{
   console.log(error)
})

export default $api;