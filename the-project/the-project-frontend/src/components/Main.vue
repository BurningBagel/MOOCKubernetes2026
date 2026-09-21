<template>
    <div class="container" >
        <h1 style="font-weight: bold; color: black;">The Project</h1>
        <!-- <img src="/usr/src/app/data/lorem_img.png" height="300px" width="300px" alt="random image from lorem picsum"> -->
        <img v-bind:src="LOREM_PICSUM_FILE_PATH" height="300px" width="300px" alt="random image from lorem picsum">
        <!-- <img src="https://picsum.photos/1200" height="300px" width="300px" alt="random image"> -->
        <form v-on:submit.prevent="addTodo" class="entry_container">
            <input type="text" max-length="140" v-model="inputText" placeholder="Enter a new todo here, max 140 characters" />
            <button type="submit">Send</button> 
        </form>

        <h2 style="font-weight: bold; color: black;">Todos</h2>

        <!-- <div class="todos_container">
            <TodoItem title="Do the dishes" />
            <TodoItem title="Take out the trash" />
            <TodoItem title="Go for a run" />
        </div> -->
        <div v-if="!loading" class="todos_container">
            <TodoItem v-for="todo in todos" :key="todo.ID" :title="todo.title" :complete="todo.complete" />
        </div>
        <div v-else>
            <p>Loading...</p>
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
    width: 500px;
    font-size: large;
    border: 2px solid green;
    border-radius: 5px;
    background-color: #EEEEEE;
    color: black;
    overflow: visible;
}

input::placeholder {
    overflow: visible;
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
import { ref } from 'vue';
import type { TodoDTO } from '../shared/todo.dto.ts';
import TodoItem from './TodoItem.vue';


//const TODO_BACKEND = "http://localhost:3001/"; // FOR TESTING
//const TODO_BACKEND = "http://localhost:8081/";
const TODO_BACKEND = import.meta.env.VITE_TODO_BACKEND;

const LOREM_PICSUM_FILE_PATH = import.meta.env.VITE_LOREM_PICSUM_FILE_PATH;

const todos : TodoDTO[] = [];

const placeholderTodos : TodoDTO[] = [
    {
        'ID': 0,
        'title': "",
        'complete': true
    },
    {
        'ID': 1,
        'title': "",
        "complete": false
    },
    {
        'ID': 2,
        'title': '',
        'complete': true
    }
]

let inputText = ref('');
let loading = ref(false);

async function addTodo(){
    const response = await fetch(TODO_BACKEND,{ 
        method: 'POST',
        body: JSON.stringify({'todo':inputText.value}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok){
        throw new Error('ERROR POSTING TODO: ' + response.statusText)
    }
    getDataFromBackend();
}


async function getDataFromBackend(){
    loading.value = true;
    
    todos.splice(0,todos.length,...placeholderTodos);

    const response = await fetch(TODO_BACKEND)
    if(response.ok){
        let anchor = await response.text();
        todos.length = 0;
        if(anchor != ""){
            const data : TodoDTO[] = JSON.parse(anchor);
            data.forEach((todo) => {
                todos.push(todo);
            });
        }
    }
    loading.value = false;
}

getDataFromBackend();


</script>