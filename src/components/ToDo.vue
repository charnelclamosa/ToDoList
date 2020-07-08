<template>
<v-container class="fill-height">
    <v-row justify="center">
        <v-card width="500" class="mx-5" elevation="12">
            <v-card width="480" class="mx-auto mt-n3">
                <v-img :src="require('../assets/3622156.jpg')" height="100">
                    <h1 class="white--text text-center mt-7">
                        To-do List
                    </h1>
                </v-img>
            </v-card>
            <v-text-field v-model="NewTask" @keyup.enter="addTodo()" solo-inverted dense class="mx-5 mt-5" label="What do you want to do?"></v-text-field>

            <v-list class="mx-5 mb-2">
                <v-list-item v-for="task in tasks" :key="task.id">
                    <v-list-item-content class="default" @click="toggleTodo(task.id)">
                        <v-list-item-title v-bind:class="{ isComplete: task.isComplete }"> {{ task.task }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn icon @click="deleteTodo(task.id)">
                            <v-icon color="red">mdi-close-circle</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list>

        </v-card>
    </v-row>
</v-container>
</template>

<script>
export default {
    created() {
        this.tasks = this.$store.state.todos
    },
    computed: {
        todo() {
            return this.$store.getters.getTodos;
        },
    },
    data() {
        return {
            NewTask: null,
            NewID: 0,
            tasks: [],
        }
    },
    methods: {
        addTodo() {
            let task = this.NewTask
            if (task != null) {
                let data = {
                    id: this.NewID++,
                    task: this.NewTask
                }
                // this.task.id = data.id
                this.$store.dispatch('addTodo', data);
                this.NewTask = null
                // this.tasks.push(data)
                // console.log(data.id)
            } else {
                // console.log('Wew')
            }
        },
        toggleTodo(id) {
            // console.log(id)
            this.$store.dispatch('toggleTodo', id)
        },
        deleteTodo(id) {
            // console.log(id)
            this.$store.dispatch('deleteTodo', id)
        }
    }
}
</script>

<style scoped>
.header {
    margin-top: -10rem;
}

.default:hover {
    cursor: pointer;
}

.isComplete {
    text-decoration: line-through;
    color: green;
    cursor: pointer;
}

.isComplete::before {
    content: "\2714";
}
</style>
