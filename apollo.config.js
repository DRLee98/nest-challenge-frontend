// folder의 depth가 여러개라도 인식함
module.exports = {
  client: {
    includes: ["src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "podcast-backend",
      url: "https://nestjs-challenge-backend.herokuapp.com/graphql",
    },
  },
};
// https://podcast-backend-tony.herokuapp.com/graphql
