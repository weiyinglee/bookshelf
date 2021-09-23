import React from 'react';
import { Grid, Button, Header } from 'semantic-ui-react';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { user, logout } = useAuth0();

  return (
    <Grid stackable container id="navbar">
      <Grid.Row>
        <Grid.Column textAlign="right">
          <Header>
            {`Welcome, ${user.name || user.email}`}
          </Header>
          <Button
            negative
            floated="right"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Log out
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );  
};

export default Navbar;
