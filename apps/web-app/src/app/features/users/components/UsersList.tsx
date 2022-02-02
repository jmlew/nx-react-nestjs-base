import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { User } from '@api-interfaces/features/models/user-api-data.model';
import { ButtonDefault, JsonViewer } from '../../../shared/components';
import { Folder, Edit } from '@mui/icons-material';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
} from '@mui/material';

interface UsersListProps {
  users: User[];
  onEditUser: (userId: number) => void;
}

interface UserItemProps {
  user: User;
  onEdit: () => void;
}

export function UsersList({ users, onEditUser }: UsersListProps) {
  function handleSelectUser(user: User) {
    onEditUser(user.id);
  }
  return (
    <List>
      {users.map((user: User) => (
        <UsersListItem key={user.id} user={user} onEdit={() => handleSelectUser(user)} />
      ))}
    </List>
  );
}

function UsersListItem({ user, onEdit }: UserItemProps) {
  return (
    <ListItem
      divider={false}
      secondaryAction={
        <IconButton edge="end" aria-label="edit" onClick={onEdit}>
          <Edit />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar src={user.avatar} />
      </ListItemAvatar>
      <ListItemText primary={user.first_name} secondary={user.last_name || null} />
    </ListItem>
  );
}
