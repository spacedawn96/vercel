import React, { useContext } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import Footer from '../components/Footer';
import RegisterForm from '../components/Forms/RegisterForm';
import { item } from '../components/NavBar';
import Navbar from '../components/NavBar/NavBar';
import View from '../components/View';
import useRegister from '../hooks/useRegister';

export type RegisterProps = {};

const RegisterT = styled.div`
  height: 45rem;
`;

const E = styled.div`
  text-align: center;
  margin-top: 2rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function Register(props: RegisterProps) {
  const { inputs, handleChange, handleSubmit, registerError } = useRegister();

  return (
    <>
      <View.Container>
        <View.Header>
          <Navbar items={item} color="fff" />
        </View.Header>
        <View.Body>
          <RegisterT>
            <E>
              {registerError &&
                registerError.graphQLErrors.map(({ message }, i) => (
                  <span key={i}>{message}</span>
                ))}
            </E>
            <Card
              title="Register"
              body={
                <RegisterForm
                  inputs={inputs}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  registerError={registerError}
                />
              }
            />
          </RegisterT>
        </View.Body>
        <Footer />
      </View.Container>
    </>
  );
}

export default Register;
