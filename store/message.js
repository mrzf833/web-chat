export const state = () => ({
    profile: {},
    messages: [],
    groupSortMessage: {}
})

export const mutations = {
    SET_PROFILE_DATA(state, payload){
        console.log(payload);
        state.profile = payload
    },

    SET_MESSAGE_DATA(state, payload){
        state.messages = payload
    },

    ADD_MESSAGE_DATA(state, payload){
        state.messages.push(payload)
    },

    MERGE_MESSAGE_DATA(state, payload){
        let merge = state.messages.concat(payload)
        state.messages = merge
    },

    sortMessage(state, sortKey) {
        let messages = state.messages;
        // urutkan terlebih dahulu semua data
        messages.sort((a, b) => {
            let compare = 0;
            if (a[sortKey] > b[sortKey]) {
                compare = 1;
            } else if (b[sortKey] > a[sortKey]) {
                compare = -1;
            }
            return compare;
        });

        // groupkan
        let keyGroup = 'created_at'
        messages = messages.reduce(function (r, a) {
            r[a[keyGroup].split(' ')[0]] = r[a[keyGroup].split(' ')[0]] || [];
            r[a[keyGroup].split(' ')[0]].push(a);
            return r;
        }, Object.create(null));

    // console.log(result);
    

        // urutkan kembali groupnya

        // messages.sort(function(date1, date2) {
        //     return (
        //         function(){
        //             let s = date1[sortKey]
        //             var b = s.split(/\D/);
        //             return new Date(b[2], b[1]-1, b[2], b[3], b[4]);  
        //         }
        //         -
        //         function(){
        //             let s = date2[sortKey]
        //             var b = s.split(/\D/);
        //             return new Date(b[2], b[1]-1, b[2], b[3], b[4]); 
        //         }
        //     )
        // });
        state.groupSortMessage = messages;
    },

    UPDATE_MESSAGE_DATA(state, payload){
        console.log(payload);
        let filterData = state.messages.filter(v => v.id === payload.id);
        filterData.forEach(f => {
            return state.messages[state.messages.findIndex(v => v.id === f.id)].read_at = payload.read_at
            // return state.messages.findIndex(v => v.id === f.id).read_at = payload.read_at
        });
        console.log(state.messages);
    },

    UPDATE_STATUS_PROFILE(state, payload){
        let filterData = payload.filter(v => v.id == state.profile.id);
        if(filterData.length > 0){
            state.profile.terakhir_dilihat = filterData[0].status
        }
        console.log(filterData);
    }
}

export const actions = {
    async getProfileData({commit}, payload){
        let response = await this.$axios.get(`/api/message/user/${payload}`)
        commit('SET_PROFILE_DATA', response.data)
        return response
    },

    async getMessageData({commit}, payload){
        let response = await this.$axios.get(`/api/message/${payload}`)
        console.log(response.data.data);
        let vm = this
        let dataChange = response.data.data.map(value => {
            return {
                id: value.id,
                message: value.pesan,
                timestamp: value.timestamp,
                created_at: value.created_at,
                read_at: value.read_at,
                time: value.time,
                as: vm.$auth.$state.user.id === value.pengirim ? 'pengirim' : 'penerima'
            }
        })
        commit('SET_MESSAGE_DATA', dataChange)
        commit('sortMessage', 'timestamp')
    },

    async addMessageData({commit}, payload){
        try{
            await this.$axios.post(`/api/message/${payload.id}`,{
                pesan: payload.pesan
            })
        }catch(err){
            console.log(err);
        }
    },

    async addSetMessageData({commit}, payload){
        let vm = this
        let dataChange = {
            id: payload.id,
            message: payload.pesan,
            timestamp: payload.timestamp,
            created_at: payload.created_at,
            read_at: payload.read_at,
            time: payload.time,
            as: vm.$auth.$state.user.id === payload.pengirim ? 'pengirim' : 'penerima'
        }
        commit('ADD_MESSAGE_DATA', dataChange)
        commit('sortMessage', 'timestamp')
    },

    async addScrollSetMessageData({commit}, payload){
        let response = await this.$axios.get(`/api/message/${payload.id}?skip=${payload.skip}`)
        let vm = this
        let dataChange = response.data.data.map(value => {
            return {
                id: value.id,
                message: value.pesan,
                timestamp: value.timestamp,
                created_at: value.created_at,
                read_at: value.read_at,
                time: value.time,
                as: vm.$auth.$state.user.id === value.pengirim ? 'pengirim' : 'penerima'
            }
        })
        commit('MERGE_MESSAGE_DATA', dataChange)
        commit('sortMessage', 'timestamp')
        return response.data.data

        return response.data.data.length
    },

    async readMessageData({commit}, payload){
        await this.$axios.get(`/api/message/read-message/${payload}`)
    },

    logoutMessage({commit}){
        commit('SET_PROFILE_DATA', {})
        commit('SET_MESSAGE_DATA', [])
        commit('sortMessage', 'timestamp')
    },
}

export const getters = {
    messages(state){
        let messages = state.messages.sort(c)
        return state.messages
    },
}