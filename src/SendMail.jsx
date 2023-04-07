import emailjs from '@emailjs/browser';

export   const sendThisMail = (user, price) => {
    var templateParams = {
        user_name: user.displayName,
        user_email: user.email,
        price: price+'€'
    };
    emailjs.send('service_ebqx6vr', 'template_blgchp8', templateParams, 'p9vHFTrfHp5W4igrO')
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
}