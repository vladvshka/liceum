<template>
<v-card>
		<loading-indicator :loading="emailConfirmStatus"></loading-indicator>
        <v-card-title primary-title>
            <h3 class="headline mb-0">Забыли пароль?</h3>
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field prepend-icon="person" name="emailConfirm" label="Ваш e-mail адрес" type="text" v-model="emailConfirm" hint="Мы пришлем вам ссылку для смены пароля." :rules="[rules.required, rules.email]"></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn block flat color="primary" href="#/">
                Уже есть аккаунт?
            </v-btn>
            <v-btn block :disabled="isEmailInvalid" @click="forgotPassword" color="success">Сбросить пароль</v-btn>
        </v-card-actions>
</v-card>
</template>

<script>
import api from "@/services/apiService";
export default {
	data() {
		return {
			isEmailInvalid: true,
			emailConfirm: "",
			emailConfirmStatus: false,
			rules: {
				required: value => !!value || "Заполните поле!",
				email: value => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					this.isEmailInvalid = !pattern.test(value);
					return pattern.test(value) || "Неверно заполнено поле!";
				}
			}
		};
	},
	methods: {
		forgotPassword() {
			this.emailConfirmStatus = true;
			var email = this.emailConfirm;
			var data = {
				email
			};
			api
				.forgotPassword(data)
				.then(this.onSuccess)
				.catch(this.onError);
		},
		onSuccess(response) {
			this.$router.push({
				name: "EmailForgotPasswordConfirm",
				params: { email: response.data }
			});
		},
		onError() {
			console.log("error");
		}
	}
};
</script>

<style scoped>
</style>
