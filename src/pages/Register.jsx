import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFireBase } from '../context/Firebase';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Register = () => {
  const fireBase = useFireBase();
  console.log(fireBase);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (fireBase.isLoggedIn) {
      //// navigate to home
      navigate('/');
    }
  }, [fireBase, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fireBase.signUp(email, password);
      toast.success('Account Created Successfully', {
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
      setEmail('');
      setPassword('');
    } catch (error) {
      toast.error('Failed to create account: ' + error.message, {
        position: 'top-right',
        autoClose: 5000,
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
    <div className="container mt-3">
      <Form onSubmit={handleSubmit} className="m-5">
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default Register;
