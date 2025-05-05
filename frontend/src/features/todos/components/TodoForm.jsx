import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const priorities = [
  { id: 1, label: 'Without priority' },
  { id: 2, label: 'Low' },
  { id: 3, label: 'Medium' },
  { id: 4, label: 'High' },
];

const TodoForm = ({ onSave }) => {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(1);

  const submit = e => {
    e.preventDefault();
    if (!taskName.trim()) return;

    onSave({ name: taskName.trim(), priority_id: priority });
    setTaskName('');
    setPriority(1);
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
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          value={priority}
          onChange={e => setPriority(e.target.value)}
          label="Priority"
        >
          {priorities.map(p => (
            <MenuItem key={p.id} value={p.id}>
              {p.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="success">
        Save
      </Button>
    </Box>
  );
};

export default TodoForm;
