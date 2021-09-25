import React, { useContext } from 'react';
import { Grid, Button, Radio } from 'semantic-ui-react';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const { token, logout, user } = useContext(AuthContext);

  const updatePrivacy = async (e, { checked }) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/users/update/${user.email}`, {
      method: 'PUT',
      body: JSON.stringify({ private: checked }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  };

  return (
    <Grid stackable container id="navbar">
      <Grid.Row>
        <Grid.Column textAlign="right">
          {token && (
            <>
              <Radio
                toggle
                label="Set your bookshelf as Private"
                onChange={updatePrivacy}
              />
              <Button
                icon="log out"
                content="Log out"
                basic
                floated="right"
                onClick={() => logout({ returnTo: window.location.origin })}
              />
            </>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );  
};

export default Navbar;
