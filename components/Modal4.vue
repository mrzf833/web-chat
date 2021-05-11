<template>
    <div class="inline-block">
        <button type="button" class="px-2 rounded-lg py-4 bg-green-400 hover:bg-green-600 text-white relative" @click="proses">
            <span class="float-right absolute top-0 right-0 text-sm bg-red-700 text-white h-5 w-5 rounded-full" v-if="contactProsess.length > 0">{{ contactProsess.length }}</span>
            Proses
        </button>
        <div class="absolute w-full bg-black h-screen top-0 left-0 bg-opacity-50 duration-200 modal" id="modal-proses">
            <div class="w-full pt-32 flex justify-center area-modal" id="area-modal-proses">
                <div class="bg-white rounded-lg inline-block">
                <div class="flex justify-end">
                    <div class="mr-1 mt-1"><i class="fas fa-window-close fa-2x text-red-500 close" @click="clickCloseProses"></i></div>
                </div>
                <div class="px-6 py-6">
                    <h1 class="text-xl text-center">Di Proses</h1>
                    <div>
                        <template v-for="contactProses in contactProsess">
                            <div class="flex mt-4 items-center bg-gray-300 p-2 rounded-lg" :key="contactProses.id">
                                <img src="~/assets/profile.jpg" class="w-12 h-12 object-cover rounded-full inline-block" alt="">
                                <h3 class="text-xl pr-8 pl-2">{{ contactProses.friend.username }}</h3>
                                <div>
                                    <button class="block p-1 text-sm bg-green-400 text-white rounded-lg">Proses</button>
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
#modal-proses{
    opacity: 0;
    visibility: hidden;
    z-index: 100;
}
</style>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters('contact', [
            'contactProsess'
        ]),
    },
    mounted() {
        this.getContactsDataProses()
    },
    methods: {
        ...mapActions('contact', ['getContactsDataProses']),

        proses(){
            let modal_proses =  document.getElementById('modal-proses')
            modal_proses.style.opacity = 1
            modal_proses.style.visibility = 'visible'
        },

        clickCloseProses: function(){
            let modal_proses =  document.getElementById('modal-proses')
            modal_proses.style.opacity = 0
            modal_proses.style.visibility = 'hidden'
        },
    },
}
</script>