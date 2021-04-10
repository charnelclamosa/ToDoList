<template>
<div id="main">
    <div class="content">
        <div class="content-head">
            <h2>Todo List</h2>
            <v-text-field v-model="createTask" @keyup.enter="addTask(createTask)" solo-inverted dense label="What do you want to do?"></v-text-field>
        </div>
        <div class="content-body" v-if="Tasks.length > 0">
            <v-list dense rounded color="transparent">
                <v-list-item v-for="task in Tasks" :key="task.id" class="item">
                    <v-list-item-content class="task" @click="toggleCompletion(task.id)">
                        <v-list-item-title>
                            <v-tooltip bottom>
                                <template v-slot:activator="{on, attrs}">
                                    <span class="mr-2" v-bind="attrs" v-on="on">
                                <v-icon :color="task.isComplete ? 'success' : 'deep-orange lighten-1'">{{task.isComplete ? 'mdi-check-circle' : 'mdi-progress-clock'}}</v-icon>
                            </span>
                                </template>
                                <span class="px-2">{{task.isComplete ? 'Completed' : 'Pending'}}</span>
                            </v-tooltip>
                            <span v-bind:class="{ isComplete : task.isComplete }">{{task.task}}</span>
                        </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon @click="deleteTask(task.id)">
                            <v-icon color="error">mdi-delete</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </div>
    </div>
    <div class="circle1"></div>
    <div class="circle2"></div>
</div>
</template>

<script>
export default {
    created() {
        this.Tasks = this.$store.getters.getTasks;
    },
    computed: {
        todo() {
            return this.$store.getters.getTodos;
        },
    },
    data() {
        return {
            createTask: null,
            TaskId: 1,
            Tasks: [],
        }
    },
    methods: {
        addTask(taskName) {
            if (!taskName) return;
            let data = {
                id: this.Tasks.length + 1,
                task: taskName
            }
            this.$store.dispatch('addTodo', data);
            this.createTask = null;
        },
        toggleCompletion(id) {
            this.$store.dispatch('toggleTodo', id)
        },
        deleteTask(id) {
            this.$store.dispatch('deleteTodo', id)
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#main {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

h2 {
    color: #426696;
    font-weight: 600;
    font-size: 3rem;
    font-family: 'Lobster', cursive;
    opacity: 0.8;
    text-align: center;
    margin-bottom: 1rem;
}

.content {
    width: 50%;
    background: linear-gradient(to right top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
    border-radius: 2rem;
    position: relative;
    z-index: 2;
    backdrop-filter: blur(2rem);
}

.content-head {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
}

.content-body {
    padding: 0 2rem;
    margin-bottom: 2rem;
}

.item {
    background-color: whitesmoke;
    padding: 0 2rem;
}
.item:hover {
    -webkit-box-shadow: 0 10px 6px -6px #777;
     -moz-box-shadow: 0 10px 6px -6px #777;
          box-shadow: 0 10px 6px -6px #777;
}

.task:hover {
    cursor: pointer;
}

.completed {
    display: flex;
    justify-content: center;
    align-items: center;
}

.circle1,
.circle2 {
    background: white;
    background: linear-gradient(to right bottom,
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.3));
    height: 20rem;
    width: 20rem;
    position: absolute;
    border-radius: 50%;
}

.circle1 {
    top: 5%;
    right: 15%;
}

.circle2 {
    bottom: 5%;
    left: 10%;
}
@media screen and (max-width: 414px) {
    .circle1, .circle2 {
        height: 12rem;
        width: 12rem;
    }
    .content {
        width: 90%;
    }
    .content-head, .content-body, .item {
        padding: 0 1rem;
    }
}
</style>
