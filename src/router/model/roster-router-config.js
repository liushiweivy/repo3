export default {
        path:'/roster',
        component:resolve=>(require(['@/view/roster/roster'],resolve)),
        // meta:{name:'成果管理'},
        /* children:[
                {
                        path:'/',
                        redirect:'achievementList'
                },
                {
                        path:'achievementList',
                        meta:{name:'项目三'},
                        component:resolve=>(require(['@/view/achievement/achievementList/achievementList'],resolve)),
                        children:[
                                {
                                        path:'/',
                                        redirect:'paperRegister'
                                },
                                {
                                        path:'paperRegister',
                                        meta:{name:'项目三-1'},
                                        component:resolve=>(require(['@/view/achievement/achievementList/paperRegister/paperRegister'],resolve)),
                                }
                        ]
                }
        ] */
}
