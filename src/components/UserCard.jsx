import { Link } from 'react-router-dom';
import './UserCard.css';

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function UserCard({ user, isDeleting = false, onDelete }) {
  return (
    <article className="user-card">
      <div className="user-card__avatar" aria-hidden="true">
        {getInitials(user.name)}
      </div>
      <div className="user-card__content">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>

      <div className="user-card__actions">
        <Link className="button button--secondary" to={`/user/${user.id}`}>
          View
        </Link>
        <Link className="button button--secondary" to={`/edit/${user.id}`}>
          Edit
        </Link>
        <button
          className="button button--danger"
          type="button"
          disabled={isDeleting}
          onClick={() => onDelete?.(user)}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </article>
  );
}

export default UserCard;
