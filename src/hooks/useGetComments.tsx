import { useQuery, gql, useMutation } from '@apollo/client';
import { GET_Posts, Get_Comment } from '../lib/graphql/posts';

export default function useGetComments() {
  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentstData,
  } = useQuery(Get_Comment);

  return {
    commentsLoading,
    commentsError,
    commentstData,
  };
}
