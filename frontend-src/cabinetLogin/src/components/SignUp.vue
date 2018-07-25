<template>
<v-card>
		<v-card-media src="http://lyceum.by/img/logo.png" contain height="100px"></v-card-media>
		<v-card-title primary-title>
			<h3 class="headline">Создание нового аккаунта</h3>
		</v-card-title>
		<v-card-text>
			<v-form>
				<v-text-field prepend-icon="person" name="login" label="Логин (e-mail)" v-model="email" :rules="[rules.required, rules.email]">
				</v-text-field>
				<v-text-field prepend-icon="lock" name="password" label="Пароль" type="password" v-model="password" :rules="[rules.required, rules.validatePassword]"></v-text-field>
				<v-text-field prepend-icon="lock" name="password" label="Подтвердите пароль" type="password" v-model="confirmPassword" :rules="[rules.required, rules.validatePassword]"></v-text-field>
			</v-form>
		</v-card-text>
		<v-card-actions>
			<v-btn block flat color="primary" href="#/">
				Уже есть аккаунт?
			</v-btn>
			<v-btn block color="success" :disabled="toggleButton" @click="signUp" :loading="confirmEmailStatus">
				Зарегистрироваться
			</v-btn>
		</v-card-actions>
</v-card>
</template>

<script>
/* eslint no-console: 0 */
// import api from "../services/apiService.js";
export default {
	data: function() {
		return {
			password: "",
			confirmPassword: "",
			email: "",
			isPasswordInvalid: true,
			isEmailInvalid: true,
			confirmEmailStatus: false,
			rules: {
				required: value => !!value || "Заполните поле!",
				email: value => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

					this.isEmailInvalid = !pattern.test(value);

					return pattern.test(value) || "Неверно заполнено поле!";
				},
				validatePassword: () => {
					if (this.password != this.confirmPassword) {
						this.isPasswordInvalid = true;
						return "Введеные пароли не совпадают";
					}
					if (this.password == "" || this.confirmPassword == "") {
						this.isPasswordInvalid = true;
						return false;
					}
					if (this.password == this.confirmPassword) {
						this.isPasswordInvalid = false;
						return true;
					}
				}
			}
		};
	},
	computed: {
		toggleButton: function() {
			if (this.isEmailInvalid || this.isPasswordInvalid) {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		signUp: function() {
			this.confirmEmailStatus = !this.confirmEmailStatus;
			// var sendObj = {
			// 	login: this.email,
			// 	password: this.password
			// };
			// console.log(sendObj);
			// api.signUpUser(sendObj).then(this.onSuccess);
		}
	}
};
</script>
