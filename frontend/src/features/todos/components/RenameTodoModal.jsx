import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { getOperationName } from '@apollo/client/utilities';

import { useUpdateTodo } from '../hooks';
import { LANES_TODOS_QUERY } from '../../../api/graphql/queries';

const RenameTodoModal = ({ open, onClose, todo }) => {
  const [name, setName] = useState('');
  const [updateTodo] = useUpdateTodo();

  useEffect(() => {
    setName(todo?.name || '');
  }, [todo]);

  const handleSave = async () => {
    if (!name.trim() || !todo) {
      onClose();
      return;
    }

    const updatedTodo = { ...todo, name: name.trim() };
    delete updatedTodo.__typename;

    try {
      await updateTodo({
        variables: { values: updatedTodo },
        awaitRefetchQueries: true,
        refetchQueries: [getOperationName(LANES_TODOS_QUERY)],
      });

      toast.success('Task renamed');
    } catch (error) {
      toast.error(`Unable to edit task. ${error.message}`);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="rename-task-title">
      <DialogTitle id="rename-task-title">Rename task</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="Task name"
          variant="standard"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RenameTodoModal;
