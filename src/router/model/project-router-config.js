export default {
        path:'/project',
        component:resolve=>(require(['@/view/project/project'],resolve)),
        meta:{name:'模块一'},
        children:[
                {
                        path: '/',
                        redirect:'application'
                },
                {
                        path:'application',
                        meta:{name:'项目一'},
                        component: resolve=>(require(['@/view/project/application/application'],resolve))
                }
        ],
}
