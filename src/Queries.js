import { gql } from "apollo-boost";
export const uri = "http://localhost:4000/graphql";

export const PLQuery = gql`
  query category($type: String!) {
    category(input: { title: $type }) {
      products {
        name
        id
        gallery
        brand
        inStock
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        attributes {
          name
          type
          id
          items {
            value
          }
        }
      }
    }
  }
`;
export const ProductQuery = gql`
  query ProductQuery($id: String!) {
    product(id: $id) {
      name
      id
      category
      description
      gallery
      brand
      inStock
      prices {
        amount
        currency {
          symbol
          label
        }
      }
      attributes {
        name
        type
        id
        items {
          value
        }
      }
    }
  }
`;
export const CurrencyQuery = gql`
  {
    currencies {
      symbol
      label
    }
  }
`;
export const CategoriesQuery = gql`
  {
    categories {
      name
    }
  }
`;
