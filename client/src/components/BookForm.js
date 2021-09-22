import React, { useState } from 'react';
import {
  Modal, Image, Button, Form, Input,
  TextArea, Icon,
} from 'semantic-ui-react';

const NEW_BOOK = {
  title: '',
  authorName: '',
  link: '',
  imageUrl: 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png',
  note: '',
};

const BookForm = ({
  book = NEW_BOOK, submit, onDelete, cancel, loading,
}) => {
  const [title, setTitle] = useState(book.title);
  const [authorName, setAuthorName] = useState(book.authorName);
  const [link, setLink] = useState(book.link);
  const [imageUrl, setImageUrl] = useState(book.imageUrl);
  const [note, setNote] = useState(book.note);

  return (
    <>
      <Modal.Header>{book.title}</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={imageUrl} wrapped />
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Title</label>
              <Input
                fluid
                value={title}
                onChange={(e, { value }) => setTitle(value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Author</label>
              <Input
                fluid
                value={authorName}
                onChange={(e, { value }) => setAuthorName(value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Book Link</label>
              <Input
                fluid
                value={link}
                onChange={(e, { value }) => setLink(value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Image URL</label>
              <Input
                fluid
                value={imageUrl}
                onChange={(e, { value }) => setImageUrl(value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Note</label>
              <TextArea
                value={note}
                onChange={(e, { value }) => setNote(value)}
              />
            </Form.Field>
            {book._id && (
              <Button
                icon
                basic
                negative
                labelPosition='left'
                onClick={onDelete}
              >
                <Icon name='trash alternate' />
                Remove this book
              </Button>
            )}
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={cancel}>
          Close
        </Button>
        <Button
          content={book._id ? 'Save' : 'Add'}
          positive
          loading={loading}
          disabled={loading}
          onClick={() => submit({
            title, authorName, link, imageUrl, note,
          })}
        />
      </Modal.Actions>
    </>
  );
};

export default BookForm;
