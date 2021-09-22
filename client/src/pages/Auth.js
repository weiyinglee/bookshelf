import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Header, Button } from 'semantic-ui-react';

const Auth = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Grid centered container>
      <Grid.Row centered>
        <Grid.Column>
          <Header as="h1">Welcome to BookShelf</Header>
          <Button
            primary
            onClick={() => loginWithRedirect()}
          >
            Login
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Auth;
