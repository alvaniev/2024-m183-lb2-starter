<template>
  <v-app>
    <v-app-bar app dark color="primary">
      <div class="d-flex align-center">
        <v-toolbar-title class="headline">
          <span class="font-weight-light text-none">Module 183</span>
        </v-toolbar-title>

        <v-btn text to="/">
          <span class="mr-2 body-1 font-weight-light text-none">Home</span>
        </v-btn>
        <v-btn text to="/forum">
          <span class="mr-2 body-1 font-weight-light text-none">Forum</span>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <div v-if="isAuthenticated">
        <span class="mr-2 body-2 font-weight-light text-none"
          >{{ firstname }} {{ lastname }}</span
        >
        <v-avatar>
          <img :src="avatar" width="25" />
          <!-- <img :src="require('@/assets/' + avatar)" width="25" /> -->
        </v-avatar>
        <v-btn text @click="logout">
          <span class="mr-2 body-1 font-weight-light text-none">Logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-btn text :to="{ name: 'signup' }">
          <span class="mr-2 body-1 font-weight-light text-none">Sign Up</span>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
        <v-btn text :to="{ name: 'login' }">
          <span class="mr-2 body-1 font-weight-light text-none">Login</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </div>
      <v-snackbar
        v-model="alert"
        top
        :color="alertcolor"
        timeout="3000"
      >
        <template #action="{ attrs }">
          <v-btn text v-bind="attrs" @click="alert = false">
            Close
          </v-btn>
        </template>
        {{ alertmsg }}
      </v-snackbar>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.getAuthentificationState;
    },
    alertmsg() {
      return this.$store.getters.getAlertmsg;
    },
    alertcolor() {
      return this.$store.getters.getAlertcolor;
    },
    alert: {
      get() {
        return this.$store.getters.getAlertState;
      },
      set() {
        this.$store.commit("resetAlert");
      },
    },
    avatar() {
      return `${this.$store.getters.getUserAvatar}`;
    },
    firstname() {
      return this.$store.getters.getUserFirstname;
    },
    lastname() {
      return this.$store.getters.getUserLastname;
    },
  },
  methods: {
    logout() {
      this.$store.commit("unsetUser");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
