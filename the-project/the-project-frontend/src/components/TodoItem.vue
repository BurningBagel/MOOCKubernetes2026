<template>

    <div class="todo-item" :class="{'finished':complete, 'notFinished':!complete}">
        {{ title }}
    </div>



</template>

<style lang="css" scoped>
.todo-item {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
    color: black;
    padding: 10px;
    border-radius: 5px;
}

.finished{
    border-left: 4px green solid ;
}

.notFinished{
    border-left: 4px red solid;

}


</style>

<script setup lang="ts">
defineProps({
    title: {
        type: String
    },
    content: {
        type: String
    },
    complete: {
        type: Boolean
    }
})



</script>