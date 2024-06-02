<template>
  <v-dialog v-model="dialog.state" max-width="600px">
    <template #activator="{ on }">
      <v-btn text color="primary" v-on="on">
        <slot name="buttonlabel"></slot>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <slot name="dialogtitle"></slot>
      </v-card-title>
      <v-card-text>
        <v-textarea
          name="content"
          label="Text / Inhalt"
          auto-grow
          value
          v-model="dialog.content"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close" color="primary">Close</v-btn>
        <v-btn text @click="save" color="primary">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import newPosting from "@/mixins.js";

export default {

  mixins: [newPosting],

  data() {
    return {
      dialog: {
        content: "",
        state: false,
        parentPosting: this.parentPosting,
      },
    };
  },
  methods: {
    async save() {
      // closes the dialog box
      this.dialog.state = false;

      await this.$emit("addPosting", this.dialog.content);
      this.dialog.content = "";
    },
    close() {
      this.dialog.state = false;
    },
  },
  props: {
    parentPosting: Number,
  },
};
</script>
