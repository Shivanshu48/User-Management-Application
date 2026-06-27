import './SuccessMessage.css';

function SuccessMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p className="success-message" role="status">
      {message}
    </p>
  );
}

export default SuccessMessage;
