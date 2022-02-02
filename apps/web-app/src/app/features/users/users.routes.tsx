import { Route, Routes } from 'react-router-dom';

import { UsersView, UserView } from './views';

export default function UsersRoutes() {
  return (
    <Routes>
      <Route path="" element={<UsersView />} />
      <Route path=":userId" element={<UserView />} />
    </Routes>
  );
}
