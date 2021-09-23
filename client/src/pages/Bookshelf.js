import React, { useState, useEffect } from 'react';
import {
  Grid, Menu, Header, Button,
} from 'semantic-ui-react';
import Loading from '../components/Loading';
import BookNew from '../components/BookNew';
import BookList from '../components/BookList';
import { useAuth0 } from '@auth0/auth0-react';

const Bookshelf = () => {
  const { user } = useAuth0();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState('library');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`/api/books/get/all/${user.sub}`);
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
    library: books,
    finished: books.filter((book) => book.finished),
    unread: books.filter((book) => !book.finished),
  }

  return (
    <Grid centered stackable container id="bookshelf">
      <Grid.Row>
        <Grid.Column>
          <Header>My Bookshelf</Header>
          <BookNew refetch={() => setLoading(true)}>
            <Button
              icon="plus"
              size="mini"
              floated="right"
            />
          </BookNew>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <Menu
            fluid
            vertical
            secondary
          >
            <Menu.Item
              name='library'
              active={activeItem === 'library'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='unread'
              active={activeItem === 'unread'}
              onClick={handleItemClick}
            />
            <Menu.Item
              name='finished'
              active={activeItem === 'finished'}
              onClick={handleItemClick}
            />
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
