const config = {
    saltRounds: 10,

    cookieSecret: "BSUlyceumCookie",

    createTransportOptions: {
        //host: 'mxs.mail.ru',
        service: 'Mail.Ru',
        auth: {
            user: 'georgiy.rubchinskij.99@mail.ru',
            pass: 'luxiorylife1'
        },
        // port: 587,
        secure: false, // true for 465, false for other ports
        tls: {
            rejectUnauthorized: false
        }
    },

    mailOptions: {
        from: '"BSU lyceum" <lyceum@example.com>', // sender address
        subjectForgottenPwd: 'Забыли пароль',
        subjectConfirmEmail: 'Подтверждение почты'
    }
}

module.exports = config;