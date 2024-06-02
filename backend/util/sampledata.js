const fs = require("fs");
const path = require("path");

const rawdata = fs.readFileSync(
  path.join(__dirname, "..", "assets", "sampledata.json")
);
const sampledata = JSON.parse(rawdata);

module.exports.sampleUsers = sampledata.users;
module.exports.samplePostings = sampledata.postings;
module.exports.sampleVotes = sampledata.votes;

