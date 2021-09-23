import React, { useState } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import BookInfo from './BookInfo';

const BookList = ({ books, refetch }) => {
  const [book, setBook] = useState(null);
  if (books.length === 0) return <p>No result found.</p>
  return (
    <Grid columns={3}>
      {book && (
        <BookInfo
          bookId={book._id}
          refetch={refetch}
          onClose={() => setBook(null)}
        />
      )}
      {
        books.map((book) => (
          <Grid.Column key={book._id} textAlign="center">
            <Image
              as="a"
              src={book.imageUrl}
              className="book-img"
              label={book.finished ? { color: 'black', corner: 'right', icon: 'check' } : null}
              onClick={() => setBook(book)}
            />
          </Grid.Column>
        ))
      }
    </Grid>
  );
};

export default BookList;
