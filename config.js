const config = {
    saltRounds: 10,

    mailOptions: {
        from: 'georgiy.rubchinskij.99@mail.ru',
        paasword: 'luxiorylife1',
        emailConfirmSubject: 'BSU lyceum: email verification',
        forgotPasswordSubject: 'BSU lyceum: forgotten password',
        host: 'smtp.mail.ru',
        port: 465,
        auth: {
            user: 'login@yandex.ru',
            pass: 'password'
        },
        secure: true
    }
}

module.exports = config;