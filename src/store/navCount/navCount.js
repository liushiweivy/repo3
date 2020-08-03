export default {
        actions:{
                SET_WAIT_COUNT(context,val){
                        return context.commit('setWaitCount',val)
                },
                SET_COPY_COUNT(context,val){
                        return context.commit('setCopyCount',val)
                }
        },
        getter:{
        },
        mutations:{
                setWaitCount(state,val){
                        state.waitCount = val
                },
                setCopyCount(state,val){
                        state.copyCount = val
                }
        },
        state:{
                waitCount:0,
                copyCount:0,
        },
}
