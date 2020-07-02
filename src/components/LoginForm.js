import React, { useState } from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { saveTokens } from "../manage-tokens";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router-dom";

//Creation of Styled components

const Form = styled.form`
  padding: 4em;
  max-width: 400px;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 50px;
  box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.2);
`;

const TextField = styled.input`
  padding-top: 10px;
  padding-right: 2px;
  padding-bottom: 10px;
  padding-left: 10px;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background: #9933ff;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.7em 1em;
  border: 2px solid;
  border-radius: 7px;
  width: 30%;
  align-self: center;
  &:hover {
    background: white;
    color: #9933ff;
  }
`;

const Title = styled.h2`
  align-self: center;
`;

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      refreshToken
      accessToken
      username
    }
  }
`;

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _confirm = async (data) => {
    console.log(data);
    if (data && data.login) {
      saveTokens(data.login);
    }
  };

  return (
    <Mutation
      mutation={LOGIN_USER}
      variables={{ email, password }}
      onCompleted={(data) => _confirm(data)}
    >
      {(login) => (
        <div>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              login();
              return <h1>blabla</h1>;
            }}
          >
            <Title>Please enter your credentials</Title>
            <TextField
              type="text"
              value={email}
              name="email"
              placeholder="E-mail address"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              type="password"
              value={password}
              name="password"
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button type="submit">Log in</Button>
          </Form>
        </div>
      )}
    </Mutation>
  );
}
