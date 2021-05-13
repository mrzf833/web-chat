<template>
    <div class="inline-block">
        <button @click="tambah" type="button" class="px-2 rounded-lg py-3 bg-blue-400 hover:bg-blue-600 text-white">Tambah</button>
        <div class="absolute w-full bg-black h-screen top-0 left-0 bg-opacity-50 duration-200 modal" id="modal-tambah">
            <div class="w-full pt-32 flex justify-center area-modal" id="area-modal-tambah">
                <div class="bg-white rounded-lg inline-block">
                <div class="flex justify-end">
                    <div class="mr-1 mt-1"><i class="fas fa-window-close fa-2x text-red-500 close" @click="clickClose"></i></div>
                </div>
                <div class="px-6 py-6">
                    <h1 class="text-xl text-center">Tambah teman</h1>
                    <form @submit.prevent="addTeman">
                        <input class="block my-4 border-gray-400 border rounded-md py-2 px-1" type="text" name="" id="" placeholder="Username" v-model="username">
                        <button class="block my-4 bg-blue-400 p-2 rounded-lg text-white w-full hover:bg-blue-600 disabled:bg-gray-800" type="submit" id="submit-teman">Submit</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<style>
#modal-tambah{
    opacity: 0;
    visibility: hidden;
    z-index: 100;
}
</style>
<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            username: '',
            clickTambah: true
        }
    },
    mounted() {
        
    },
    methods: {
        ...mapActions('contact',['addFriend']),
        tambah(){
            let modal_tambah =  document.getElementById('modal-tambah')
            modal_tambah.style.opacity = 1
            modal_tambah.style.visibility = 'visible'
        },

        clickClose: function(){
            // console.log('click');
            let modal_tambah =  document.getElementById('modal-tambah')
            modal_tambah.style.opacity = 0
            modal_tambah.style.visibility = 'hidden'
        },

        async addTeman(){
            if(!this.clickTambah){
                return
            }
            this.clickTambah = false
            let btn_submit_teman = document.getElementById('submit-teman')
            btn_submit_teman.setAttribute('disabled', 'disabled')
            let respon = await this.addFriend(this.username)
            if(respon.status){
                alert('berhasil')
                this.username = ''
                this.clickTambah = true
                btn_submit_teman.removeAttribute('disabled')
            }else{
                this.clickTambah = true
                btn_submit_teman.removeAttribute('disabled')
                alert(respon.message)
            }
        }
    },
}
</script>