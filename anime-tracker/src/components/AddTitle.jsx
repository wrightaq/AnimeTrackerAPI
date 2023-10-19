import { gql } from "@apollo/client";

const ADD_TITLE = gql `
query GetCharacterNamesByTitle($id: Int, $offset: Int, $limit: Int $search: String){
  Media (id: $id, search: $search, type: ANIME) {
    id
    characters(page: $offset, perPage: $limit, sort: ID) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      edges {
        node {
          id
          image {
            medium
          }
          name {
            full
          }
        }
        voiceActors (language: JAPANESE) {
          id
          image {
            medium
          }
          name {
            full
          }
        }
      }
    }
  }
}`