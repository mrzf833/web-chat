<template>
    <div class="bg-green-600 w-full h-screen">
        <div class="flex justify-center items-center w-full h-screen">
            <div class="bg-white px-10 py-14 rounded-lg">
                <h1 class="text-xl mb-14">Selamat datang di aplikasi chat kami</h1>
                <form action="#" @submit.prevent="submit">
                    <input class="mb-4 block border-2 border-gray-400 w-full px-2 py-1 rounded-lg" type="text" name="username" placeholder="Username" v-model="auth.username">
                    <input class="mb-4 block border-2 border-gray-400 w-full px-2 py-1 rounded-lg" type="password" name="password" placeholder="Password" v-model="auth.password">
                    <button class="block bg-blue-400 hover:bg-blue-600 text-white w-full px-2 py-1 rounded-lg" type="submit">LogIn</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
    layout: 'auth',
    auth: false,
    data() {
        return {
            auth:{
                username: null,
                password: null
            }
        }
    },
    computed: {
    ...mapState(['isAuth'])
    },
    mounted() {
        if(this.isAuth){
            this.$router.push('/message')
        }
    },
    methods: {
        ...mapMutations(['SET_IS_AUTH']),
        submit: async function(){
            try {
                let response = await this.$auth.loginWith('local', { data: this.auth })
                console.log(response)
                this.SET_IS_AUTH(true)
                this.$router.push('/message')
            } catch (err) {
                console.log(err)
            }
        }
    },
}
</script>