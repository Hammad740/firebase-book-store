// src/components/Home.js
import { useEffect, useState } from 'react';
import { useFireBase } from '../context/Firebase';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Login from './Login';

const Home = () => {
  const [books, setBooks] = useState([]);
  const fireBase = useFireBase();

  useEffect(() => {
    if (fireBase.isLoggedIn) {
      const fetchBooks = async () => {
        try {
          const booksData = await fireBase.getListAllBooks();
          setBooks(booksData);
        } catch (err) {
          console.log(err);
        }
      };

      fetchBooks();
    }
  }, [fireBase.isLoggedIn]);

  const handleLogout = async () => {
    try {
      await fireBase.signOutUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      {fireBase.isLoggedIn ? (
        <>
          <Button variant="danger" onClick={handleLogout} className="mb-4">
            Logout
          </Button>
          <h1>List books here</h1>
          <Row xs={1} md={2} lg={3} className="g-4">
            {books.map((book, index) => (
              <Col key={index}>
                <Card style={{ height: '100%' }}>
                  <Card.Img
                    variant="top"
                    src={book.imageUrl}
                    alt={`${book.name} cover`}
                    className="img-fluid"
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Text>
                      <p>ISBN: {book.isbn}</p>
                      <p>Price: ${book.price}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
