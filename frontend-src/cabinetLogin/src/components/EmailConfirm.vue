<template>
<v-card>
    <v-card-text>
        <h3 class="headline mb-0">Письмо отправлено на адрес: {{ email }}</h3>
    </v-card-text>
    <v-card-actions>
        <v-btn block flat color="primary" href="#/">Назад</v-btn>
        <v-btn block color="primary">Отправить письмо еще раз</v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
	data() {
		return {
			email: ""
		};
	}
};
</script>

<style scoped>
</style>
