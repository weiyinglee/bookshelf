import React, { useState, useEffect } from 'react';
import {
  Modal, Image, Header, Button, Confirm,
  Loader,
} from 'semantic-ui-react';
import BookForm from './BookForm';

const BookInfo = ({ bookId, onClose, refetch }) => {
  const [confirm, setConfirm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`/api/books/get/${bookId}`);
      const result = await response.json();
      if (result.success) {
        setBook(result.book);
      }
      setLoading(false);
    }
    if (loading) fetchBook();
  }, [loading, bookId]);

  if (loading) return <Loader active />;

  const handleFinished = async () => {
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

  const onEdit = async (data) => {
    setProcessing(true);
    const response = await fetch(`/api/books/edit/${book._id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const result = await response.json();
    setProcessing(false);
    setEditMode(false);
    if (result.success) setLoading(true);
  };

  const onDelete = async (book) => {
    const response = await fetch(`/api/books/delete/${book._id}`, {
      method: 'DELETE'
    })
    const result = await response.json();
    if (result.success) refetch();
    else alert('Failed to delete the book');
  };

  const renderContent = () => {
    if (editMode) {
      return (
        <BookForm
          book={book}
          submit={onEdit}
          cancel={() => setEditMode(false)}
          loading={processing}
        />
      );
    }
    return (
      <>
        <Confirm
          open={confirm}
          content={`Are you sure to remove ${book.title} from your library ?`}
          onCancel={() => setConfirm(false)}
          onConfirm={() => {
            onDelete(book);
            setConfirm(false);
          }}
        />
        <Modal.Header>{book.title}</Modal.Header>
        <Modal.Content image>
          <Image
            src={book.imageUrl}
            className="book-img-large"
            onClick={() => window.open(book.link, '_blank')}
          />
          <Modal.Description>
            <Button
              icon="edit"
              floated="right"
              size="small"
              onClick={() => setEditMode(true)}
            />
            <Header as="h1" className="title">
              {book.title}
              <Header.Subheader>{`By ${book.authorName}`}</Header.Subheader>
            </Header>
            <p className="note">{book.note}</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon="book"
            content={`Mark as ${book.finished ? 'Unread' : 'Read'}`}
            color="black"
            basic={!book.finished}
            onClick={handleFinished}
          />
          <Button
            icon="trash alternate"
            negative
            basic
            onClick={() => setConfirm(true)}
          />
        </Modal.Actions>
      </>
    );
  };

  return (
    <Modal
      closeIcon
      open
      onClose={onClose}
      size="small"
      id="book-info"
    >
      {renderContent()}
    </Modal>
  );
};

export default BookInfo;
