import { Route, Routes } from 'react-router-dom';

import { CreateUserView, UpdateUserView, UsersView } from './views';

export function UsersRoutes() {
  return (
    <Routes>
      <Route path="" element={<UsersView />} />
      <Route path=":userId" element={<UpdateUserView />} />
      <Route path="/new" element={<CreateUserView />} />
    </Routes>
  );
}
