import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import { auth } from '../firebase';
import axios from 'axios';

import { useAuth } from "../contexts/AuthContext";


const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');

    }

    const report = () => {
        return (
            <a href='http://localhost/sms/index.php'></a>
        )
    }

    const getFile = async(url) =>{
        const response = await fetch(url);
        const data = await response.blob(); // blob is any file like images or any other that you want to transfer in form of binary

        return new File([data], 'userPhoto.jpg', {type: 'image/jpeg'});
    }

    useEffect(() => {
        if(!user) {
            history.push('/');

            return;
        }

        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                "project-id" : "699f6eaa-998a-4a1b-92d5-87ced822264a",
                "user-name" : user.email,
                "user-secret" : user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                        { headers: { "private-key" : "40037de3-6dcc-40a7-b487-0d27f3171386"}}
                    
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })

    }, [user, history]);

    if(!user || loading) return 'Loading ...Please wait!';

    return (
        <div className = 'chats-page'>
            <div className = 'nav-bar'>
                <div className = 'logo-tab'>
                    Crime Alert

                </div>
                <div className = "emergency">
                    <button className="btn" ><a href="http://localhost/sms/index.php">Report Crime </a></button>
                </div>

                <div onClick = {handleLogout} className = 'logout-tab'>
                    Logout
                </div>

            </div>

            <ChatEngine 
            height = "calc(100vh - 66px)"
            projectID="699f6eaa-998a-4a1b-92d5-87ced822264a"
            userName={user.email}
            userSecret={user.uid}
            />

            <div className ="footer">
            &#64;Maich; Built by PMKanyora. Stay updated&#10004;

            </div>
        </div>
    );
}

export default Chats;