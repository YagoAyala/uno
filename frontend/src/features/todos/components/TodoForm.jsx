import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const TodoForm = ({ onSave }) => {
  const [taskName, setTaskName] = useState('');

  const submit = e => {
    e.preventDefault();
    if (!taskName.trim()) return;

    onSave(taskName.trim());
    setTaskName('');
  };

  return (
    <Box component="form" display="flex" gap={2} onSubmit={submit}>
      <TextField
        label="New task"
        variant="standard"
        fullWidth
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />
      <Button type="submit" variant="contained" color="success">
        Save
      </Button>
    </Box>
  );
};

export default TodoForm;
