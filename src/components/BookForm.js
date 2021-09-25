import React, { useState } from 'react';
import {
  Modal, Image, Button, Form, Input,
  TextArea, Checkbox,
} from 'semantic-ui-react';

const NEW_BOOK = {
  title: '',
  authorName: '',
  link: '',
  imageUrl: 'https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png',
  note: '',
  owned: false,
  public: true,
};

const BookForm = ({
  book = NEW_BOOK, submit, cancel, loading,
}) => {
  const [title, setTitle] = useState(book.title);
  const [authorName, setAuthorName] = useState(book.authorName);
  const [link, setLink] = useState(book.link);
  const [imageUrl, setImageUrl] = useState(book.imageUrl);
  const [note, setNote] = useState(book.note);
  const [owned, setOwned] = useState(book.owned);
  const [isPublic, setIsPublic] = useState(book.public);

  return (
    <>
      <Modal.Header>{book.title}</Modal.Header>
      <Modal.Content image>
        <Image src={imageUrl} className="book-img-large" />
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
            <Form.Field>
              <Checkbox
                label="Owned"
                checked={owned}
                onChange={(e, { checked }) => setOwned(checked)}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                label="Allow title displayed in Public"
                checked={isPublic}
                onChange={(e, { checked }) => setIsPublic(checked)}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content={book._id ? 'Save' : 'Add'}
          positive
          loading={loading}
          disabled={loading}
          onClick={() => submit({
            title, authorName, link, imageUrl, note, owned, public: isPublic,
          })}
        />
        <Button color='black' basic onClick={cancel}>
          {book._id ? 'Back' : 'Close'}
        </Button>
      </Modal.Actions>
    </>
  );
};

export default BookForm;
