export default function ({ $axios, store }){
    $axios.setHeader('Accept', 'application/json')
    $axios.setHeader('Content-Type', 'application/json')
    $axios.setHeader(store.api_token, 'Bearer')
}