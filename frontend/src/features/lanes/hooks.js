import { useQuery } from '@apollo/client';
import { LANES_QUERY, LANES_TODOS_QUERY } from '../../api/graphql/queries';

export const useLanes = () =>
  useQuery(LANES_QUERY, { fetchPolicy: 'cache-first' });

export const useLanesWithTodos = () =>
  useQuery(LANES_TODOS_QUERY, {
    variables: { filter: null },
    fetchPolicy: 'cache-first',
  });
