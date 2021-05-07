<template>
    <section class="flex flex-wrap w-full">
        <div class="flex flex-col h-screen bg-green-600 w-1/3">
            <!-- ini adalah bagian atas atau profile  -->
            <div class="p-2 flex justify-between bg-green-500">
                <img src="~/assets/profile.jpg" class="w-12 h-12 object-cover rounded-full" alt="">
                <div>
                    <Modal1/>
                    <Modal2/>
                    <Modal3/>
                    <Modal4/>
                </div>
                <button @click="logout" class="bg-yellow-300 p-3 rounded text-gray-800 hover:bg-yellow-400" type="button">Keluar</button>
            </div>
            <hr>
            <div class="p-2 overflow-y-scroll h-full">
                <template v-for="contact in contacts">
                    <div class="flex justify-between items-center my-4" :key="contact.id" v-if="contact.status === 'diterima'">
                        <div class="flex">
                            <img src="~/assets/profile.jpg" class="w-12 h-12 object-cover rounded-full inline-block" alt="">
                            <div class="inline-block ml-4 text-white">
                                <h3 class=" text-lg">{{ contact.friend.name }}</h3>
                                <p class="text-sm">Boleh bro</p>
                            </div>
                        </div>
                        <div class="flex">
                            <div class="text-white text-sm">
                                {{ contact.friend.terakhir_dilihat }}
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="h-screen bg-green-700 w-2/3 flex flex-col">
            <div class="p-2 flex justify-between bg-green-500 border-l-2">
                <div class="inline-block ml-4 text-white flex">
                    <img src="~/assets/profile.jpg" class="w-12 h-12 object-cover rounded-full" alt="">
                    <div class="ml-3">
                        <h3 class=" text-lg">Zulfa</h3>
                        <p class="text-sm">21.30</p>
                    </div>
                </div>
            </div>
            <div @scroll="scrollTrigger" class="h-full overflow-y-scroll" id="scroll-chat">
                <div class="h-full w-full p-4 flex items-end">
                    <div class="w-full">
                        <div v-for="message in messages" :key="message.id">
                            <div class="w-full flex justify-start pb-2 messages" v-if="message.as === 'penerima'">
                                <div class="bg-gray-600 py-1 px-2 text-base rounded-b-lg rounded-tl-lg text-white">
                                    <p class="inline-block">{{ message.message }}</p>
                                    <span class="text-xs ml-2 inline-block">{{ message.time }}</span>
                                </div>
                            </div>
                        
                            <div class="w-full flex justify-end pb-2 messages" v-if="message.as === 'pengirim'">
                                <div class="bg-green-800 py-1 px-2 text-base rounded-b-lg rounded-tl-lg text-white">
                                    <p class="inline-block">{{ message.message }}</p>
                                    <span class="text-xs ml-2 inline-block">{{ message.time }}</span>
                                    <div class="ml-1 bg-green-400 w-2 h-2 rounded-full inline-block" v-if="message.status_message === 'terkirim'"></div>
                                    <div class="ml-1 bg-blue-400 w-2 h-2 rounded-full inline-block" v-if="message.status_message === 'diterima'"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex bg-green-500 bottom-0 w-full">
                <div class="w-full">
                    <form action="#" class="py-2 px-3 w-full flex" @submit.prevent="submit">
                        <textarea name="" id="" rows="2" class="w-full p-2 rounded-lg text-sm" placeholder="ketik pesan" v-model="pesan"></textarea>
                        <div class="flex items-center justify-center">
                            <button type="submit" class="bg-blue-500 p-2 rounded-lg ml-2 text-white hover:bg-blue-600">submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Modal from '../components/Modal1.vue'
export default {
  components: { Modal },
    data() {
        return {
            pesan: null,
            messages: [
                {
                    id: 1,
                    message: 'p',
                    time: '21.30',
                    as: 'pengirim',
                    status_message: 'diterima'
                },
                {
                    id: 2,
                    message: 'Lagi apa bro',
                    time: '21.31',
                    as: 'penerima',
                    status_message: null
                },
                {
                    id: 3,
                    message: 'Lagi puasa bro',
                    time: '21.40',
                    as: 'pengirim',
                    status_message: 'diterima'
                },
                {
                    id: 4,
                    message: 'Lagi puasa bro',
                    time: '21.40',
                    as: 'pengirim',
                    status_message: 'diterima'
                },
                {
                    id: 5,
                    message: 'Lagi puasa bro',
                    time: '21.40',
                    as: 'pengirim',
                    status_message: 'diterima'
                },
                {
                    id: 6,
                    message: 'Lagi puasa bro',
                    time: '21.40',
                    as: 'pengirim',
                    status_message: 'diterima'
                },
                {
                    id: 7,
                    message: 'Lagi puasa bro',
                    time: '21.40',
                    as: 'pengirim',
                    status_message: 'diterima'
                },
                {
                    id: 8,
                    message: 'Lagi puasa bro',
                    time: '21.40',
                    as: 'pengirim',
                    status_message: 'diterima'
                },
                {
                    id: 9,
                    message: 'Lagi puasa bro',
                    time: '21.40',
                    as: 'pengirim',
                    status_message: 'diterima'
                },
                {
                    id: 10,
                    message: 'Lagi puasa bro',
                    time: '21.40',
                    as: 'pengirim',
                    status_message: 'diterima'
                },
            ]
        }
    },
    computed: {
        ...mapGetters('contact', [
            'contacts'
        ]),
    },
    mounted() {
        this.scrollStart()
        this.scrollTrigger()
        this.getContactsDataa()
    },
    methods: {
        ...mapActions('contact', ['getContactsData']),
        ...mapMutations(['SET_IS_AUTH']),
        async getContactsDataa(){
            await this.getContactsData()
        },

        scrollTrigger: function(){
            let height = document.getElementById('scroll-chat')
            let max_height = height.scrollHeight
            let on_scroll = height.offsetHeight + height.scrollTop
            
            let amount_messages = document.getElementsByClassName('messages')
            amount_messages = amount_messages.length
            if(on_scroll <= 0 && amount_messages >= 10){
                console.log(amount_messages);
                console.log('sudah sampai batas');
            }
        },

        scrollStart: function(){
            let height = document.getElementById('scroll-chat')
            height.scrollTop = height.scrollHeight
        },

        logout: async function(){
            try {
                let response = await this.$auth.logout()
                this.SET_IS_AUTH(false)
            } catch (err) {
                console.log(err)
            }
        },

        submit: function(){
            let get_id_old = this.messages.length
            get_id_old = this.messages[get_id_old - 1].id
            let new_id = get_id_old + 1
            this.messages.push({
                id: new_id,
                message: this.pesan,
                time: '21.40',
                as: 'pengirim',
                status_message: 'diterima'
            })
        }
    },
}
</script>