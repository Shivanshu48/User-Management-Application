import Home from './pages/Home.jsx';
import UserDetails from './pages/UserDetails.jsx';
import CreateUser from './pages/CreateUser.jsx';
import EditUser from './pages/EditUser.jsx';

function getAppRoutes({
  users,
  usersLoaded,
  onUsersLoaded,
  onUserCreated,
  onUserUpdated,
  onUserDeleted,
}) {
  // This central route list keeps the app navigation easy to read and maintain.
  return [
    {
      path: '/',
      element: (
        <Home
          users={users}
          usersLoaded={usersLoaded}
          onUsersLoaded={onUsersLoaded}
          onUserDeleted={onUserDeleted}
        />
      ),
    },
    {
      path: '/user/:id',
      element: <UserDetails />,
    },
    {
      path: '/create',
      element: <CreateUser onUserCreated={onUserCreated} />,
    },
    {
      path: '/edit/:id',
      element: <EditUser users={users} onUserUpdated={onUserUpdated} />,
    },
  ];
}

export default getAppRoutes;
