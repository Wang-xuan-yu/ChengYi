import axios from "axios";
import store from "@/store/index";

//创建axios对象
const Server = axios.create({
   // baseURL:"https://api.it120.cc/small4",
    timeout:3000,
});

//请求请求拦截器和响应拦截器
Server.interceptors.request.use(function(config){

    store.commit("setLoading",true);
    return config;
},function(error){
    return Promise.reject(error);
});


//响应拦截器
Server.interceptors.response.use(function(response){
    //取出相应数据中data的值。
    if(response.status == 200){
        store.commit("setLoading",false);
        return response.data;
    }
    return response;
},function(error){
    return Promise.reject(error);
});

export default Server;