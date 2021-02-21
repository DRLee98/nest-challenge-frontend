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
