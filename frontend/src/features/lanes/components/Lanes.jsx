import { DragDropContext } from '@hello-pangea/dnd';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { LaneColumn } from '../../lanes';
import TodoItem from '../../todos/components/TodoItem';
import { useUpdateTodo } from '../../todos/hooks';
import { useLanesWithTodos } from '../hooks';

const Row = styled(Box)({
  display: 'flex',
  gap: 24,
  overflowX: 'auto',
  paddingBottom: 8,
});

const ScrollBox = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  maxHeight: '60vh',
  overflowY: 'auto',
}));

const Lanes = ({ searchTerm = '' }) => {
  const { data, loading, refetch } = useLanesWithTodos();
  const [updateTodo] = useUpdateTodo();

  if (loading) return null;

  const lanes = data?.lanesWithItem ?? [];
  const todos = lanes.flatMap(l => l.todos);
  const lowerSearch = searchTerm.toLowerCase();

  const onDragEnd = async result => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const destLaneId = Number(destination.droppableId);
    const todoId = Number(draggableId);
    const todoData = todos.find(t => t.id === todoId);
    if (!todoData) return;

    const updatedTodo = { ...todoData, lane_id: destLaneId };
    delete updatedTodo.__typename;

    await updateTodo({
      variables: { values: updatedTodo },
      awaitRefetchQueries: true,
    });

    refetch();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row>
        {lanes.map(lane => {
          const filtered = lane.todos.filter(t =>
            lowerSearch
              ? t.name.toLowerCase().includes(lowerSearch)
              : true,
          );

          return (
            <LaneColumn key={lane.id} lane={lane}>
              <ScrollBox aria-label={`${lane.name} tasks`}>
                {filtered.map((todo, idx) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    index={idx}
                    done={lane.is_done}
                    searchTerm={lowerSearch}
                  />
                ))}
              </ScrollBox>
            </LaneColumn>
          );
        })}
      </Row>
    </DragDropContext>
  );
};

export default Lanes;
