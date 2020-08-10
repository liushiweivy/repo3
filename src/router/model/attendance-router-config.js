export default {
        path:'/attendance',
        component:resolve=>(require(['@/view/attendance/attendance'],resolve)),
        // meta:{name:'成果管理'},
        children:[
                {
                        path:'/',
                        redirect:'attendanceList'
                },
                {
                        path:'attendanceList',
                        // meta:{name:'项目三'},
                        component:resolve=>(require(['@/view/attendance/attendanceList/attendanceList'],resolve)),
                        children:[
                                {
                                        path:'/',
                                        redirect:'monthReport'
                                },
                                {
                                        path:'monthReport',
                                        name:'monthReport',
                                        meta:{name:'考勤月报'},
                                        component:resolve=>(require(['@/view/attendance/attendanceList/monthReport/monthReport'],resolve))
                                },
                                {
                                        path:'machineRecords',
                                        name:'machineRecords',
                                        meta:{name:'闸机记录'},
                                        component:resolve=>(require(['@/view/attendance/attendanceList/machineRecords/machineRecords'],resolve))
                                },
                                {
                                        path:'reissueCard',
                                        name:'reissueCard',
                                        meta:{name:'闸机记录'},
                                        component:resolve=>(require(['@/view/attendance/attendanceList/reissueCard/reissueCard'],resolve))
                                },
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
                }
        ]
}
