import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist';//的导入vuex持久化插件

//指定本地存储配置
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        cartList:[],//存储购物车的基本信息
        loading: false,
        m_cartList:[],//周考购物车数据

        lativ_history:[],//历史纪录本地存储
        //用户列表本地本地存储
        userList:[],
    },
    mutations:{
        addCart(state,payload){
            //追加信息
            state.cartList = payload;
        },
        setLoading(state,payload){
            state.loading = payload;
        },

        addCart(state,data){
            state.m_cartList = data;
        },
        //添加历史纪录
        addHistory(state,data){
            state.lativ_history = data;
        },
        //设置用户列表的信息
        setUserList(state,user){
            state.userList = user;
        }
    },
    getters:{
        // 计算购物车商品的总数量
        totalNums(state){
            let nums = 0;
            state.cartList.forEach(item=>{
                nums += item.nums;
            })

            return nums;
        }
    },
    actions:{
        
    },
    plugins: [vuexLocal.plugin]
});