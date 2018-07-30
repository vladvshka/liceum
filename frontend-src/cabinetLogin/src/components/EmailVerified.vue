<template>
<v-card>
    <v-card-text class="py-5">
        <span class="headline mr-4">Электронный адрес подтвержден: {{ email }}</span>
    </v-card-text>
    <v-card-actions>
        <v-btn href="#/" block color="success">
            Войти в личный кабинет
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import api from "@/services/apiService.js";
export default {
	data() {
		return {
			email: ""
		};
	},
	beforeRouteEnter(to, from, next) {
		api
			.checkCookie()
			.then(response => {
				next(vm => {
					vm.email = response.data;
				});
			})
			.catch(() => {
				next(vm => {
					vm.$router.push("/");
				});
			});
	}
};
</script>

<style scoped>
</style>
