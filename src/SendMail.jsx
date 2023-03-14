import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import firebase from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const SendMail = () => {
    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const sendThisMail = () => {
        var templateParams = {
            user_name: user.displayName,
            user_email: user.email,
            price: '15€'
        };
        emailjs.send('service_ebqx6vr', 'template_blgchp8', templateParams, 'p9vHFTrfHp5W4igrO')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }
    return (
        <button onClick={sendThisMail}> tst send mail</button>
    );
};