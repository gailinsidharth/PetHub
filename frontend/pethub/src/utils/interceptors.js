import axios  from "axios";


export const axiosInstance = axios.create({
    baseURL:'http://localhost:3005/api'
})


//unauthorised 

axiosInstance.interceptors.response.use(
    
    (response)=>response, 
    
   ( error)=>{


    console.log(error, '==error')
    
    if(error.response.status==400){
        localStorage.clear();
       window.location.href='/signin'
    }

    return Promise.reject(error);

   })


   //attach token

   axiosInstance.interceptors.request.use((request)=>{

    const token = localStorage.getItem('token');
    if(token){
        request.headers.Authorization = token;
    }

    return request;

   },(error)=>error)