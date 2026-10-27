<template>
    <div class="wrapper">
        <div class="todo-item" :class="{'finished':complete, 'notFinished':!complete}">
            {{ title }}
        </div>
        <div class="done-button">
            <button @click="$emit('done-pressed')">Done</button>
        </div>
    </div>

</template>

<style lang="css" scoped>
.wrapper{
    display: flex;
    flex-direction: row;
}

.done-button{
    flex: 1;
}


.todo-item {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
    color: black;
    padding: 10px;
    border-radius: 5px;
    flex: 4;
}

.finished{
    border-left: 4px green solid ;
    text-decoration: dashed;
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
    complete: {
        type: Boolean
    }
})



</script>