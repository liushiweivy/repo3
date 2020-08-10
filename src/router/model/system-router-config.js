export default {
        path:'/system',
        component:resolve=>(require(['@/view/system/system'],resolve)),
        children:[
               {
                        path:'/',
                        redirect:'entryRules'
                },{
                        path:'entryRules',
                        component:resolve=>(require(['@/view/system/entryRules/entryRules'],resolve))
                },{
                        path:'warningLabel',
                        component:resolve=>(require(['@/view/system/warningLabel/warningLabel'],resolve))
                },{
                        path:'typeWork',
                        component:resolve=>(require(['@/view/system/typeWork/typeWork'],resolve))
                },{
                        path:'attendanceRules',
                        component:resolve=>(require(['@/view/system/attendanceRules/attendanceRules'],resolve))
                },{
                        path:'authorAssign',
                        component:resolve=>(require(['@/view/system/authorAssign/authorAssign'],resolve))
                }
        ]
}