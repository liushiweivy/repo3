export default {
        actions:{
                BREADCRUMB_KEYS(context,arr){
                        return context.commit('BREADCRUMB_KEYS',arr)
                },
        },
        getter:{
                _breadcrumbKeys(state){
                        return state.breadcrumbKeys
                }
        },
        mutations:{
                BREADCRUMB_KEYS(state,arr){
                        state.breadcrumbKeys = arr
                        return state.breadcrumbKeys
                },
        },
        state:{
                breadcrumbKeys:['111',222,333]
        },
}
