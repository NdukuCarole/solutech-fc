<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>

    <!-- <spinner /> -->

    <app-alert />

    <app-footer />

    <confirmation />
  </v-app>
</template>

<script>
//   import Spinner from "@/plugins/loader/views/Spinner";
import AuthService from "./authService";
//   import AppFooter from "@/components/app-footer";

export default {
  name: "authLayout",
  // components: { AppFooter, Spinner },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (AuthService.check()) {
        console.log('test')
        v.$router.replace({
          name: "mainDashboard",
        });
      }
    });
  },

  computed: {
    auth() {
      return AuthService;
    },
  },


};
</script>

<style scoped></style>
