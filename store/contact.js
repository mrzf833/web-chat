export const state = () => ({
    contacts: [],
    contactKonfirmasi: [],
    contactTolak: [],
    contactProsess: [],
})

export const mutations = {
    SET_CONTACT_DATA(state, payload){
        state.contacts = payload
    },

    SET_CONTACT_DATA_KONFIRMASI(state, payload){
        state.contactKonfirmasi = payload
    },

    SET_CONTACT_DATA_TOLAK(state, payload){
        state.contactTolak = payload
    },

    SET_CONTACT_DATA_PROSES(state, payload){
        state.contactProsess = payload
    },
}

export const actions = {
    async getContactsData({commit}){
        try{
            let response = await this.$axios.get('/api/contact')
            commit('SET_CONTACT_DATA', response.data.data)
        }catch(err){
            console.log(err);
        }
    },

    // untuk konfirmasi
    async getContactsDataKonfirmasi({commit}){
        try{
            let response = await this.$axios.get('/api/contact/konfirmasi')
            commit('SET_CONTACT_DATA_KONFIRMASI', response.data.data)
        }catch(err){
            console.log(err);
        }
    },

    async destroyKonfirmasi({ dispatch, commit }, payload){
        try{
            let response = await this.$axios.patch(`/api/contact/konfirmasi/${payload.id}`, {
                status: payload.status
            })
            dispatch('getContactsData')
            dispatch('getContactsDataKonfirmasi')
        }catch(err){
            console.log(err);
        }
    },

    // untuk tolak
    async getContactsDataTolak({commit}){
        try{
            let response = await this.$axios.get('/api/contact/tolak')
            commit('SET_CONTACT_DATA_TOLAK', response.data.data)
        }catch(err){
            console.log(err);
        }
    },

    // untuk proses
    async getContactsDataProses({commit}){
        try{
            let response = await this.$axios.get('/api/contact/proses')
            commit('SET_CONTACT_DATA_PROSES', response.data.data)
        }catch(err){
            console.log(err);
        }
    },

    // post / store tambah teman

    async addFriend({ dispatch, commit }, payload){
        try{
            let response = await this.$axios.post(`/api/contact`, {
                friend: payload
            })
            dispatch('getContactsDataProses')
            dispatch('getContactsDataTolak')
            return {
                status: true,
            }
        }catch(err){
            console.log(err);
            return {
                status: false,
                message: err.response.data.message
            }
        }
    },
}

export const getters = {
    contacts(state){
        let contacts = state.contacts.map(value => {
            return {
                id: value.id,
                status: value.status,
                friend: {
                    id: value.friend.id,
                    name: value.friend.name,
                    username: value.friend.username,
                    // terakhir_dilihat: value.friend.terakhir_dilihat
                    terakhir_dilihat: '21.50'
                }
            }
        })
        return contacts
    },

    contactKonfirmasi(state){
        let contactKonfirmasi = state.contactKonfirmasi.map(value => {
            return {
                id: value.id,
                status: value.status,
                friend: {
                    id: value.friend.id,
                    name: value.friend.name,
                    username: value.friend.username,
                    // terakhir_dilihat: value.friend.terakhir_dilihat
                    terakhir_dilihat: '21.50'
                }
            }
        })
        return contactKonfirmasi
    },

    contactTolaks(state){
        let contactTolak = state.contactTolak.map(value => {
            return {
                id: value.id,
                status: value.status,
                friend: {
                    id: value.friend.id,
                    name: value.friend.name,
                    username: value.friend.username,
                    // terakhir_dilihat: value.friend.terakhir_dilihat
                    terakhir_dilihat: '21.50'
                }
            }
        })
        return contactTolak
    },

    contactProsess(state){
        let contactProsess = state.contactProsess.map(value => {
            return {
                id: value.id,
                status: value.status,
                friend: {
                    id: value.friend.id,
                    name: value.friend.name,
                    username: value.friend.username,
                    // terakhir_dilihat: value.friend.terakhir_dilihat
                    terakhir_dilihat: '21.50'
                }
            }
        })
        return contactProsess
    }
}