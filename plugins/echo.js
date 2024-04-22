import Echo from 'laravel-echo'
import Cookie from 'js-cookie'

let token = Cookie.get('token')
window.Pusher = require('pusher-js');
        window.Echo = new Echo({
            /*  
                setting authEndpointnya api nya
                misalanya: http://localhost/api-chat/public/broadcasting/auth
                atau: http://127.0.0.1:8000/broadcasting/auth
                atau: http://api-chat.test/broadcasting/auth
            */
            authEndpoint : 'http://localhost:8084/broadcasting/auth',
            broadcaster: 'pusher',

            // setting data pusher. pakai petik
            key: '20ae867e09501ed4b2a0',
            cluster: 'ap1',
            forceTLS: true,
        }) 