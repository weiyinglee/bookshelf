import React, { useContext } from 'react';
import AuthContext from '../AuthContext';
import {
  Grid, Header, Button, Image, Segment, Icon,
} from 'semantic-ui-react';

const Auth = () => {
  const { loginWithRedirect } = useContext(AuthContext);

  return (
    <Grid container id="auth">
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Segment raised>
            <Image src="/bookshelf.png" size="small" centered />
            <Header as="h1">Welcome to My Bookshelf</Header>
            <Button
              color="facebook"
              size="large"
              onClick={() => loginWithRedirect()}
            >
              <Icon name="book" />
              Click to Enter
            </Button>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Auth;
