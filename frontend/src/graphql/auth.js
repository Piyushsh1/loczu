import { gql } from '@apollo/client';

// Login mutation
export const LOGIN_MUTATION = gql`
  mutation AccountLogin($input: UserLoginInput!) {
    accountLogin(input: $input) {
      token
      message
      user {
        id
        email
        fullName
        phone
        userType
        customerCategory
        adminRole
        sellerType
        isActive
        businessName
        businessAddress
        businessDescription
        createdAt
      }
    }
  }
`;

// Register mutation
export const REGISTER_MUTATION = gql`
  mutation AccountRegister($input: UserRegisterInput!) {
    accountRegister(input: $input) {
      token
      message
      user {
        id
        email
        fullName
        phone
        userType
        customerCategory
        adminRole
        sellerType
        isActive
        businessName
        businessAddress
        businessDescription
        createdAt
      }
    }
  }
`;

// Logout mutation
export const LOGOUT_MUTATION = gql`
  mutation AccountLogout {
    accountLogout {
      success
      message
    }
  }
`;

// Get current user query
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    accountGet {
      id
      email
      fullName
      phone
      userType
      customerCategory
      adminRole
      sellerType
      isActive
      businessName
      businessAddress
      businessDescription
      createdAt
    }
  }
`;
