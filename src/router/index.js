import Vue from 'vue'
import Router from 'vue-router'
import flowRouter from './model/flow-router-config'
import projectRouter from './model/project-router-config'
import achievementRouter from './model/achievement-router-config'

import notFound from "../view/public/notFound"

Vue.use (Router)

export default new Router ({
        linkActiveClass:'active',
        routes: [
                {
                        path:'/expenditure',
                        component:notFound
                },
                flowRouter,projectRouter,achievementRouter
        ]
})
