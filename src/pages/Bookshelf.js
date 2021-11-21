import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid, Menu, Header, Button, Icon,
} from 'semantic-ui-react';
import Loading from '../components/Loading';
import BookNew from '../components/BookNew';
import BookList from '../components/BookList';
import AuthContext from '../contexts/AuthContext';

const Bookshelf = () => {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState('library');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books/get/all/${user.sub}`);
      const result = await response.json();
      if (result.success) {
        setBooks(result.books);
      } else {
        console.log(result.error);
      }
      setLoading(false);
    }
    if (loading) fetchBooks();
  },[user, loading]);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  if (loading) return <Loading />;

  const BOOKS = {
    library: books.filter((book) => book.owned),
    read: books.filter((book) => book.owned && book.finished),
    discover: books.filter((book) => !book.owned),
    public: books.filter((book) => book.public),
  }

  return (
    <Grid centered stackable container id="bookshelf">
      <Grid.Row>
        <Grid.Column>
          <Icon
            inverted
            size="large"
            name="arrow alternate circle left outline"
            onClick={() => history.push('/home')}
          />
          <Header inverted>{`${user.name}'s Bookshelf`}</Header>
          <BookNew refetch={() => setLoading(true)}>
            <Button
              icon="plus"
              size="mini"
              floated="right"
            />
          </BookNew>
          <Button
            icon="refresh"
            size="mini"
            floated="right"
            onClick={() => setLoading(true)}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <Menu
            fluid
            vertical
            secondary
            inverted
          >
            <Menu.Item
              name='library'
              active={activeItem === 'library'}
              onClick={handleItemClick}
            >
              {`Library (${BOOKS['library'].length})`}
            </Menu.Item>
            <Menu.Item
              name='read'
              active={activeItem === 'read'}
              onClick={handleItemClick}
            >
              {`Read (${BOOKS['read'].length})`}
            </Menu.Item>
            <Menu.Item
              name='discover'
              active={activeItem === 'discover'}
              onClick={handleItemClick}
            >
              {`Wish List (${BOOKS['discover'].length})`}
            </Menu.Item>
            {/*
              <Menu.Item
                name='public'
                active={activeItem === 'public'}
                onClick={handleItemClick}
              >
                Public Titles
              </Menu.Item>
            */}
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <BookList books={BOOKS[activeItem]} refetch={() => setLoading(true)} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};

export default Bookshelf;
