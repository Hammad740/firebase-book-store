// src/components/List.js
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFireBase } from '../context/Firebase';
import { ToastContainer, toast, Slide } from 'react-toastify';

const List = () => {
  const { handleCreateNewListing, currentUser } = useFireBase();
  const [name, setName] = useState('');
  const [isbnNumber, setIsbnNumber] = useState('');
  const [coverPic, setCoverPic] = useState(null);
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error('You must be logged in to create a listing.', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
      return;
    }

    try {
      await handleCreateNewListing(
        currentUser,
        name,
        price,
        isbnNumber,
        coverPic
      );
      setName('');
      setCoverPic(null);
      setPrice('');
      setIsbnNumber('');
      toast.success('Data uploaded successfully', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
    } catch (error) {
      toast.error('Failed to upload data', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      });
    }
  };

  return (
    <Form className="m-5" onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail" className="mb-3">
        <Form.Label>Book Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter book name"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicISBN">
        <Form.Label>ISBN</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter ISBN number"
          value={isbnNumber}
          onChange={(e) => setIsbnNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCoverPic">
        <Form.Label>Cover Picture</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setCoverPic(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
      <ToastContainer />
    </Form>
  );
};

export default List;
