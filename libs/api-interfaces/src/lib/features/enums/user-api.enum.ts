export enum UserApiUri {
  // Sample API which is used in this app.
  Base = 'https://reqres.in/api/',
  // Mock API is being redirected to the target defined in proxy.conf.json
  MockBase = 'api/',
  // API endpoints
  Users = 'users',
}

export enum UserApiParam {
  Page = 'page',
}

export enum UserParam {
  Email = 'email',
  FirstName = 'first_name',
  LastName = 'last_name',
  Avatar = 'avatar',
}

export enum UserRegisterParam {
  Password = 'password',
  PasswordConfirm = 'password_confirm',
}
