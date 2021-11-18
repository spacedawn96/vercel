import { setAccessToken } from 'src/lib/accessToken';
import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import useForms from './useForm';
import { loginMutation } from 'src/lib/graphql/users';
import { MeDocument, MeQuery } from 'src/types/apolloComponent';

export default function useLogin() {
  const [inputs, handleChange] = useForms({
    email: '',
    password: '',
  });

  const router = useRouter();
  const [login, { error: loginError }] = useMutation(loginMutation, {
    onCompleted({ login }) {
      router.push('/');
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await login({
      variables: inputs,
      update: (store, { data }) => {
        if (!data) {
          return null;
        }

        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.username,
          },
        });
      },
    });

    if (response.data) {
      setAccessToken(response.data.login.accessToken);
    }
  };

  return { inputs, handleChange, handleSubmit, loginError };
}
