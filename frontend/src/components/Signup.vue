<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Sign Up</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="auth.username"
                  id="username"
                  label="Username / Mailadresse"
                  name="login"
                  type="text"
                />
                <v-text-field
                  v-model="auth.pwd"
                  id="pwd"
                  label="Passwort"
                  name="password"
                  type="password"
                />
                <v-text-field
                  v-model="auth.firstname"
                  id="firstname"
                  label="Vorname"
                  name="firstname"
                  type="text"
                />
                <v-text-field
                  v-model="auth.lastname"
                  id="lastname"
                  label="Nachname"
                  name="lastname"
                  type="text"
                />
                <v-radio-group v-model="auth.avatar" row :mandatory="true">
                  <v-radio
                    v-for="avatar in avatars"
                    :key="avatar"
                    :value="avatar"
                  >
                    <template #label>
                      <img :src="backend + '/' + avatar" width="20" />
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text @click="signup" color="primary">Signup</v-btn>
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
      avatars: [
        `avatar01.svg`,
        `avatar02.svg`,
        `avatar03.svg`,
        `avatar04.svg`,
        `avatar05.svg`,
        `avatar06.svg`,
        `avatar07.svg`,
        `avatar08.svg`,
        `avatar09.svg`,
        `avatar10.svg`,
        `avatar11.svg`,
        `avatar12.svg`,
      ],
      auth: {
        username: "",
        pwd: "",
        firstname: "",
        lastname: "",
        avatar: "",
      },
    };
  },
  computed: {
    backend() {
      return `${process.env.VUE_APP_BACKEND}`;
    },
  },
  methods: {
    async signup() {
      try {
        let res = await fetch(`${process.env.VUE_APP_BACKEND}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.auth.username,
            pwd: this.auth.pwd,
            firstname: this.auth.firstname,
            lastname: this.auth.lastname,
            avatar: this.auth.avatar,
          }),
        });
        if (res.status == 409) {
          throw new Error("Username already exists.");
        } else if (!res.ok) {
          throw new Error(`HTTP-Status: ${res.status} - ${res.statusText}`);
        }
        this.$router.push({ name: "login" });
        this.$store.commit("setAlert", {
          msg: "Signup successful",
          color: "success",
        });
      } catch (err) {
        // display snackbar with error message
        this.$store.commit("setAlert", { msg: err.message, color: "error" });
      }
    },
  },
};
</script>
