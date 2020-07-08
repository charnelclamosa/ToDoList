import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
const myPlugins = {
    install(Vue){
        Vue.mixin({
            data: () => ({
                url: process.env.VUE_APP_URL,
            }),
            computed: {
                ...mapState([
                    'todos',
                ]),
                ...mapGetters([
                    'getTodos'
                ])
            },
            methods: {
                ...mapMutations([
                    'ADD_TODO',
                    'TOGGLE_TODO',
                    'DELETE_TODO',
                ]),
                ...mapActions([
                    'addTodo',
                    'toggleTodo',
                    'deleteTodo',
                ]),
            },
        })
    }
}
export default myPlugins
