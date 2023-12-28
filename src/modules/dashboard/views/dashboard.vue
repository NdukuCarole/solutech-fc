<template>
  <v-app class="app-bar">
    <!-- SIDEBAR -->

    <v-navigation-drawer
      app
      class="rounded-drawer"
      v-model="drawer"
      permanent
      dark
    >
      <v-divider></v-divider>

      <v-col align="center" justify="center"
        ><div class="appbar-text mt-0">
          <v-avatar class="mr-8">
            <v-img
              src="/logo2.jpg"
              height="200"
              contain
              class="d-flex flex-row justify-center mt-0"
            />
          </v-avatar>
          <span class="logo-title">BOOKIE</span>
        </div></v-col
      >

      <v-divider class="mt-1"></v-divider>

      <v-list nav class="pa-0 mt-3">
        <v-list-item-group v-model="selectedItem">
          <v-list-item
            class="nav-link"
            v-for="item in navLinks"
            :key="item.title"
            :to="item.to"
            :href="item.href"
            :disabled="item.disabled"
          >
            <v-col>
              <v-list-item-icon class="ml-0">
                <v-icon small>{{ item.icon }}</v-icon> </v-list-item-icon
              ><span class="ml-6">{{ item.title }}</span></v-col
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar height="65" color="#202717" flat v-if="screenSize === 'Large'">
      <v-spacer />
      <div class="nav-text red--text" v-if="isLoggedIn"></div>
      <v-menu v-if="isLoggedIn">
        <template v-slot:activator="{ props }">
          <v-avatar class="mr-8">
            <v-icon color="white" size="x-large" v-bind="props"
              >mdi-account-circle</v-icon
            >
          </v-avatar>
        </template>
        <v-list>
          <v-list-item
            ><v-list-item-title>Profile</v-list-item-title></v-list-item
          >
          <v-list-item
            ><v-list-item-title>Settings</v-list-item-title></v-list-item
          >
          <v-divider />
          <v-list-item @click="logOut()"
            ><v-list-item-title>Log out</v-list-item-title></v-list-item
          >
        </v-list>
      </v-menu>

      <p></p>
    </v-app-bar>

    <v-main :class="screenSize === 'Small' ? 'mt-n1' : 'mt-0 '">
      <!-- Main content -->

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { AuthService } from "@/modules/auth";

export default {
  name: "homePage",

  data: () => ({
    screenSize: "",
    isValid: false,

    drawer: true,
    rail: false,

    rules: {
      required: [(value) => !!value || "Required."],
    },

   
    mini: false,
    selectedItem: 0,

    direction: "top",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    left: true,
    top: false,
    right: true,
    bottom: true,

    transition: "slide-x-reverse-transition",
  }),

  beforeRouteEnter(to, from, next) {
    next(() => {});
  },

  computed: {
    isLoggedIn() {
      return AuthService.check();
    },
    userDetails() {
      return JSON.parse(AuthService.user);
    },
   
    alertMessage() {
      return this.$store.getters["auth/authGetters"]("alert");
    },
    navLinks() {
      return [
        {
          to: "/dashboard",
          icon: "mdi-view-dashboard",
          title: "Users",
          disabled: false,
        },
        {
          to: "/dashboard/books",
          title: "Books",
          icon: "mdi-account",
          disabled: false,
        },
        {
          to: "/dashboard/loans",
          title: "Book Loans",
          icon: "mdi-book",
          disabled: false,
        },
      ];
    },
  },
  mounted() {
    this.checkScreenSize(); // Check screen size initially
    window.addEventListener("resize", this.checkScreenSize);
  },
  methods: {
    selectLink(link) {
      this.selectedLink = link;
    },
    checkScreenSize() {
      const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
      this.screenSize = isSmallScreen ? "Small" : "Large";
    },

    logOut() {
      AuthService.logout();
    },

    changeImage() {
      // this.$refs.uploader.click();

      this.$refs.image.click();
    },
  },

  watch: {},
};
</script>

<style scoped>
@import url("../style.css");
</style>
