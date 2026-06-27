import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import UserForm from '../components/UserForm.jsx';
import { getUser, updateUser } from '../services/api.js';

function EditUser({ users, onUserUpdated }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const existingUser = users.find((user) => String(user.id) === String(id));
  const [user, setUser] = useState(existingUser || null);
  const [isLoading, setIsLoading] = useState(!existingUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
      if (existingUser) {
        setUser(existingUser);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        const userData = await getUser(id);

        if (isMounted) {
          setUser(userData);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage('Unable to load this user right now. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [existingUser, id]);

  async function handleUpdateUser(formValues) {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const updatedUser = await updateUser(id, formValues);
      const userToStore = {
        ...user,
        ...formValues,
        ...updatedUser,
        id: user?.id || Number(id),
      };

      onUserUpdated(userToStore);
      navigate('/', {
        state: {
          successMessage: 'User updated successfully.',
        },
      });
    } catch (error) {
      setErrorMessage('Unable to update the user right now. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <section className="page">
      <h1>Edit User</h1>
      {isLoading && <LoadingSpinner label="Loading user" />}
      {!isLoading && <ErrorMessage message={errorMessage} />}
      {!isLoading && user && (
        <UserForm
          mode="edit"
          initialValues={user}
          isSubmitting={isSubmitting}
          onSubmit={handleUpdateUser}
        />
      )}
    </section>
  );
}

export default EditUser;
