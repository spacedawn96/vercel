import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { registerMutation } from '../lib/graphql/users';
import useForms from './useForm';

export default function useRegister() {
  const router = useRouter();
  const [inputs, handleChange] = useForms({
    username: '',
    email: '',
    password: '',
  });

  const [signUp, { error: registerError }] = useMutation(registerMutation, {
    onCompleted({ signUp }) {
      router.push('/login');
    },
  });

  const handleSubmit = async e => {
    e.preventDefault();
    signUp({
      variables: inputs,
    });
  };

  return { inputs, handleChange, handleSubmit, registerError };
}
