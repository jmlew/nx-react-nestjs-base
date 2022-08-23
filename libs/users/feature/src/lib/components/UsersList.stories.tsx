import { User } from '@example-app/users/domain';
import { Meta, Story } from '@storybook/react';

import { UsersList, UsersListProps } from '.';

export default {
  title: 'Users/UsersList',
  component: UsersList,
  argTypes: {
    onEditUser: { action: 'onEditUser' },
    onDeleteUser: { action: 'onDeleteUser' },
  },
} as Meta;

const Template: Story<UsersListProps> = (args) => <UsersList {...args} />;

const sampleUsers: User[] = [
  {
    id: 1,
    first_name: 'Jason',
    last_name: 'Lewis',
    email: 'jason@localhost.com',
  },
  {
    id: 2,
    first_name: 'System',
    last_name: 'Infra',
    email: 'system@localhost.com',
  },
  {
    id: 3,
    first_name: 'Administrator',
    last_name: 'Main',
    email: 'admin@localhost.com',
  },
];

export const Primary = Template.bind({});
Primary.args = {
  users: sampleUsers,
};
