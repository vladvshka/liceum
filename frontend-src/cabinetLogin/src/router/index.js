import Vue from 'vue'
import Router from 'vue-router'

import SignInView from '@/components/SignIn'
import SignUpView from '@/components/SignUp'
import ForgotPasswordView from "@/components/ForgotPassword"
import EmailConfirmView from "@/components/EmailConfirm"

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'SignIn',
      component: SignInView
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUpView
    },
    {
      path: "/forgotPassword",
      name: "ForgotPassword",
      component: ForgotPasswordView
    },
    {
      path: "/emailConfirm",
      name: "EmailConfirm",
      component: EmailConfirmView
    }
  ]
})