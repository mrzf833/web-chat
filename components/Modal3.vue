<template>
    <div class="inline-block">
        <button type="button" class="px-2 rounded-lg py-4 bg-red-400 hover:bg-red-600 text-white relative" @click="tolak">
            <span class="float-right absolute top-0 right-0 text-sm bg-red-700 text-white h-5 w-5 rounded-full" v-if="contactTolaks.length > 0">{{ contactTolaks.length }}</span>
            Tolak
        </button>
        <div class="absolute w-full bg-black h-screen top-0 left-0 bg-opacity-50 duration-200 modal" id="modal-tolak">
            <div class="w-full pt-32 flex justify-center area-modal" id="area-modal-tolak">
                <div class="bg-white rounded-lg inline-block">
                <div class="flex justify-end">
                    <div class="mr-1 mt-1"><i class="fas fa-window-close fa-2x text-red-500 close" @click="clickCloseTolak"></i></div>
                </div>
                <div class="px-6 py-6">
                    <h1 class="text-xl text-center">Di Tolak</h1>
                    <div>
                        <template v-for="contactTolak in contactTolaks">
                            <div class="flex mt-4 items-center bg-gray-300 p-2 rounded-lg" :key="contactTolak.id">
                                <img src="~/assets/profile.jpg" class="w-12 h-12 object-cover rounded-full inline-block" alt="">
                                <h3 class="text-xl pr-8 pl-2">{{ contactTolak.friend.username }}</h3>
                                <div>
                                    <button class="block p-1 text-sm bg-red-400 text-white rounded-lg">Tolak</button>
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
#modal-tolak{
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
            'contactTolaks'
        ]),
    },
    mounted() {
        this.getContactsDataTolak()
    },
    methods: {
        ...mapActions('contact', ['getContactsDataTolak']),

        tolak(){
            let modal_tolak =  document.getElementById('modal-tolak')
            modal_tolak.style.opacity = 1
            modal_tolak.style.visibility = 'visible'
        },

        clickCloseTolak: function(){
            console.log('click');
            let modal_tolak =  document.getElementById('modal-tolak')
            modal_tolak.style.opacity = 0
            modal_tolak.style.visibility = 'hidden'
        },
    },
}
</script>