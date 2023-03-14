import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import firebase from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const SendMail = () => {
  const form = useRef();

const sendThisMail = () => {

}
const auth = firebase.auth();

const [user] = useAuthState(auth);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ebqx6vr', 'template_blgchp8', form.current, 'p9vHFTrfHp5W4igrO')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <>
    <button onClick={sendThisMail}> tst send mail</button>
    <form ref={form} onSubmit={sendEmail} type="hidden">
      <input type="hidden" defaultValue={user.displayName} name="user_name" />
      <input type="hidden" defaultValue={user.email} name="user_email" />
      <input type="submit" value="Send" />
    </form>
    </>
  );
};