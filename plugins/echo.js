import Echo from 'laravel-echo'
import Cookie from 'js-cookie'

let token = Cookie.get('token')
window.Pusher = require('pusher-js');
        window.Echo = new Echo({
            authEndpoint : 'http://localhost/htdocs/api-chat/public/broadcasting/auth',
            // auth: {
            //     headers: {
            //         Authorization: 'Bearer ' + token
            //     }
            // },
            broadcaster: 'pusher',
            key: 'b945faec27ad2d64082a',
            cluster: 'ap1',
            forceTLS: true,
        }) 