import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';
import BookForm from './BookForm';

const BookEdit = ({ book, refetch, children }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  const onEdit = async (data) => {
    setLoading(true);
    const response = await fetch(`/api/books/edit/${book._id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const result = await response.json();
    setLoading(false);
    setOpen(false);
    if (result.success) refetch();
  };

  const onDelete = async () => {
    const response = await fetch(`/api/books/delete/${book._id}`, {
      method: 'DELETE'
    })
    const result = await response.json();
    setLoading(false);
    setOpen(false);
    if (result.success) refetch();
    else alert('Failed to delete the book');
  };

  return (
    <Modal
      closeIcon
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      size="small"
      trigger={children}
    >
      <BookForm
        book={book}
        submit={onEdit}
        onDelete={onDelete}
        cancel={() => setOpen(false)}
        loading={loading}
      />
    </Modal>
  );
};

export default BookEdit;
