<template>
	<v-app>
		<v-container fluid fill-height>
			<v-layout align-center justify-center>
				<v-flex xs12 sm8 md4>
					<v-toolbar color="indigo" dark>
						<v-toolbar-title>Вход в личный кабинет</v-toolbar-title>
						<v-spacer></v-spacer>
					</v-toolbar>

					<v-card>
						<v-slide-x-transition mode="out-in">
							<router-view/>
						</v-slide-x-transition>
					</v-card>

				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script>

export default {
	name: "app",
	data: function() {
		return {};
	}
};
</script>
