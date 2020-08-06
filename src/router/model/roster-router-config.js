export default {
        path:'/roster',
        component:resolve=>(require(['@/view/roster/roster'],resolve)),
        // meta:{name:'成果管理'},
        children:[
                {
                        path:'/',
                        redirect:'team'
                },
                {
                        path:'team',
                        // meta:{name:'项目三'},
                        component:resolve=>(require(['@/view/roster/team/team'],resolve)),
                        children:[
                                {
                                        path:'/',
                                        redirect:'subcontract'
                                },
                                {
                                        path:'subcontract',
                                        name:'subcontract',
                                        meta:{name:'班组列表'},
                                        component:resolve=>(require(['@/view/roster/team/subcontract/subcontract'],resolve))
                                }
                        ]
                        /* children:[
                                {
                                        path:'/',
                                        redirect:'paperRegister'
                                },
                                {
                                        path:'paperRegister',
                                        meta:{name:'项目三-1'},
                                        component:resolve=>(require(['@/view/achievement/achievementList/paperRegister/paperRegister'],resolve)),
                                }
                        ] */
                },{
                        path:'worker',
                        component:resolve=>(require(['@/view/roster/worker/worker'],resolve))
                },{
                        path:'registWorker',
                        component:resolve=>(require(['@/view/roster/registWorker/registWorker'],resolve))
                }
        ]
}
