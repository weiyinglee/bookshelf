import React, { useState, useEffect } from 'react';
import { Grid, Image, Modal } from 'semantic-ui-react';
import Loading from './Loading';

const LibraryModal = ({ bookshelf, onClose }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/books/get/all/${bookshelf.userId}`);
      const result = await response.json();
      if (result.success) {
        setBooks(result.books.filter((book) => book.public));
      } else {
        console.log(result.error);
      }
      setLoading(false);
    }
    if (loading) fetchBooks();
  },[bookshelf.userId, loading]);
  if (loading) return <Loading />;
  return (
    <Modal closeIcon open onClose={onClose}>
      <Modal.Header>{`${bookshelf.name}'s bookshelf`}</Modal.Header>
      <Modal.Content scrolling>
        {books.length === 0 ? (
          <p>No result found.</p>
        ) : (
          <Grid columns={3}>
            {
              books.map((book) => (
                <Grid.Column key={book._id} textAlign="center">
                  <Image
                    as="a"
                    src={book.imageUrl}
                    href={book.link}
                    target="_blank"
                    className="book-img"
                  />
                </Grid.Column>
              ))
            }
          </Grid>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default LibraryModal;
