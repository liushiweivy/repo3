export default {
        actions:{
                LOADING_STATUS(context,b){
                        return context.commit('LOADING_STATUS',b)
                },
        },
        getters:{
                loadingStatus(state){
                        return state.loadingStatus
                }
        },
        mutations:{
                LOADING_STATUS(state,b){
                        state.loadingStatus = b
                },
        },
        state:{
                loadingStatus:1
        },
}
