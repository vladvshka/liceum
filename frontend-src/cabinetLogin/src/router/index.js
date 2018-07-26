import Vue from 'vue'
import Router from 'vue-router'

import SignInView from '@/components/SignIn'
import SignUpView from '@/components/SignUp'
import ForgotPasswordView from "@/components/ForgotPassword"
import EmailConfirm from "@/components/EmailConfirm"

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'SignIn',
      component: SignInView
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUpView
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
      component: ForgotPasswordView
    },
    {
      path: "/email-sign-up-confirm",
      name: "EmailSignUpConfirm",
      component: EmailConfirm
    },
    {
      path: "/email-forgot-password-confirm",
      name: "EmailForgotPasswordConfirm",
      component: EmailConfirm
    }
  ]
})