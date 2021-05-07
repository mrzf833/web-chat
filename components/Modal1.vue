<template>
    <div class="inline-block">
        <button @click="tambah" type="button" class="px-2 rounded-lg py-3 bg-blue-400 hover:bg-blue-600 text-white">Tambah</button>
        <div class="absolute w-full bg-black h-screen top-0 left-0 bg-opacity-50 duration-200" id="modal-tambah">
            <div class="w-full pt-32 flex justify-center" id="area-modal-tambah">
                <div class="bg-white rounded-lg inline-block">
                <div class="flex justify-end">
                    <div class="mr-1 mt-1"><i class="fas fa-window-close fa-2x text-red-500 close" @click="clickClose"></i></div>
                </div>
                <div class="px-6 py-6">
                    <h1 class="text-xl text-center">Tambah teman</h1>
                    <form @submit.prevent="addTeman">
                        <input class="block my-4 border-gray-400 border rounded-md py-2 px-1" type="text" name="" id="" placeholder="Username" v-model="username">
                        <button class="block my-4 bg-blue-400 p-2 rounded-lg text-white w-full hover:bg-blue-600" type="submit">Submit</button>
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
}
</style>
<script>
import Vue from 'vue'
import { mapActions } from 'vuex'
// Vue.directive('click-outside', {
//     bind: function (el, binding, vnode, old) {
//         el.clickOutsideEvent = function (event) {
//         // here I check that click was outside the el and his children
//         if (!(el == event.target || el.contains(event.target))) {
//             // and if it did, call method provided in attribute value
//             vnode.context[binding.expression](event);
//         }
//         };
//         document.body.addEventListener('click', el.clickOutsideEvent)
//     },
//     unbind: function (el) {
//         document.body.removeEventListener('click', el.clickOutsideEvent)
//     },
//     inserted(el, binding, vnode, old) {
//         if (binding.value === 'aaa') {
//         vnode.elm.parentElement.removeChild(vnode.elm)
//         console.log('masuk');
//         }
//         console.log('tidak');
//     }
// });
export default {
    data() {
        return {
            username: ''
        }
    },
    mounted() {
        var thisVue = this
        let modal_tambah =  document.getElementById('modal')
        let modal_tambah_area =  document.getElementById('area-modal')
        // window.onclick = function(event) {
        //     if (event.target === modal_tambah_area || event.target === modal_tambah) {
        //         thisVue.clickClose()
        //     }
        //     console.log('asddas');
        // }
    },
    methods: {
        ...mapActions('contact',['addFriend']),
        tambah(){
            let modal_tambah =  document.getElementById('modal-tambah')
            modal_tambah.style.opacity = 1
            modal_tambah.style.visibility = 'visible'
        },

        clickClose: function(){
            console.log('click');
            let modal_tambah =  document.getElementById('modal-tambah')
            modal_tambah.style.opacity = 0
            modal_tambah.style.visibility = 'hidden'
        },

        async addTeman(){
            let respon = await this.addFriend(this.username)
            if(respon.status){
                alert('berhasil')
                this.username = ''
            }else{
                alert(respon.message)
            }
        }
    },
}
</script>