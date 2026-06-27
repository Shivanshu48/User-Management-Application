import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { getUser } from '../services/api.js';
import './UserDetails.css';

function formatAddress(address) {
  if (!address) {
    return 'Not available';
  }

  return [address.suite, address.street, address.city, address.zipcode].filter(Boolean).join(', ');
}

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUser() {
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
  }, [id]);

  return (
    <section className="user-details-page">
      <div className="details-header">
        <div>
          <h1>User Details</h1>
          {user && <p>{user.name}</p>}
        </div>
        <Link className="details-header__link" to="/">
          Back to Users
        </Link>
      </div>

      {isLoading && <LoadingSpinner label="Loading user details" />}

      {!isLoading && <ErrorMessage message={errorMessage} />}

      {!isLoading && !errorMessage && user && (
        <article className="details-card">
          <div className="details-card__section">
            <h2>Profile</h2>
            <dl className="details-list">
              <div>
                <dt>Name</dt>
                <dd>{user.name}</dd>
              </div>
              <div>
                <dt>Username</dt>
                <dd>{user.username}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{user.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{user.phone}</dd>
              </div>
              <div>
                <dt>Website</dt>
                <dd>{user.website}</dd>
              </div>
            </dl>
          </div>

          <div className="details-card__section">
            <h2>Company</h2>
            <p>{user.company?.name || 'Not available'}</p>
            {user.company?.catchPhrase && <p>{user.company.catchPhrase}</p>}
          </div>

          <div className="details-card__section">
            <h2>Address</h2>
            <p>{formatAddress(user.address)}</p>
          </div>
        </article>
      )}
    </section>
  );
}

export default UserDetails;
