<template>
    <div class="container" >
        <h1 style="font-weight: bold; color: black;">The Project</h1>
        <!-- <img src="/usr/src/app/data/lorem_img.png" alt="random image from lorem picsum"> -->
        <img src="https://picsum.photos/1200" height="300px" width="300px" alt="random image">
        <div class="entry_container">
            <input type="text" max-length="140" v-model="inputText" placeholder="Enter a new todo here, max 140 characters" />
            <button @click="$emit('add-todo', inputText); inputText = ''">Send</button>
        </div>

        <h2 style="font-weight: bold; color: black;">Todos</h2>

        <div class="todos_container">
            <TodoItem title="Todo 1" />
            <TodoItem title="Todo 2" />
            <TodoItem title="Todo 3" />
        </div>

    </div>
</template>

<style lang="css" scoped>

TodoItem{
    width: 100%;
    border-radius: 5px;
}

img {
    border-radius: 10%;
    margin-top: 50px;
    margin-bottom: 50px;
    -webkit-box-shadow: 0px 5px 11px 1px #000000; 
    box-shadow: 0px 5px 11px 1px #000000;

}

input {
    margin-right: 10px;
    padding-right: 200px;
    font-size: large;
    border: 2px solid green;
    border-radius: 5px;
    background-color: #EEEEEE;
}

button {
    font-size: large;
    background-color: green;
    border-width: 0;
    border-radius: 5px;
    padding: 10px;
}

input::placeholder {
    overflow:visible;
}

.container {
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: space-around;
    background-color: #EEEEEE;

}

.entry_container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 50px;

}

.todos_container {
    display: flex;
    flex-direction: column;
    width: 80%;
}


</style>

<script setup lang="ts">
import TodoItem from './TodoItem.vue';

let inputText = '';

</script>