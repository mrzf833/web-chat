<template>
    <div class="inline-block">
        <button type="button" class="px-2 rounded-lg py-4 bg-yellow-400 hover:bg-yellow-600 relative" @click="konfirmasi">
            <span class="float-right absolute top-0 right-0 text-sm bg-red-700 text-white h-5 w-5 rounded-full" v-if="contactKonfirmasi.length > 0">{{ contactKonfirmasi.length }}</span>
            Konfirmasi
        </button>
        <div class="absolute w-full bg-black h-screen top-0 left-0 bg-opacity-50 duration-200" id="modal-konfirmasi">
            <div class="w-full pt-32 flex justify-center" id="area-modal-konfirmasi">
                <div class="bg-white rounded-lg inline-block">
                <div class="flex justify-end">
                    <div class="mr-1 mt-1"><i class="fas fa-window-close fa-2x text-red-500 close" @click="clickCloseTambah"></i></div>
                </div>
                <div class="px-6 py-6">
                    <h1 class="text-xl text-center">konfirmasi</h1>
                    <div>
                        <template v-for="contactKonfirmasii in contactKonfirmasi">
                            <div class="flex mt-4 items-center bg-gray-300 p-2 rounded-lg" :key="contactKonfirmasii.id">
                                <img src="~/assets/profile.jpg" class="w-12 h-12 object-cover rounded-full inline-block" alt="">
                                <h3 class="text-xl pr-8 pl-2">{{ contactKonfirmasii.friend.username }}</h3>
                                <div>
                                    <button class="block p-1 text-sm bg-blue-400 text-white rounded-lg" :id-friend="contactKonfirmasii.friend.id" @click="terimaTeman">Terima</button>
                                    <button class="block p-1 text-sm bg-red-400 text-white rounded-lg" :id-friend="contactKonfirmasii.friend.id" @click="tolakTeman">Tolak</button>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<style>
#modal-konfirmasi{
    opacity: 0;
    visibility: hidden;
}
</style>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters('contact', [
            'contactKonfirmasi'
        ]),
    },
    mounted() {
        // var thisVueKonfirmasi = this
        // let modal_konfirmasi =  document.getElementById('modal-konfirmasi')
        // let modal_konfirmasi_area =  document.getElementById('area-modal-konfirmasi')
        // window.onclick = function(event) {
        //     if (event.target === modal_konfirmasi_area || event.target === modal_konfirmasi) {
        //         thisVueKonfirmasi.clickCloseTambah()
        //     }
        // }
        this.getContactsDataKonfirmasii()

    },
    methods: {
        ...mapActions('contact', ['getContactsDataKonfirmasi', 'destroyKonfirmasi']),

        async getContactsDataKonfirmasii(){
            await this.getContactsDataKonfirmasi()
            console.log(this.contactKonfirmasi);
        },

        konfirmasi(){
            let modal_konfirmasi =  document.getElementById('modal-konfirmasi')
            modal_konfirmasi.style.opacity = 1
            modal_konfirmasi.style.visibility = 'visible'
        },

        clickCloseTambah: function(){
            console.log('click');
            let modal_konfirmasi =  document.getElementById('modal-konfirmasi')
            modal_konfirmasi.style.opacity = 0
            modal_konfirmasi.style.visibility = 'hidden'
        },

        async terimaTeman(e){
            let id = e.target.getAttribute('id-friend')
            console.log(id);
            console.log('terima');
            await this.destroyKonfirmasi({
                id: id,
                status: 'diterima'
            })

            alert('berhasil di terima')
        },

        async tolakTeman(e){
            let id = e.target.getAttribute('id-friend')
            console.log(id);
            console.log('tolak');
            await this.destroyKonfirmasi({
                id: id,
                status: 'ditolak'
            })
            alert('berhasil di tolak')
        }
    },
}
</script>