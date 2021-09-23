import React, { useContext } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import AuthContext from '../AuthContext';

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Grid stackable container id="navbar">
      <Grid.Row>
        <Grid.Column textAlign="right">
          <Button
            icon="log out"
            content="Log out"
            basic
            floated="right"
            size="small"
            onClick={() => logout({ returnTo: window.location.origin })}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );  
};

export default Navbar;
