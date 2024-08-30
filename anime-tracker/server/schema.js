//FIGURE OUT NESTED SCHEMA STRUCTURE SO THAT CACHE, FIELD,
//AND TYPEPOLICIES CAN BE UPDATED AND NESTED CORRECTLY TOO
//IS PAGE SUPPOSED TO BE IGNORED? PAGE WILL BE WRAPPING
//EVERY QUERY FOR PAGINATION
const gql = require("graphql-tag");
const typeDefs = gql`

type Page {
  actorsByCharacter: ActorByCharacter
}
type ActorByCharacter {

}
type ActorByCharacter {
  Page: {
    characters: [{
      media:{
        edges(MediaConnection): [{
          node(MediaEdge): {
            id: Int,
            coverImage(MediaCoverImage): {
              medium: String
            }
          }
        }, {
          voiceActors(Staff): [{
            id: Int,
            image(StaffImage): {
              medium: String
            },
            name(StaffName): {
              full: String
            }
          }]
        }]
      }
    }]
  }
}



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