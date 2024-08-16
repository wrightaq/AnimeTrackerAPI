const gql = require("graphql-tag");
const typeDefs = gql`

"Queries"
type Query {
  title: [Title]
  characters: [Character]
  voiceActor: [VoiceActor]
}

"Title of an anime"
  type Title {
    id: ID
    "list of characters in the titled anime
    characters: [String]
    "link to image of the titles anime"
    image: String
  }

"Characters in an anime"
  type Character {
    id: ID
    "title of the anime the character is in"
    title: String
    "name of the voice actor for the character"
    voiceActor: String
    "link to image of the character"
    image: String
  }

"Voice Actor for a character in an anime"
  type VoiceActor {
    id: ID
    "list of characters the voice actor voices"
    characters: [String]
    "link to image of the voice actor"
    image: String
  }

`;
const resolvers = {
  Query: {
    title: () => title,
    character: () => character,
    voiceActor: () => voiceActor,
  },
};
module.exports = {
  typeDefs,
  resolvers
}