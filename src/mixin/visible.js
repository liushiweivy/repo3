export let visible = {
        props:{
                visibleModel:{
                        type:Boolean,
                        default(){
                                return false
                        },
                }
        },
        data(){
                return {
                        visible:this.visibleModel,
                        isRefresh:false
                }
        },
        model:{
                prop:'visibleModel',
                event:'revert'
        },
        methods:{
                onClose(){
                        this.visible = false
                }
        },
        watch:{
                'visible'(){
                        if(!this.visible)this.$emit('revert',false)
                },
                'visibleModel'(){
                        this.visible = this.visibleModel
                },
        },
}
