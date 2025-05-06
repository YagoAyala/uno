import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useQuery } from '@apollo/client';
import { PRIORITIES_QUERY } from '../../../api/graphql/queries';

const TodoForm = ({ onSave }) => {
  const { data, loading } = useQuery(PRIORITIES_QUERY);
  const priorities = useMemo(() => data?.priorities ?? [], [data]);

  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState(1);

  useEffect(() => {
    if (priorities.length && !priority) {
      setPriority(priorities[0].id);
    }
  }, [priorities, priority]);

  const submit = e => {
    e.preventDefault();
    if (!taskName.trim()) return;

    onSave({ name: taskName.trim(), priority_id: priority });
    setTaskName('');
    if (priorities.length) setPriority(priorities[0].id);
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
      <FormControl
        variant="standard"
        sx={{ minWidth: 120 }}
        disabled={loading}
      >
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
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
      <Button type="submit" variant="contained" color="success">
        Save
      </Button>
    </Box>
  );
};

export default TodoForm;
