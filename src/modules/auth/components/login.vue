<template>
  <div>
    <v-container fluid class="full-page-container">
      <v-row justify="center" class="my-auto" >
        <v-col cols="12" md="6" class="mt-8">
          <v-card tile dark class="login-card">
            <v-card-title class="white--text">
      
              <v-img
                src="/logo2.jpg"
                height="200"
                contain
                class="d-flex flex-row justify-center mt-4"
              />
              <v-row align="center" justify="center">
                <v-col class="mt-2 text--white" align="center" justify="center"> Login to account</v-col>
              </v-row>
            </v-card-title>

            <v-card-text class="mt-5">
              <v-form ref="loginForm" v-model="isValid">
                <!--User name-->
                <v-text-field
                  ref="email"
                  label="Email"
                  :rules="rules.required"
                  v-model="formData.email"
                  outlined
                  placeholder="Enter email"
                />

                <!-- Password -->
                <v-text-field
                  ref="password"
                  :rules="rules.required"
                  label="Password"
                  v-model="formData.password"
                  outlined
                  placeholder="Enter Password"
                  :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="mt-n6">
              <v-btn class="text-lowercase text-decoration-underline" text>
                Forgot password?</v-btn
              >
            </v-card-actions>

            <v-card-actions class="mt-n6">
              <v-spacer />
              <v-btn color="primary" class="login-btn" @click="Login()">
                Login
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AuthService from "../../auth/views/authService";
export default {
  name: "loginPage",
  data: () => ({
    showPassword: true,
    isValid: false,

    rules: {
      required: [(value) => !!value || "Required."],
    },
    formData: {
      email: "",
      password: "",
    },
  }),

  methods: {
    Login() {
      if (!this.isValid) {
        this.$refs.loginForm.validate();
      } else {
        this.$store.dispatch("auth/login", this.formData);
      }
    },
  },
  computed: {
    userDetails() {
      return JSON.parse(AuthService.user);
    },

    User() {
      return this.$store.getters["auth/authGetters"]("userD");
    },
    isLoggedIn() {
      return AuthService.check();
    },
    alertStatus() {
      return this.$store.getters["graph/graphGetters"]("alert");
    },
    alertMessage() {
      return this.$store.getters["auth/authGetters"]("alert");
    },
  },
};
</script>

<style scoped>

@import url("../styles.css");
</style>
