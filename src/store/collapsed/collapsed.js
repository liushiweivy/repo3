export default {
        actions:{
                COLLAPSED(context,b){
                        return context.commit('COLLAPSED',b)
                },
        },
        getter:{
                collapsed(state){
                        return state.breadcrumbKeys
                }
        },
        mutations:{
                COLLAPSED(state,b){
                        state.collapsed = b
                },
        },
        state:{
                collapsed:false
        },
}
