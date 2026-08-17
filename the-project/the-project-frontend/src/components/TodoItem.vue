<template>

    <div class="todo-item">
        {{ title }}
    </div>



</template>

<style lang="css" scoped>
.todo-item {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);   
}


</style>

<script setup lang="ts">
defineProps({
    title: {
        type: String
    }
})


</script>