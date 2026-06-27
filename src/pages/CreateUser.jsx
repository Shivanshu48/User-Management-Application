import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import SuccessMessage from '../components/SuccessMessage.jsx';
import UserForm from '../components/UserForm.jsx';
import { createUser } from '../services/api.js';

const REDIRECT_DELAY_MS = 700;

function createLocalUserId() {
  return Date.now();
}

function CreateUser({ onUserCreated }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleCreateUser(user) {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const createdUser = await createUser(user);
      const localUser = {
        ...user,
        ...createdUser,
        id: createLocalUserId(),
        isLocal: true,
      };

      onUserCreated(localUser);
      setSuccessMessage('User created successfully.');

      setTimeout(() => {
        navigate('/', {
          state: {
            successMessage: 'User created successfully.',
          },
        });
      }, REDIRECT_DELAY_MS);
    } catch (error) {
      setErrorMessage('Unable to create the user right now. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <section className="page">
      <h1>Create User</h1>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <UserForm mode="create" isSubmitting={isSubmitting} onSubmit={handleCreateUser} />
    </section>
  );
}

export default CreateUser;
