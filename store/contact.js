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

    ADD_CONTACT_DATA(state, payload){
        state.contacts.push(payload)
    },

    ADD_CONTACT_DATA_PROSES(state, payload){
        state.contactProsess.push(payload)
    },

    ADD_CONTACT_DATA_KONFIRMASI(state, payload){
        state.contactKonfirmasi.push(payload)
    },

    ADD_CONTACT_DATA_TOLAK(state, payload){
        state.contactTolak.push(payload)
    },

    DELETE_CONTACT_DATA_PROSES(state, payload){
        let filterData = state.contactProsess.filter(v => v.id === payload);
        filterData.forEach(f => state.contactProsess.splice(state.contactProsess.findIndex(v => v.id === f.id),1));
    },

    DELETE_CONTACT_DATA_TOLAK(state, payload){
        let filterData = state.contactTolak.filter(v => v.id === payload);
        filterData.forEach(f => state.contactTolak.splice(state.contactTolak.findIndex(v => v.id === f.id),1));
    },

    DELETE_CONTACT_DATA_KONFIRMASI(state, payload){
        let filterData = state.contactKonfirmasi.filter(v => v.id === payload);
        filterData.forEach(f => state.contactKonfirmasi.splice(state.contactKonfirmasi.findIndex(v => v.id === f.id),1));
    }
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

    addContactDataKonfirmasi({commit}, payload){
        let newData = {
            id: payload.id,
            friend: payload.me,
            status: payload.status,
            created_at: payload.created_at,
            updated_at: payload.updated_at
        };
        commit('ADD_CONTACT_DATA_KONFIRMASI', newData)
    },

    async destroyKonfirmasi({ dispatch, commit }, payload){
        try{
            let response = await this.$axios.patch(`/api/contact/konfirmasi/${payload.id}`, {
                status: payload.status
            })
            // dispatch('getContactsData')
            // dispatch('getContactsDataKonfirmasi')
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
            // console.log(response.data.data);
        }catch(err){
            console.log(err);
        }
    },

    addContactDataProses({commit}, payload){
        let newData = {
            id: payload.id,
            friend: payload.friend,
            status: payload.status,
            created_at: payload.created_at,
            updated_at: payload.updated_at
        };
        commit('DELETE_CONTACT_DATA_PROSES', payload.id)
        commit('ADD_CONTACT_DATA_PROSES', newData)
        commit('DELETE_CONTACT_DATA_TOLAK', payload.id)
        console.log('berhasil');
    },

    // post / store tambah teman

    async addFriend({ dispatch, commit }, payload){
        try{
            let response = await this.$axios.post(`/api/contact`, {
                friend: payload
            })
            // dispatch('getContactsDataProses')
            // dispatch('getContactsDataTolak')
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

    konfirmasiContactTolak({commit}, payload){
        let newData = {
            id: payload.id,
            friend: payload.friend,
            status: payload.status,
            created_at: payload.created_at,
            updated_at: payload.updated_at
        };
        if(this.$auth.$state.user.id !== newData.friend.id){
            commit('ADD_CONTACT_DATA_TOLAK', newData)
        }
        commit('DELETE_CONTACT_DATA_KONFIRMASI', newData.id)
    },

    konfirmasiContactDiterima({commit}, payload){
        let newDataPengirim = {
            id: payload.id,
            friend: payload.me,
            status: payload.status,
            created_at: payload.created_at,
            updated_at: payload.updated_at
        };

        let newDataPenerima = {
            id: payload.id,
            friend: payload.friend,
            status: payload.status,
            created_at: payload.created_at,
            updated_at: payload.updated_at
        };
        if(newDataPengirim.friend.id !== this.$auth.$state.user.id){
            commit('ADD_CONTACT_DATA', newDataPengirim)
        }else{
            commit('ADD_CONTACT_DATA', newDataPenerima)
        }
        commit('DELETE_CONTACT_DATA_KONFIRMASI', newDataPengirim.id)
        commit('DELETE_CONTACT_DATA_TOLAK', newDataPengirim.id)
        commit('DELETE_CONTACT_DATA_PROSES', newDataPengirim.id)
    }
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