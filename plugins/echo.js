import Echo from 'laravel-echo'
import Cookie from 'js-cookie'

let token = Cookie.get('token')
window.Pusher = require('pusher-js');
        window.Echo = new Echo({
            /*
                setting authEndpointnya
                misalanya: http://localhost/api-chat/public/broadcasting/auth
                atau: http://127.0.0.1:8000/broadcasting/auth
                atau: http://api-chat.test/broadcasting/auth
            */
            authEndpoint : 'http://localhost/api-chat/public/broadcasting/auth',
            broadcaster: 'pusher',

            // setting data pusher. pakai petik
            key: 'isikan keynya disini',
            cluster: 'isikan clusternya disini',
            forceTLS: true,
        }) 