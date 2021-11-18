import { useQuery, gql, useMutation } from '@apollo/client';
import { getUsersQuery } from 'src/lib/graphql/users';

export default function useGetUsers() {
  const { loading, error, data } = useQuery(getUsersQuery);

  return {
    loading,
    error,
    data,
  };
}
