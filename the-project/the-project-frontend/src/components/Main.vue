<template>
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
        <h1>The Project</h1>
        <!-- <img src="/usr/src/app/data/lorem_img.png" alt="random image from lorem picsum"> -->
        <img src="https://picsum.photos/1200" alt="random image">
        <div class="entry">
            <input type="text" max-length="140" v-model="inputText" placeholder="Enter a new todo here, up to 140 characters" />
            <button @click="$emit('add-todo', inputText); inputText = ''">Send</button>
        </div>

        <h2>Todos</h2>

        <div class="todos">
            <TodoItem title="Todo 1" />
            <TodoItem title="Todo 2" />
            <TodoItem title="Todo 3" />
        </div>

    </div>
</template>

<style lang="css" scoped>
.entry {
    display: flex;
    flex-direction: row;
}

.todos {
    display: flex;
    flex-direction: column;
}


</style>

<script setup lang="ts">
import TodoItem from './TodoItem.vue';

let inputText = '';

</script>