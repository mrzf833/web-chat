<template>
    <div class="bg-green-600 w-full h-screen">
        <div class="flex justify-center items-center w-full h-screen">
            <div class="bg-white px-10 py-14 rounded-lg">
                <h1 class="text-xl mb-3">Selamat datang di aplikasi chat kami</h1>
                <h1 class="text-2xl mb-3 text-center">Login</h1>
                <div class="flex justify-center mb-7">
                    <a href="/register" class="text-blue-600 hover:text-blue-800 underline mx-2">Register</a>
                    <a href="/user" class="text-blue-600 hover:text-blue-800 underline mx-2">Daftar User</a>
                </div>
                <form action="#" @submit.prevent="submit">
                    <input class="mb-4 block border-2 border-gray-400 w-full px-2 py-1 rounded-lg" type="text" name="username" placeholder="Username" v-model="auth.username">
                    <input class="mb-4 block border-2 border-gray-400 w-full px-2 py-1 rounded-lg" type="password" name="password" placeholder="Password" v-model="auth.password">
                    <button class="block bg-blue-400 hover:bg-blue-600 text-white w-full px-2 py-1 rounded-lg disabled:bg-gray-800" type="submit">LogIn</button>
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
            },
            clickLogin: true
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
        submit: async function(e){
            if((this.auth.username === '' || this.auth.username == null) || (this.auth.password === '' || this.auth.password == null)){
                return
            }
            if(!this.clickLogin){
                return
            }
            this.clickLogin = false
            let clickLogin = e.target
            clickLogin = clickLogin.getElementsByTagName('button')[0]
            clickLogin.setAttribute('disabled', 'disabled')
            try {
                let response = await this.$auth.loginWith('local', { data: this.auth })
                // console.log(response)
                this.SET_IS_AUTH(true)
                this.$router.push('/message')
                clickLogin.removeAttribute('disabled')
                this.clickLogin = true
            } catch (err) {
                if(err.response.status == 401){
                    alert('silahkan memasukan data user dengan benar')
                }else{
                    alert('maaf terjadi kesalahan, silahkan coba lagi')
                }
                // console.log(err)
                clickLogin.removeAttribute('disabled')
                this.clickLogin = true
            }
        }
    },
}
</script>