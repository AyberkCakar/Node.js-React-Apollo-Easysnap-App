const { gql } = require("apollo-boost");

// user mutations

export const CREATE_USER = gql`
    mutation($username: String!, $password: String!) {
    createUser(data: { username: $username, password: $password }) {
        token
        }
    }
`;

export const SIGNIN_USER = gql`
    mutation($username: String! $password: String!){
    singIn(data: {
    username: $username
    password: $password
    }){
    token
    }
    }
`;

export const GET_ACTIVE_USER = gql`
    query{
        activeUser{
         username
         createdAt
         snaps{
            text
            createdAt
         }
      }
    }
`;