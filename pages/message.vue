<template>
    <section class="fixed h-screen block w-full lg:flex lg:flex-wrap">
        <div class="h-full bg-green-600 lg:w-1/3 flex flex-col lg:block" id="mobile-sidebar">
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
            <div class="p-2 overflow-auto h-full">
                <template v-for="contact in contacts">
                    <div class="flex justify-between items-center my-4 cursor-pointer user" :key="contact.id" v-if="contact.status === 'diterima'" @click="clikFriend(contact.id)">
                        <div class="flex">
                            <img src="~/assets/profile.jpg" class="w-12 h-12 object-cover rounded-full inline-block" alt="">
                            <div class="inline-block ml-4 text-white">
                                <h3 class=" text-lg">{{ contact.friend.name }}</h3>
                                <div>
                                    <template v-if="contact.friend.as_pesan === 'pengirim'">
                                        <div class="ml-1 bg-green-400 w-2 h-2 rounded-full inline-block" v-if="contact.friend.read_at == null"></div>
                                        <div class="ml-1 bg-blue-400 w-2 h-2 rounded-full inline-block" v-if="contact.friend.read_at != null"></div>
                                    </template>
                                    <p class="text-sm inline-block">{{ contact.friend.pesan_terakhir }}</p>
                                </div>
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
        <div class="hidden w-full h-screen bg-green-700 lg:w-2/3 lg:block" id="mobile-message">
            <div class="flex flex-col w-full h-full" v-show="Object.keys(profile).length > 0">
                <div class="p-2 flex justify-between bg-green-500 border-l-2">
                    <div class="inline-block ml-4 text-white flex">
                        <img src="~/assets/profile.jpg" class="w-12 h-12 object-cover rounded-full" alt="">
                        <div class="ml-3">
                            <h3 class=" text-lg">{{ profile.username }}</h3>
                            <p class="text-sm">{{ profile.terakhir_dilihat }}</p>
                        </div>
                    </div>
                    <div class="flex items-center block lg:hidden">
                        <div class="w-8 h-8 rounded-full bg-red-500 text-white text-xl hover:bg-red-600 cursor-pointer" @click="kembaliSidebar">
                            <=
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
                                            <p class="inline-block">{{ checkDate(index) }}</p>
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
                                <button type="submit" class="bg-blue-500 p-2 rounded-lg ml-2 text-white hover:bg-blue-600 disabled:bg-gray-800">submit</button>
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
            messageActive: null,
            triggerScroll: true,
            interval_status: null,
            batasPesan: true,
            clickMessage: true
        }
    },
    computed: {
        ...mapState('message', ['profile','messages', 'groupSortMessage']),
        ...mapGetters('contact', [
            'contacts'
        ]),
    },
    mounted() {
        window.addEventListener('beforeunload', this.handlerClose);
        // this.scrollStart()
        this.scrollTrigger()
        this.getContactsDataa()

        let decoded = jwt_decode(this.$auth.strategy.token.get());
        window.Echo.leave(`App.Models.User.*`)
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
                this.updateMessageContact(message)
                console.log(message);
                if(message.status === 'created'){
                    console.log(this.profile.id == message.penerima );
                    if(this.profile.id == message.penerima || (message.penerima == this.$auth.$state.user.id && this.profile.id == message.pengirim)){
                        this.addSetMessageData(message)
                    }
                    if(message.penerima == this.$auth.$state.user.id && message.pengirim == this.profile.id){
                        this.readMessageData(this.profile.id)
                        console.log('diterima pesannya bro');
                    }
                }else if(message.status === 'updated'){
                    this.UPDATE_MESSAGE_DATA(message)
                    this.sortMessage('timestamp')
                }
            }
        });
        this.interval_status = setInterval(()=> {
            this.updateStatusContact().then((data) => {
                this.UPDATE_STATUS_PROFILE(data.data)
            })
            
        }, 58000)
        
        var thisVue = this
        window.onclick = function(event) {
            let modal_tambah =  document.getElementsByClassName('modal')
            let modal_tambah_area =  document.getElementsByClassName('area-modal')
            modal_tambah.forEach((value, index) => {
                if (event.target === modal_tambah_area[index] || event.target === modal_tambah[index]) {
                    thisVue.clickClose(index)
                }
            });
        }
    },
    methods: {
        ...mapActions('contact', ['getContactsData', 'addContactDataProses',
        'addContactDataKonfirmasi', 'konfirmasiContactTolak', 'konfirmasiContactDiterima',
        'logoutContact', 'updateMessageContact', 'updateStatusContact']),
        ...mapActions(['closeWindow']),
        ...mapMutations(['SET_IS_AUTH']),
        ...mapMutations('contact',['DELETE_CONTACT_DATA_TOLAK', 'UPDATE_STATUS_USER_DIMENU_USER']),
        ...mapMutations('message',['sortMessage', 'UPDATE_MESSAGE_DATA', 'UPDATE_STATUS_PROFILE']),
        ...mapActions('message', ['getProfileData', 'getMessageData', 'addMessageData', 'addSetMessageData', 'readMessageData', 'addScrollSetMessageData', 'logoutMessage']),
        async getContactsDataa(){
            await this.getContactsData()
        },

        scrollTrigger: async function(){
            let height = document.getElementById('scroll-chat')
            let max_height = height.scrollHeight
            let on_scroll = height.scrollTop - height.offsetHeight
            let offset_height = height.offsetHeight
            
            let amount_messages = document.getElementsByClassName('messages')
            amount_messages = amount_messages.length
            if(on_scroll <= (- max_height) && amount_messages >= 10 && this.triggerScroll && this.batasPesan){
                this.triggerScroll = false
                await this.addScrollSetMessageData({
                    id: this.profile.id,
                    skip: this.messages.length
                }).then((data)=> {
                    if(data.length < 1){
                        this.batasPesan = false
                    }
                })
                height.scrollTop = - max_height + offset_height
                this.triggerScroll = true
                // if(){

                // }
                console.log('sudah sampai batas');
            }
            // console.log(height.scrollTop);
            // console.log(max_height);

        },

        scrollStart: function(){
            let height = document.getElementById('scroll-chat')
            height.scrollTop = 472
        },

        logout: async function(){
            try {
                let response = await this.$auth.logout()
                this.SET_IS_AUTH(false)
                this.logoutContact()
                this.logoutMessage()
                clearInterval(this.interval_status)
            } catch (err) {
                console.log(err)
            }
        },

        submit: function(e){
            if(!this.clickMessage || (this.pesan === '' || this.pesan === null)){
                return
            }
            let btn_submit_message = e.target
            btn_submit_message = btn_submit_message.getElementsByTagName('button')[0]
            btn_submit_message.setAttribute('disabled', 'disabled')
            this.clickMessage = false
            this.addMessageData({
                id: this.profile.id,
                pesan: this.pesan
            }).then(() => {
                this.pesan = '',
                this.clickMessage = true,
                btn_submit_message.removeAttribute('disabled')
            })
            console.log('kirim pesan');
        },

        async clikFriend(data){
            // unutuk mobile phone
                let mobile_phone_sidebar = document.getElementById('mobile-sidebar')
                mobile_phone_sidebar.classList.add('hidden')
                let mobile_phone_message = document.getElementById('mobile-message')
                mobile_phone_message.classList.remove('hidden')
            // --------------------------

            let contactMessage = this.contacts.filter(v => {
                return v.id == data;
            })

            let friend_id = contactMessage.length > 0 ? {status: true, id: contactMessage[0].friend.id} : {status: false}
            if(friend_id.status && this.messageActive !== friend_id.id){
                await this.getProfileData(friend_id.id).then((result) => {
                    let payload = result.data
                    this.UPDATE_STATUS_USER_DIMENU_USER({
                        id: payload.id,
                        status: payload.terakhir_dilihat
                    })
                })
                await this.getMessageData(friend_id.id)
                this.messageActive = friend_id.id
                this.sortMessage('timestamp')
                let height = document.getElementById('scroll-chat')
                let max_height = height.scrollHeight
                let on_scroll = height.scrollTop - height.offsetHeight

                if(on_scroll <= (- max_height)){
                    let i = 0
                    for(let check = on_scroll; check <= (- max_height); check){
                        i++
                        let length_data = await this.addScrollSetMessageData({
                            id: this.profile.id,
                            skip: this.messages.length
                        })

                        max_height = height.scrollHeight

                        if(length_data < 1){
                            break;
                        }
                    }
                }

                this.batasPesan = true
            }else{
                console.log('tidak di temukan');
            }
        },

        checkDate(date){
            let today = this.getDateFunction(new Date())
            let yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            yesterday = this.getDateFunction(yesterday)
            if(today === date){
                return 'hari ini'
            }else if(yesterday === date){
                return 'kemarin'
            }else{
                return date
            }
            
            // let today = new Date()
            // console.log(today);
        },

        getDateFunction(date){
            var d = date; 
            let month = d.getMonth()+1; 
            let day = d.getDate(); 
            let output = ((""+day).length<2 ? "0" : "") + day + "/" + ((""+month).length<2 ? '0' : "") + month + "/" + d.getFullYear()
            return output
        },

        clickClose: function(index){
            console.log('click');
            let modal_tambah =  document.getElementsByClassName('modal')[index]
            modal_tambah.style.opacity = 0
            modal_tambah.style.visibility = 'hidden'
        },

        kembaliSidebar: function(){
            // unutuk mobile phone
                let mobile_phone_sidebar = document.getElementById('mobile-sidebar')
                mobile_phone_sidebar.classList.remove('hidden')
                let mobile_phone_message = document.getElementById('mobile-message')
                mobile_phone_message.classList.add('hidden')
            // --------------------------
        },

        handlerClose: function (){
            this.closeWindow()
        }
    },
}
</script>