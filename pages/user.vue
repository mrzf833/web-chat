<template>
    <div class="bg-green-600 min-h-screen">
        <div class="w-full p-5">
            <div class="bg-white p-2 rounded-lg">
                <h1 class="text-center text-2xl">Daftar User</h1>
                <div class="flex justify-center my-5">
                    <a href="/login" class="py-3 px-2 bg-blue-600 mx-3 text-white rounded-lg hover:bg-blue-800">Login</a>
                    <a href="/message" class="py-3 px-2 bg-yellow-600  text-white rounded-lg hover:bg-yellow-800">Message</a>
                </div>
                <div class=" flex justify-center my-5">
                    <div class="max-w-md w-full">
                        <table class="table-auto w-full">
                            <thead class="border-gray-500">
                                <th class="border border-gray-500">Username</th>
                            </thead>
                            <tbody class="border-gray-500">
                                <tr v-for="(item, index) in users" :key="index">
                                    <td class="border border-gray-800 px-4 py-2 font-medium">
                                        <img src="~/assets/profile.jpg" class="w-12 h-12 object-cover rounded-full inline-block" alt="">
                                        <p class="inline-block ml-2">{{ item.username }}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations, mapActions, mapState} from 'vuex'
export default {
    auth: false,
    mounted() {
        this.getUserData()

        window.Echo.leave(`global-notif-user`)
        window.Echo.connector.pusher.config.auth.headers['Authorization'] = this.$auth.strategy.token.get();
        window.Echo.channel('global-notif-user')
        .listen('SendGlobalUserNotification', (e) => {
            this.ADD_USER_DATA(e.user)
        })
    },
    computed: {
        ...mapState('user', ['users'])
    },
    methods: {
        ...mapActions('user', ['getUserData']),
        ...mapMutations('user', ['ADD_USER_DATA'])
    },
}
</script>