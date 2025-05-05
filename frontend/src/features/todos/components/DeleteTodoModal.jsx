import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import { getOperationName } from '@apollo/client/utilities';

import { useDeleteTodo } from '../hooks';
import { LANES_TODOS_QUERY } from '../../../api/graphql/queries';

const DeleteTodoModal = ({ open, onClose, todo }) => {
  const [deleteTodo] = useDeleteTodo();

  const handleDelete = async () => {
    if (!todo) {
      onClose();
      return;
    }

    try {
      await deleteTodo({
        variables: { id: todo.id },
        awaitRefetchQueries: true,
        refetchQueries: [getOperationName(LANES_TODOS_QUERY)],
      });

      toast.success('Task deleted');
    } catch (error) {
      toast.error(`Unable to delete task. ${error.message}`);
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="delete-task-title">
      <DialogTitle id="delete-task-title">
        Delete <strong>{todo?.name}</strong>?
      </DialogTitle>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTodoModal;
