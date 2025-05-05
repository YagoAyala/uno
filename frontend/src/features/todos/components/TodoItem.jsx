import { useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Draggable } from '@hello-pangea/dnd';

import RenameTodoModal from './RenameTodoModal';
import DeleteTodoModal from './DeleteTodoModal';

const escapeRegExp = str =>
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlight = (text, term) => {
  if (!term) return text;
  const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span
        key={i}
        style={{
          backgroundColor: 'rgba(255,255,0,0.4)',
          paddingInline: 2,
          borderRadius: 2,
        }}
      >
        {part}
      </span>
    ) : (
      part
    ),
  );
};

const labels = {
  1: 'None',
  2: 'Low',
  3: 'Medium',
  4: 'High',
};

const colors = {
  1: '#9e9e9e',
  2: '#4caf50',
  3: '#ff9800',
  4: '#f44336',
};

const TodoItem = ({ todo, index, done, searchTerm }) => {
  const [openRename, setOpenRename] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <Draggable draggableId={String(todo.id)} index={index}>
        {provided => (
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            disablePadding
            sx={{
              mb: 1,
              opacity: done ? 0.5 : 1,
              textDecoration: done ? 'line-through' : 'none',
              bgcolor: 'background.paper',
              borderRadius: 1,
              transition: 'background 0.2s ease',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemButton
              dense
              sx={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 1.5,
              }}
            >
              <ListItemText
                primary={highlight(todo.name, searchTerm)}
                sx={{ flexGrow: 1 }}
              />
              <Chip
                label={labels[todo.priority_id] ?? 'None'}
                size="small"
                sx={{
                  bgcolor: colors[todo.priority_id] ?? '#9e9e9e',
                  color: '#fff',
                }}
              />
              <Edit
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpenRename(true)}
                fontSize="small"
              />
              <Delete
                sx={{ cursor: 'pointer' }}
                onClick={() => setOpenDelete(true)}
                fontSize="small"
              />
            </ListItemButton>
          </ListItem>
        )}
      </Draggable>

      <RenameTodoModal
        open={openRename}
        onClose={() => setOpenRename(false)}
        todo={todo}
      />
      <DeleteTodoModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        todo={todo}
      />
    </>
  );
};

export default TodoItem;
