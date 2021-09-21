import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { user, logout } = useAuth0();

  return (
    <Grid stackable container textAlign="right">
      <Grid.Row>
        <Grid.Column>
          {`Welcome, ${user.name || user.email}`}
        </Grid.Column>
        <Grid.Column>
          <Button
            negative
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
