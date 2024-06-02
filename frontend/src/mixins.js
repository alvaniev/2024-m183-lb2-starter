// define a mixin object
export default {
  methods: {
    async addPosting(event) {
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = JSON.stringify({
        title: "",
        content: event,
        authorId: this.userId,
      });
      let res = null;
      if (this.postingId != null) {
        res = await fetch(
          `${process.env.VUE_APP_BACKEND}/postings/${this.postingId}/postings`,
          { method: method, headers: headers, body: body }
        );
      } else {
        res = await fetch(
          `${process.env.VUE_APP_BACKEND}/postings`,
          { method: method, headers: headers, body: body }
        );
      }
      this.checkHttpStatus(res);
      let result = await res.json();

      // hack recommended by vue
      // use $set for array mutations in order to make array reactive
      // shift all array elements upward by 1
      for (let i = this.subpostingids.length; i > 0; i--) {
        this.$set(this.subpostingids, i, this.subpostingids[i - 1]);
      }
      // add new subposting at the beginning of array
      this.$set(this.subpostingids, 0, result.id);
    },


    checkHttpStatus(res) {
      if (!res.ok) {
        throw new Error(`HTTP-Status: ${res.status} - ${res.statusText}`);
      }
    },
  },
};
