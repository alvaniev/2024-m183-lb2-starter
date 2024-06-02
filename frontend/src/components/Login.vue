<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  id="username"
                  label="Username / Mailadresse"
                  name="username"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="auth.username"
                />

                <v-text-field
                  id="pwd"
                  label="Passwort"
                  name="pwd"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="auth.pwd"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="login" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>
export default {
  data() {
    return {
      auth: {
        username: "",
        pwd: ""
      }
    };
  },
  computed: {},
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          username: this.auth.username,
          pwd: this.auth.pwd
        })
        .then(() => {
          if (this.isAuthenticated()) {
            this.$router.push({ name: "forum" });
          }
        });
    },
    isAuthenticated() {
      return this.$store.getters.getAuthentificationState;
    }
  }
};
</script>
