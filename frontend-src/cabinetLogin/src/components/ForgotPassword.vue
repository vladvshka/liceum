<template>
<div>
    <v-card>
        <v-card-title primary-title>
            <h3 v-if="sendEmail" class="headline mb-0">Забыли пароль?</h3>
            <h3 v-else class="headline mb-0">Письмо отправлено на адрес: {{ emailConfirm }}</h3>
        </v-card-title>
        <div v-if="sendEmail">
            <v-card-text>
                <v-form>
                    <v-text-field prepend-icon="person" name="emailConfirm" label="Ваш e-mail адрес" type="text" v-model="emailConfirm" hint="Мы пришлем вам ссылку для смены пароля." :rules="[rules.required, rules.email]"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn flat color="primary" href="#/">
                    Уже есть аккаунт?
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn :disabled="isEmailInvalid" @click="sendEmail = !sendEmail" color="primary">Сбросить пароль</v-btn>
            </v-card-actions>
        </div>
        <v-card-actions v-else>
            <v-btn flat color="primary" href="#/">
                Назад
            </v-btn>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
export default {
	data() {
		return {
			isEmailInvalid: true,
			emailConfirm: "",
			sendEmail: true,
			rules: {
				required: value => !!value || "Заполните поле!",
				email: value => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					this.isEmailInvalid = !pattern.test(value);
					return pattern.test(value) || "Неверно заполнено поле!";
				}
			}
		};
	}
};
</script>

<style scoped>
</style>
