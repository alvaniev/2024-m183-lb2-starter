<template>
  <v-card class="elevation-0 my-3">
    <v-row>
      <v-col cols="2" sm="1">
        <v-card-text>
          <v-avatar>
            <img :src="posterAvatar" />
          </v-avatar>
        </v-card-text>
      </v-col>
      <v-col cols="10" sm="11">
        <v-card-title>{{ posterFirstname }} {{ posterLastname }}</v-card-title>
        <v-card-subtitle>Geposted am: {{ postingTimestamp }}</v-card-subtitle>
        <div class="d-flex">
          <v-card-actions>
            <v-btn @click="upvote" icon>
              <v-icon medium>mdi-thumb-up-outline</v-icon>
            </v-btn>
            <v-card-text>{{ upvotes }}</v-card-text>
          </v-card-actions>
          <v-card-actions>
            <v-btn @click="downvote" icon>
              <v-icon medium>mdi-thumb-down-outline</v-icon>
            </v-btn>
            <v-card-text>{{ downvotes }}</v-card-text>
          </v-card-actions>
        </div>
        <!-- <v-card-text v-html="postingContent"></v-card-text> -->
        <v-card-text>{{ postingContent }}</v-card-text>
        <v-card-actions>
          <app-postingform @addPosting="addPosting($event)">
            <!-- <app-postingform> -->
            <template #buttonlabel>Kommentieren</template>
            <template #dialogtitle>Neuer Kommentar</template>
          </app-postingform>
        </v-card-actions>
        <v-col v-for="item in subpostingids" :key="item">
          <app-posting :postingid="item"></app-posting>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import PostingForm from "@/components/PostingForm.vue";
import Posting from "@/components/Posting.vue";
import newPosting from "@/mixins.js";

export default {
  mixins: [newPosting],
  data() {
    return {
      posting: {},
      subpostingids: [],
    };
  },
  name: "app-posting",
  props: {
    postingid: Number,
  },
  async created() {
    this.loadData();
  },
  computed: {
    posterFirstname() {
      return this.posting.firstname;
    },
    posterLastname() {
      return this.posting.lastname;
    },
    posterAvatar() {
      return `${this.posting.avatar}`;
    },
    postingContent() {
      return this.posting.content;
    },
    postingTimestamp() {
      return this.posting.timestamp;
    },
    postingId() {
      return this.posting.id;
    },
    upvotes() {
      return this.posting.upvotes;
    },
    downvotes() {
      return this.posting.downvotes;
    },
    userId() {
      return this.$store.getters.getUserId;
    },
  },
  methods: {
    async upvote() {
      await this.vote(true);
    },
    async downvote() {
      await this.vote(false);
    },
    async vote(isUpvote) {
      await fetch(`${process.env.VUE_APP_BACKEND}/users/${this.userId}/votes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postingId: this.postingId,
          isupvote: isUpvote,
        }),
      });
      await this.loadData();
    },

    async loadData() {
      try {
        // data of this posting
        const res1 = await fetch(
          `${process.env.VUE_APP_BACKEND}/postings/${this.postingid}`
        );
        this.checkHttpStatus(res1);
        let result = await res1.json();
        this.posting = result;

        // get id-list of subpostings
        const res2 = await fetch(
          `${process.env.VUE_APP_BACKEND}/postings/${this.postingid}/postings`
        );
        this.checkHttpStatus(res2);
        result = await res2.json();
        this.subpostingids = result.map((result) => result.id);
        for (let i = 0; i < result.length; i++) {
          this.$set(this.subpostingids, i, result[i].id);
        }
      } catch (err) {
        // display snackbar with error message
        this.$store.commit("setAlert", { msg: err.message, color: "error" });
      }
    },
  },
  components: {
    "app-postingform": PostingForm,
    "app-posting": Posting,
  },
};
</script>
