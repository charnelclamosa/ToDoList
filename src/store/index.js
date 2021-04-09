import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        todos: [],
    },
    mutations: {
        ADD_TODO: (state, payload) => {
            const newTask = {
                id: payload.id,
                task: payload.task,
                isComplete: false
            };
            state.todos.push(newTask)
        },

        TOGGLE_TODO: (state, payload) => {
            const item = state.todos.find(todo => todo.id === payload);
            item.isComplete = !item.isComplete
        },

        DELETE_TODO: (state, payload) => {
            const index = state.todos.findIndex(todo => todo.id === payload);
            state.todos.splice(index, 1);
        }
    },
    actions: {
        addTodo: (context, payload) => {
            context.commit('ADD_TODO', payload)
        },
        toggleTodo: (context, payload) => {
            context.commit('TOGGLE_TODO', payload);
        },
        deleteTodo: (context, payload) => {
            context.commit('DELETE_TODO', payload);
        }
    },
    getters: {
        getTasks: state => state.todos
    },
    plugins: [
        createPersistedState()
    ]
})