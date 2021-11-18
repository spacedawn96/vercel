import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { ApolloError } from '@apollo/client';
import media from '../../lib/styles/media';
import LabelInput from '../LabelInput/LabelInput';
import Button from '../Button';

const LoginFormTap = styled.div`
  max-width: 20rem;
  margin: 0 auto;
  display: flex;

  align-items: flex-end;

  form {
    margin: 0 auto;
  }
  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    ${media.custom(500)} {
      width: 100%;
    }
  }
`;

interface inputArray {
  email: string;
  password: string;
}

export type LoginFormProps = {
  inputs?: inputArray;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  loginError?: ApolloError;
};

function LoginForm(props: LoginFormProps) {
  const router = useRouter();

  return (
    <LoginFormTap>
      <form onSubmit={props.handleSubmit}>
        <LabelInput
          label="Email"
          placeholder="Your Email"
          name="email"
          value={props.inputs.email}
          type="text"
          onChange={props.handleChange}
        />
        <LabelInput
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={props.inputs.password}
          onChange={props.handleChange}
        />

        <div className="button-wrapper">
          <Button
            color="blue"
            size="small"
            iconAfter="arrow-right"
            style={{ marginRight: '1rem' }}>
            Sign In
          </Button>

          <Link href="/register" passHref>
            <Button color="blue" size="small" iconBefore="edit">
              Create Account
            </Button>
          </Link>
        </div>
      </form>
    </LoginFormTap>
  );
}

export default LoginForm;
