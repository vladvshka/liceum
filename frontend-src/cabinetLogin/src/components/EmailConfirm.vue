<template>
<v-card>
    <v-card-text>
        <h3 class="headline mb-0">Письмо отправлено на адрес: {{ email }}</h3>
    </v-card-text>
    <v-card-actions>
        <v-btn block flat color="primary" href="#/">Назад</v-btn>
        <v-btn block @click="sendEmailAgain" :disabled="disableButton" color="primary">Отправить письмо еще раз</v-btn>
    </v-card-actions>
    <v-snackbar v-model="snackbar" right multi-line color="blue darken-4">
        Письмо отправлено еще раз!
        <v-btn flat @click="snackbar = false">
            Закрыть
        </v-btn>
    </v-snackbar>
</v-card>
</template>

<script>
import api from "../services/apiService.js";
export default {
	data() {
		return {
			email: "",
			snackbar: false,
			disableButton: false
		};
	},
	methods: {
		sendEmailAgain() {
			this.disableButton = true;
			api
				.sendEmailAgain()
				.then(this.onSuccess)
				.catch(this.onError);
		},
		onSuccess(response) {
			console.log(response);
			this.disableButton = false;
			this.snackbar = true;
		}
	},
	created() {
		// console.log(this.$cookie);
	},
	beforeRouteEnter(to, from, next) {
		api.checkCookie().then(response => {
			// console.log(response);
			// console.log(response.data);
			next(vm => {
				vm.email = response.data;
			});
		});
	}
};
</script>

<style scoped>
</style>
