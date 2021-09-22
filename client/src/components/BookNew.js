import React, { useState } from 'react';
import { Modal } from 'semantic-ui-react';
import BookForm from './BookForm';
import { useAuth0 } from '@auth0/auth0-react';

const BookNew = ({ refetch, children }) => {
  const { user } = useAuth0();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onAdd = async (data) => {
    setLoading(true);
    const response = await fetch(`/api/books/add/${user.sub}`, {
      method: 'POST',
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
        submit={onAdd}
        cancel={() => setOpen(false)}
        loading={loading}
      />
    </Modal>
  );
};

export default BookNew;
