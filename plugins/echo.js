import Echo from 'laravel-echo'
import Cookie from 'js-cookie'
// import Process from 'dotenv'

let token = Cookie.get('token')

let authEndpoint = (process.env.BASE_URL || "http://localhost:8084/") + '/broadcasting/auth'
authEndpoint = authEndpoint.replace(/([^:]\/)\/+/g, "$1")
window.Pusher = require('pusher-js');
        window.Echo = new Echo({
            /*  
                setting authEndpointnya api nya
                misalanya: http://localhost/api-chat/public/broadcasting/auth
                atau: http://127.0.0.1:8000/broadcasting/auth
                atau: http://api-chat.test/broadcasting/auth
            */
            authEndpoint : authEndpoint,
            broadcaster: 'pusher',

            // setting data pusher. pakai petik
            key: process.env.PUSHER_KEY || '',
            cluster: process.env.PUSHER_CLUSTER || 'ap1',
            forceTLS: process.env.PUSHER_FORCE_TLS || true,
        })

        console.log(authEndpoint);