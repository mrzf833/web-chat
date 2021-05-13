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

    DELETE_CONTACT_DATA_TOLAK_BY_ID_USER(state, payload){
        let filterData = state.contactTolak.filter(v => v.friend.id === payload);
        filterData.forEach(f => state.contactTolak.splice(state.contactTolak.findIndex(v => v.friend.id === f.friend.id),1));
    },

    DELETE_CONTACT_DATA_KONFIRMASI(state, payload){
        let filterData = state.contactKonfirmasi.filter(v => v.id === payload);
        filterData.forEach(f => state.contactKonfirmasi.splice(state.contactKonfirmasi.findIndex(v => v.id === f.id),1));
    },

    UPDATE_MESSAGE_TERAKHIR_DIMENU_USER(state, payload){
        let filterData = state.contacts.filter(v => v.friend.id == payload.penerima);
        filterData.forEach(f => {
            state.contacts[state.contacts.findIndex(v => v.friend.id == f.friend.id)].friend.as_pesan = payload.as_pesan
            state.contacts[state.contacts.findIndex(v => v.friend.id == f.friend.id)].friend.read_at = payload.read_at
            return state.contacts[state.contacts.findIndex(v => v.friend.id == f.friend.id)].friend.pesan_terakhir = payload.pesan_terakhir
        });

        filterData = state.contacts.filter(v => v.friend.id == payload.pengirim);
        filterData.forEach(f => {
            state.contacts[state.contacts.findIndex(v => v.friend.id == f.friend.id)].friend.as_pesan = payload.as_pesan
            state.contacts[state.contacts.findIndex(v => v.friend.id == f.friend.id)].friend.read_at = payload.read_at
            return state.contacts[state.contacts.findIndex(v => v.friend.id == f.friend.id)].friend.pesan_terakhir = payload.pesan_terakhir
        });

        // console.log(state.contacts);
    },

    UPDATE_STATUS_USER_DIMENU_USER(state, payload){
        let filterData = state.contacts.filter(v => v.friend.id == payload.id);
        filterData.forEach(f => {
            return state.contacts[state.contacts.findIndex(v => v.friend.id == f.friend.id)].friend.terakhir_dilihat = payload.status
        });
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
            // console.log('ini konfirmasi bawah');
            // console.log(payload);
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
        // console.log('berhasil');
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
        // console.log('berapa kali ini');
        commit('DELETE_CONTACT_DATA_KONFIRMASI', newDataPengirim.id)
        commit('DELETE_CONTACT_DATA_TOLAK_BY_ID_USER', newDataPengirim.friend.id)
        commit('DELETE_CONTACT_DATA_PROSES', newDataPengirim.id)
    },

    logoutContact({commit}){
        commit('SET_CONTACT_DATA', [])
        commit('SET_CONTACT_DATA_KONFIRMASI', [])
        commit('SET_CONTACT_DATA_TOLAK', [])
        commit('SET_CONTACT_DATA_PROSES', [])
    },

    updateMessageContact({commit, state}, payload){
        let vm = this
        // let dataChange = {
        //     id: payload.id,
        //     message: payload.pesan,
        //     timestamp: payload.timestamp,
        //     created_at: payload.created_at,
        //     read_at: payload.read_at,
        //     time: payload.time,
        //     as: vm.$auth.$state.user.id === payload.pengirim ? 'pengirim' : 'penerima'
        // }
        let dataChange = {
            pengirim: payload.pengirim,
            penerima: payload.penerima,
            pesan_terakhir: payload.pesan,
            read_at: payload.read_at,
            as_pesan: vm.$auth.$state.user.id === payload.pengirim ? 'pengirim' : 'penerima',
        }
        // console.log('jalan kah ' + dataChange['penerima']);
        commit('UPDATE_MESSAGE_TERAKHIR_DIMENU_USER', dataChange)
    },

    async updateStatusContact({commit}){
        try{
            let response = await this.$axios.get(`/api/check/online`)
            if(response.data.length > 0){
                response.data.forEach(f => {
                    commit('UPDATE_STATUS_USER_DIMENU_USER', f)
                });
            }
            return response
        }catch(err){
            console.log(err);
        }

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
                    terakhir_dilihat: value.friend.terakhir_dilihat,
                    pesan_terakhir: value.friend.pesan_terakhir,
                    as_pesan: value.friend.as_pesan,
                    read_at: value.friend.read_at
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