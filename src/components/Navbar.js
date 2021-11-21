import React, { useContext } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <Grid stackable container id="navbar">
      <Grid.Row>
        <Grid.Column textAlign="right">
          {token && (
            <Button
              icon="log out"
              content="Log out"
              basic
              inverted
              floated="right"
              onClick={() => logout({ returnTo: window.location.origin })}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );  
};

export default Navbar;
