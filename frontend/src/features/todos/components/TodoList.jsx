import { useState } from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { getOperationName } from '@apollo/client/utilities';

import { useAddTodo } from '../hooks';
import Toolbar from './Toolbar';
import TodoForm from './TodoForm';
import { Lanes } from '../../lanes';
import { LANES_TODOS_QUERY } from '../../../api/graphql/queries';

const TodoList = () => {
  const [search, setSearch] = useState('');
  const [addTodo] = useAddTodo();

  const saveTodo = async values => {
    const { name } = values;
    if (!name) {
      toast.info('Task name cannot be empty');
      return;
    }

    try {
      await addTodo({
        variables: { values },
        awaitRefetchQueries: true,
        refetchQueries: [getOperationName(LANES_TODOS_QUERY)],
      });
      toast.success('New task added');
    } catch (err) {
      toast.error(`Unable to add task. ${err.message}`);
    }
  };

  return (
    <Box width="100%" maxWidth={1024} mx="auto">
      <Card elevation={6}>
        <CardContent>
          <Typography variant="h4" textAlign="center" mb={2} fontWeight={700}>
            TODO LIST
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <Toolbar onApply={setSearch} />
            <TodoForm onSave={saveTodo} />
            <Lanes searchTerm={search} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TodoList;
