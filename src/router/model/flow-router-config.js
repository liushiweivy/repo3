export default {
        path: '/flow',
        component: resolve=>(require(['@/view/flow/flow'],resolve)),
        meta:{
                name:'流程管理'
        },
        children:[
                {
                        path:'/',
                        redirect:'flow1'
                },
                {
                        path: 'flow1',
                        name: 'flow1',
                        component: resolve=>(require(['@/view/flow/flow1/flow1'],resolve)),
                        meta:{
                                name:'发起审批'
                        }
                },{
                        path: 'flow2',
                        name: 'flow2',
                        component: resolve=>(require(['@/view/flow/flow2/flow2'],resolve)),
                        meta:{
                                name:'待我审批的'
                        }
                },{
                        path: 'flow3',
                        name: 'flow3',
                        component: resolve=>(require(['@/view/flow/flow3/flow3'],resolve)),
                        meta:{
                                name:'我已审批的'
                        }
                },{
                        path: 'flow4',
                        name: 'flow4',
                        component: resolve=>(require(['@/view/flow/flow4/flow4'],resolve)),
                        meta:{
                                name:'我发起的'
                        }
                },{
                        path: 'flow5',
                        name: 'flow5',
                        component: resolve=>(require(['@/view/flow/flow5/flow5'],resolve)),
                        meta:{
                                name:'抄送我的'
                        }
                },
        ]
}
