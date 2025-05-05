import { useQuery, useMutation } from '@apollo/client';
import {
  TODOS_QUERY,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '../../api/graphql/queries';
import { getOperationName } from '@apollo/client/utilities';

const TODOS_OP_NAME = getOperationName(TODOS_QUERY);

export const useTodos = () => useQuery(TODOS_QUERY);

export const useAddTodo = () =>
  useMutation(ADD_TODO, {
    refetchQueries: [TODOS_OP_NAME],
    awaitRefetchQueries: true,
  });

export const useUpdateTodo = () =>
  useMutation(UPDATE_TODO, {
    refetchQueries: [TODOS_OP_NAME],
    awaitRefetchQueries: true,
  });

export const useDeleteTodo = () =>
  useMutation(DELETE_TODO, {
    refetchQueries: [TODOS_OP_NAME],
    awaitRefetchQueries: true,
  });
