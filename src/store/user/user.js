export default {
        actions:{
                SET_USER_NAME(context,val){
                        return context.commit('setUserName',val)
                },
                SET_USER_AVATAR(context,val){
                        return context.commit('setUserAvatar',val)
                }
        },
        getter:{
        },
        mutations:{
                setUserAvatar(state,val){
                        state.avatar = val
                },
                setUserName(state,val){
                        state.name = val
                }
        },
        state:{
                avatar:'',
                name:'',
        },
}
