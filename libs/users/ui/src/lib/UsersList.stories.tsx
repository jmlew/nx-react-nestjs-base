import { User } from '@example-app/users/domain';
import { Meta, Story } from '@storybook/react';

import { UsersList, UsersListProps } from '.';

const sampleUsers: User[] = [
  {
    id: 1,
    firstName: 'Jason',
    lastName: 'Lewis',
    email: 'jason@localhost.com',
  },
  {
    id: 2,
    firstName: 'System',
    lastName: 'Infra',
    email: 'system@localhost.com',
  },
  {
    id: 3,
    firstName: 'Administrator',
    lastName: 'Main',
    email: 'admin@localhost.com',
  },
];

export default {
  title: 'Users/UsersList',
  component: UsersList,
  argTypes: {
    onEditUser: { action: 'onEditUser' },
    onDeleteUser: { action: 'onDeleteUser' },
  },
} as Meta;

const Template: Story<UsersListProps> = (args) => <UsersList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  users: sampleUsers,
};
