import { useQuery, gql, useMutation } from '@apollo/client';
import { GET_Posts } from 'src/lib/graphql/posts';

export default function useGetPosts() {
  const { loading, error, data } = useQuery(GET_Posts);

  return {
    loading,
    error,
    data,
  };
}
