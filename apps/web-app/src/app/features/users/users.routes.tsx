import { Route, Routes } from 'react-router-dom';

import { UsersView, EditUserView, NewUserView } from './views';

export default function UsersRoutes() {
  return (
    <Routes>
      <Route path="" element={<UsersView />} />
      <Route path=":userId" element={<EditUserView />} />
      <Route path="/new" element={<NewUserView />} />
    </Routes>
  );
}
