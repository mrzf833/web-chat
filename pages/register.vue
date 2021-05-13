<template>
    <div class="bg-green-600 w-full h-screen">
        <div class="flex justify-center items-center w-full h-screen">
            <div class="bg-white px-10 py-14 rounded-lg">
                <h1 class="text-xl mb-3">Selamat datang di aplikasi chat kami</h1>
                <h1 class="text-2xl mb-3 text-center">Register</h1>
                <div class="flex justify-center mb-7">
                    <a href="/login" class="text-blue-600 hover:text-blue-800 underline mx-2">Login</a>
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
export default {
    auth: false,
    data() {
        return {
            auth: {
                username: '',
                password: ''
            },
            clickSubmit: true
        }
    },

    methods: {
        async submit(e){
            if(this.auth.username == null || this.auth.username === '' || this.auth.password == null || this.auth.password === ''){
                return
            }
            if(!this.clickSubmit){
                return
            }
            this.clickSubmit = false
            let btnSubmit = e.target
            btnSubmit = btnSubmit.getElementsByTagName('button')[0]
            btnSubmit.setAttribute('disabled', 'disabled')
            try{
                let response = await this.$axios.post('/api/register', this.auth)
                this.auth.username = ''
                this.auth.password = ''
                alert('user berhasil di buat')
            }catch(err){
                alert('terjadi kesalahan silahkan coba lagi')
                console.log(err.response.data);
            }
            btnSubmit.removeAttribute('disabled')
            this.clickSubmit = true
        }
    },
}
</script>