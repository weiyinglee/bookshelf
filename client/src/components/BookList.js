import React from 'react';
import {
  Card, Image, Button, Label,
} from 'semantic-ui-react';
import BookEdit from './BookEdit';

const BookList = ({ books, refetch }) => {
  const handleFinished = async (book) => {
    const response = await fetch(`/api/books/edit/${book._id}`, {
      method: 'PUT',
      body: JSON.stringify({ finished: !book.finished }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const result = await response.json();
    if (result.success) refetch();
  }

  if (books.length === 0) return <p>No result found.</p>

  return (
    <Card.Group itemsPerRow={2}>
      {
        books.map((book) => (
          <Card key={book._id}> 
            {book.finished ? (
              <Label attached='top' color="black">Read</Label>
            ): (
              <Label attached='top' style={{ backgroundColor: '#fff' }}></Label>
            )}
            <Image
              src={book.imageUrl}
              centered
              className="book-img"
              onClick={() => window.open(book.link, '_blank')}
            />
            <Card.Content>
              <BookEdit book={book} refetch={refetch}>
                <Button
                  icon="edit"
                  size="mini"
                  floated="right"
                />
              </BookEdit>
              <Card.Header>{book.title}</Card.Header>
              <Card.Meta>
                <span>{book.authorName}</span>
              </Card.Meta>
              <Card.Description>
                {book.note}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button
                  color='black'
                  basic={book.finished}
                  onClick={() => handleFinished(book)}
                >
                  {`Mark as ${book.finished ? 'Unread' : 'Read'}`}
                </Button>
              </div>
            </Card.Content>
          </Card>
        ))
      }
    </Card.Group>
  );
};

export default BookList;
