import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import SuccessMessage from '../components/SuccessMessage.jsx';
import UserCard from '../components/UserCard.jsx';
import { deleteUser, getUsers } from '../services/api.js';
import './Home.css';

function Home({ users, usersLoaded, onUsersLoaded, onUserDeleted }) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(!usersLoaded);
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');
  const [deletingUserId, setDeletingUserId] = useState(null);
  const successMessage = location.state?.successMessage || '';

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      if (usersLoaded) {
        setIsLoading(false);
        return;
      }

      try {
        const usersData = await getUsers();

        if (isMounted) {
          onUsersLoaded(usersData);
          setErrorMessage('');
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage('Unable to load users right now. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [onUsersLoaded, usersLoaded]);

  async function handleDeleteUser(user) {
    const shouldDelete = window.confirm(`Are you sure you want to delete ${user.name}?`);

    if (!shouldDelete) {
      return;
    }

    setDeletingUserId(user.id);
    setDeleteErrorMessage('');
    setDeleteSuccessMessage('');

    try {
      await deleteUser(user.id);
      onUserDeleted(user.id);
      setDeleteSuccessMessage(`${user.name} was deleted successfully.`);
    } catch (error) {
      setDeleteErrorMessage('Unable to delete this user right now. Please try again.');
    } finally {
      setDeletingUserId(null);
    }
  }

  return (
    <section className="home-page">
      <div className="home-page__header">
        <div>
          <p className="home-page__eyebrow">Synlabs demo users</p>
          <h1>Manage Customer Profiles</h1>
          <p className="home-page__subtitle">
            A polished CRUD dashboard.
          </p>
        </div>
      </div>

      <SuccessMessage message={successMessage} />
      <SuccessMessage message={deleteSuccessMessage} />
      <ErrorMessage message={deleteErrorMessage} />

      {isLoading && <LoadingSpinner label="Loading users" />}

      {!isLoading && <ErrorMessage message={errorMessage} />}

      {!isLoading && !errorMessage && (
        <div className="user-grid">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isDeleting={String(deletingUserId) === String(user.id)}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
