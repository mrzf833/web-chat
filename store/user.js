export const state = () => ({
    users: []
})

export const mutations = {
    SET_USER_DATA(state, payload){
        state.users = payload
    },

    ADD_USER_DATA(state, payload){
        state.users.push(payload)
    }
}

export const actions = {
    async getUserData({commit}, payload){
        try{
            let response = await this.$axios.get('/api/all-user')
            commit('SET_USER_DATA', response.data.data)
            // return response;
        }catch(err){
            console.log(err);
        }
    }
}

export const getters = {

}