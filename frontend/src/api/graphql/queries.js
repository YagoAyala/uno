import { gql } from '@apollo/client';

export const TODOS_QUERY = gql`
  query Todos($filter: ItemFilter) {
    todoList(filter: $filter) {
      id
      name
      lane_id
      priority_id
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddItem($values: ItemInput!) {
    addItem(values: $values)
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateItem($values: ItemInput!) {
    updateItem(values: $values)
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteItem($id: Int!) {
    deleteItem(id: $id)
  }
`;

export const LANES_QUERY = gql`
  query Lanes {
    lanes {
      id
      name
      position
    }
  }
`;

export const LANES_TODOS_QUERY = gql`
  query LanesWithItem($filter: ItemFilter) {
    lanesWithItem(filter: $filter) {
      id
      name
      position
      is_done
      todos {
        id
        name
        lane_id
        priority_id
      }
    }
  }
`;

export const PRIORITIES_QUERY = gql`
  query Priorities {
    priorities {
      id
      name
      color
    }
  }
`;
