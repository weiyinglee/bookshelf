import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import {
  Grid, Header, Button, Image, Segment,
  Icon, Divider, Loader,
} from 'semantic-ui-react';
import LibraryModal from '../components/LibraryModal';

const Home = () => {
  const history = useHistory();
  const { loginWithRedirect, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [bookshelfs, setBookshelfs] = useState([]);
  const [bookshelf, setBookshelf] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/get`);
      const result = await response.json();
      if (result.success) {
        setBookshelfs(result.users.filter((user) => !user.private));
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <Grid container textAlign="center" id="home">
      {bookshelf && <LibraryModal bookshelf={bookshelf} onClose={() => setBookshelf(null)} />}
      <Grid.Row>
        <Grid.Column>
          <Segment raised>
            <Image src="/books.png" size="small" centered />
            <Header as="h1">
              Welcome to My Bookshelf
              <Header.Subheader>
                Create and Manage Your own Library Now
              </Header.Subheader>
            </Header>
            <Button
              circular
              color="facebook"
              size="large"
              onClick={() => {
                if (token) history.push('/bookshelf');
                else loginWithRedirect()
              }}
            >
              <Icon name="book" />
              {token ? 'Click to Enter' : 'Login'}
            </Button>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Loader active={token && loading} inline />
      {bookshelfs.length !== 0 && (
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <Header as="h2" content="DISCOVER OTHER BOOKSHELFS" />
              <Divider />
              <Grid
                columns={3}
                centered
                className="bookshelf-list"
              >
                {
                  bookshelfs.map((bookshelf) => (
                    <Grid.Column textAlign="center">
                      <Header as='h2' icon>
                        <Icon
                          name="book"
                          color="brown"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setBookshelf(bookshelf)}
                        />
                        {`${bookshelf.name}`}
                      </Header>
                    </Grid.Column>
                  ))
                }
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  );
};

export default Home;
