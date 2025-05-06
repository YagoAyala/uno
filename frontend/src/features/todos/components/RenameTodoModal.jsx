import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useUpdateTodo } from '../hooks';
import { useQuery } from '@apollo/client';
import {
  PRIORITIES_QUERY,
  LANES_TODOS_QUERY,
} from '../../../api/graphql/queries';
import { getOperationName } from '@apollo/client/utilities';

const RenameTodoModal = ({ open, onClose, todo }) => {
  const [name, setName] = useState(todo.name);
  const [priority, setPriority] = useState(todo.priority_id);
  const [updateTodo] = useUpdateTodo();

  const { data, loading } = useQuery(PRIORITIES_QUERY);
  const priorities = data?.priorities ?? [];

  useEffect(() => {
    setName(todo.name);
    setPriority(todo.priority_id);
  }, [todo]);

  const submit = async () => {
    await updateTodo({
      variables: { values: { id: todo.id, name, priority_id: priority } },
      awaitRefetchQueries: true,
      refetchQueries: [getOperationName(LANES_TODOS_QUERY)],
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
      >
        <TextField
          label="Name"
          variant="standard"
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <FormControl variant="standard" disabled={loading}>
          <InputLabel id="edit-priority-label">Priority</InputLabel>
          <Select
            labelId="edit-priority-label"
            value={priority}
            onChange={e => setPriority(e.target.value)}
            label="Priority"
          >
            {priorities.map(p => (
              <MenuItem key={p.id} value={p.id}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={submit} variant="contained" disabled={loading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameTodoModal;
