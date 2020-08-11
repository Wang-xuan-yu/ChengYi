import adminHome from "@/pages/admin/home.vue";
import adminUser from "@/pages/admin/user.vue";

export default [
    {
        path:"/admin/home",
        name: "home",
        component: adminHome,
        meta:{
            title:"管理后台首页"
        },
        children:[
            //用户列表页面
            {
                path:"/admin/user",
                name: "admin_user",
                component: adminUser
            }
        ]
    }
];