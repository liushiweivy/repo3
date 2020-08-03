<template>
<a-config-provider :autoInsertSpaceInButton="false">
  <a-button :disabled="isDisabled" type="link" class="btn" @click="$emit('click')"><slot></slot></a-button>
</a-config-provider>
        
</template>

<script>
        export default {
                name: "rou-btn",
                props:{
                        isDisabled:{
                                type:Boolean,
                                default(){
                                        return false
                                }
                        }
                }
        }
</script>

<style scoped>

</style>
