import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import getAppRoutes from './routes.jsx';

function App() {
  // Keep the full list of users in one place so every page can share the same data.
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(false);

  function handleUsersLoaded(fetchedUsers) {
    setUsers((currentUsers) => {
      // Keep local create/edit changes when JSONPlaceholder returns the original users again.
      const currentUsersById = new Map(currentUsers.map((user) => [String(user.id), user]));
      const mergedFetchedUsers = fetchedUsers.map(
        (user) => currentUsersById.get(String(user.id)) || user,
      );
      const localUsers = currentUsers.filter(
        (user) => !fetchedUsers.some((fetchedUser) => String(fetchedUser.id) === String(user.id)),
      );

      return [...localUsers, ...mergedFetchedUsers];
    });
    setUsersLoaded(true);
  }

  function handleUserCreated(user) {
    // Add a newly created user to the top of the list so it appears immediately.
    setUsers((currentUsers) => [user, ...currentUsers]);
  }

  function handleUserUpdated(updatedUser) {
    setUsers((currentUsers) => {
      const userExists = currentUsers.some((user) => String(user.id) === String(updatedUser.id));

      if (!userExists) {
        return [updatedUser, ...currentUsers];
      }

      return currentUsers.map((user) =>
        String(user.id) === String(updatedUser.id) ? updatedUser : user,
      );
    });
  }

  function handleUserDeleted(userId) {
    // Remove the deleted user from the shared state so the list updates instantly.
    setUsers((currentUsers) =>
      currentUsers.filter((currentUser) => String(currentUser.id) !== String(userId)),
    );
  }

  return (
    <div className="app">
      <Navbar />
      <main className="page-shell">
        <Routes>
          {getAppRoutes({
            users,
            usersLoaded,
            onUsersLoaded: handleUsersLoaded,
            onUserCreated: handleUserCreated,
            onUserUpdated: handleUserUpdated,
            onUserDeleted: handleUserDeleted,
          }).map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
  );
}

export default App;
