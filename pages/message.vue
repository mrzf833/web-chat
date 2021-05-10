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
                    <div class="flex justify-between items-center my-4 cursor-pointer user" :key="contact.id" v-if="contact.status === 'diterima'" @click="clikFriend(contact.id)">
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
        <div class="h-screen bg-green-700 w-2/3">
            <div class="flex flex-col w-full h-full" v-show="Object.keys(profile).length > 0">
                <div class="p-2 flex justify-between bg-green-500 border-l-2">
                <div class="inline-block ml-4 text-white flex">
                    <img src="~/assets/profile.jpg" class="w-12 h-12 object-cover rounded-full" alt="">
                    <div class="ml-3">
                        <h3 class=" text-lg">{{ profile.username }}</h3>
                        <p class="text-sm">{{ profile.terakhir_dilihat }}</p>
                    </div>
                </div>
            </div>
            <div @scroll="scrollTrigger" class="h-full overflow-auto flex flex-col-reverse" id="scroll-chat">
                <div class="w-full p-4">
                    <div class="w-full">
                        <template v-for="(group, index) in groupSortMessage">
                            <div :key="index">
                                <div class="w-full flex justify-center pb-2 messages">
                                    <div class="bg-blue-600 py-1 px-2 text-base rounded-b-lg rounded-tl-lg text-white">
                                        <p class="inline-block">{{ index }}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div v-for="message in group" :key="message.id">
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
                                        <div class="ml-1 bg-green-400 w-2 h-2 rounded-full inline-block" v-if="message.read_at == null"></div>
                                        <div class="ml-1 bg-blue-400 w-2 h-2 rounded-full inline-block" v-if="message.read_at !== null"></div>
                                    </div>
                                </div>
                            </div>
                            <!-- <template v-for="(message, index) in ">
                                <div>
                                    
                                </div>
                            </template> -->
                        </template>
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
        </div>
    </section>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import Modal from '../components/Modal1.vue'
import jwt_decode from "jwt-decode"
export default {
  components: { Modal },
    data() {
        return {
            pesan: null,
            messageActive: null
        }
    },
    computed: {
        ...mapState('message', ['profile','messages', 'groupSortMessage']),
        ...mapGetters('contact', [
            'contacts'
        ]),
    },
    mounted() {
        this.scrollStart()
        this.scrollTrigger()
        this.getContactsDataa()


        let decoded = jwt_decode(this.$auth.strategy.token.get());
        window.Echo.leave(`App.Models.User.${decoded.sub}`)
        window.Echo.connector.pusher.config.auth.headers['Authorization'] = this.$auth.strategy.token.get();
        let oi = window.Echo.private(`App.Models.User.${decoded.sub}`)
            .notification((notification) => {
            // console.log(notification);
            if(notification.contact !== undefined){
                if(notification.contact.status === 'proses' && notification.contact.friend.id !== decoded.sub){
                // ini pengirim pertemanan masuk ke proses
                this.addContactDataProses(notification.contact)
                console.log('tambah teman');
                }else if(notification.contact.status === 'proses' && notification.contact.friend.id === decoded.sub){
                    // ini penerima pertemanan masuk ke konfirmasi
                    this.addContactDataKonfirmasi(notification.contact)
                }else if(notification.contact.status === 'ditolak'){
                    this.konfirmasiContactTolak(notification.contact)
                    
                }else if(notification.contact.status === 'diterima'){
                    this.konfirmasiContactDiterima(notification.contact)
                    console.log('diterima');
                    
                }
            }

            if(notification.message !== undefined){
                let message = notification.message
                console.log(message);
                if(message.status === 'created'){
                    console.log(this.profile.id == message.penerima );
                    if(this.profile.id == message.penerima || (message.penerima == this.$auth.$state.user.id && this.profile.id == message.pengirim)){
                        this.addSetMessageData(message)
                    }
                    if(message.penerima == this.$auth.$state.user.id){
                        this.readMessageData(this.profile.id)
                        console.log('diterima pesannya bro');
                    }
                }else if(message.status === 'updated'){
                    this.UPDATE_MESSAGE_DATA(message)
                    this.sortMessage('timestamp')
                }
            }
        });

        // console.log(oi);
    },
    methods: {
        ...mapActions('contact', ['getContactsData', 'addContactDataProses', 'addContactDataKonfirmasi', 'konfirmasiContactTolak', 'konfirmasiContactDiterima']),
        ...mapMutations(['SET_IS_AUTH']),
        ...mapMutations('contact',['DELETE_CONTACT_DATA_TOLAK']),
        ...mapMutations('message',['sortMessage', 'UPDATE_MESSAGE_DATA']),
        ...mapActions('message', ['getProfileData', 'getMessageData', 'addMessageData', 'addSetMessageData', 'readMessageData']),
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
            // let get_id_old = this.messages.length
            // get_id_old = this.messages[get_id_old - 1].id
            // let new_id = get_id_old + 1
            // this.messages.push({
            //     id: new_id,
            //     message: this.pesan,
            //     time: '21.40',
            //     as: 'pengirim',
            //     status_message: 'diterima'
            // })
            this.addMessageData({
                id: this.profile.id,
                pesan: this.pesan
            })
            console.log('kirim pesan');
        },

        async clikFriend(data){
            // console.log(e.target.closest('div.user'));
            let contactMessage = this.contacts.filter(v => {
                return v.id == data;
            })

            let friend_id = contactMessage.length > 0 ? {status: true, id: contactMessage[0].friend.id} : {status: false}
            if(friend_id.status && this.messageActive !== friend_id.id){
                await this.getProfileData(friend_id.id)
                await this.getMessageData(friend_id.id)
                this.messageActive = friend_id.id
                this.sortMessage('timestamp')
                // console.log(this.groupSortMessage);

            }else{
                console.log('tidak di temukan');
            }
        }
    },
}
</script>