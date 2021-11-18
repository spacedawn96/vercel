import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import LabelInput from '../LabelInput/LabelInput';
import { toast, ToastContainer } from 'react-nextjs-toast';

const RegisterFormTap = styled.div`
  max-width: 20rem;
  margin: 0 auto;
  display: flex;

  align-items: flex-end;
  .auth-btn {
    display: flex;
    justify-content: flex-end;
  }
  form {
    margin: 0 auto;
  }
`;

type inputArray = {
  username: string;
  email: string;
  password: string;
};

export type RegisterFormProps = {
  inputs: inputArray;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  registerError: any;
};

function RegisterForm(props: RegisterFormProps) {
  const onClickNotify = e => {
    e.preventDefault();
    toast.notify(`${props.registerError}`, {
      duration: 2,
      type: 'error',
    });
  };

  console.log(props.registerError);

  // onSubmit={e => {
  //   props.userData.me ? e.preventDefault() : props.onClickNotify(e);
  //   checkEmpty(Text)
  //     ? props.onClickNotifyCheckString(e)
  //     : props.handleSubmit(e, props.findId, Text);
  //   props.userData.me ? setText('') : '';
  // }}>

  return (
    <RegisterFormTap>
      <form
        onSubmit={e => {
          props.handleSubmit(e);
        }}>
        <LabelInput
          label="UserName"
          placeholder="UserName"
          name="username"
          type="text"
          value={props.inputs?.username}
          onChange={props.handleChange}
        />
        <LabelInput
          label="Email"
          placeholder="Your Email"
          name="email"
          type="email"
          value={props.inputs?.email}
          onChange={props.handleChange}
        />
        <LabelInput
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={props.inputs?.password}
          onChange={props.handleChange}
        />
        <div className="auth-btn">
          <Button color="blue" size="small" iconAfter="arrow-right">
            Sign Up
          </Button>
        </div>
      </form>
    </RegisterFormTap>
  );
}

export default RegisterForm;
