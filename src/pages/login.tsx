import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Footer from '../components/Footer';
import LoginForm from '../components/Forms/LoginForm';
import MainLayout from '../components/Layout';
import { item } from '../components/NavBar';
import Navbar from '../components/NavBar/NavBar';
import MainPageTemplate from '../components/Template';
import View from '../components/View';
import useLogin from '../hooks/useLogin';

export type LoginProps = {};

const LoginT = styled.div`
  height: 45rem;
`;

function Login(props: LoginProps) {
  const { inputs, handleChange, handleSubmit, loginError } = useLogin();

  const E = styled.div`
    text-align: center;
    margin-top: 2rem;

    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  `;

  return (
    <>
      <View.Container>
        <View.Header>
          <Navbar items={item} color="fff" />
        </View.Header>
        <View.Body>
          <LoginT>
            <E>
              {loginError &&
                loginError.graphQLErrors.map(({ message }, i) => (
                  <span key={i}>{message}</span>
                ))}
            </E>
            <Card
              title="Login"
              body={
                <LoginForm
                  inputs={inputs}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              }
            />
          </LoginT>
        </View.Body>
        <Footer />
      </View.Container>
    </>
  );
}

export default Login;
