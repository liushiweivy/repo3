import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import breadcrumbKeys from "./breadcrumbKeys/breadcrumbKeys"
import collapsed from "./collapsed/collapsed"
import navCount from './navCount/navCount'
import user from './user/user'
import loadingStatus from "./loadingStatus/loadingStatus"
const store = new Vuex.Store({
        modules:{
                breadcrumbKeys,
                collapsed,
                navCount,
                user,
                loadingStatus
        }
})

export default store
