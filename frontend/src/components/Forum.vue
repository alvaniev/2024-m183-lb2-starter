<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <h1>Forum</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <app-postingform :parentPosting="0" @addPosting="newPosting($event)">
          <template #buttonlabel>
            Neuen Beitrag erstellen
          </template>
          <template #dialogtitle>
            Neuer Beitrag
          </template>
        </app-postingform>
      </v-col>
    </v-row>
    <v-row justify="center" dense>
      <v-col cols="12" v-for="item in subpostingids" :key="item">
        <app-posting :postingid="item"></app-posting>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Posting from "@/components/Posting.vue";
import PostingForm from "@/components/PostingForm.vue";
import newPosting from "@/mixins.js";


export default {
  mixins: [newPosting],
  data() {
    return {
      subpostingids: [],
    };
  },
  async created() {
    this.load();
  },
  methods: {
    async load() {
      try {
        // get all toplevel postings
        const res = await fetch(
          `${process.env.VUE_APP_BACKEND}/postings`
        );
        this.checkHttpStatus(res);
        let result = await res.json();
        this.subpostingids = result.map((result) => result.id);
      } catch (err) {
        // display snackbar with error message
        this.$store.commit("setAlert", { msg: err.message, color: "error" });
      }
    },
    async newPosting(event) {
      await this.addPosting(event);
      await this.load();
    },
  },
  computed: {
    postingId() {
      return null;
    },
    userId() {
      return this.$store.getters.getUserId;
    },
  },
  components: {
    "app-posting": Posting,
    "app-postingform": PostingForm,
  }
};
</script>
