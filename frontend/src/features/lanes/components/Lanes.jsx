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

const Lanes = ({ searchTerm = '', filters = {} }) => {
  const { data, loading, refetch } = useLanesWithTodos();
  const [updateTodo] = useUpdateTodo();

  if (loading) return null;

  let lanes = data?.lanesWithItem ?? [];
  if (filters.done === 'done') lanes = lanes.filter(l => l.is_done);
  if (filters.done === 'not_done') lanes = lanes.filter(l => !l.is_done);

  const lowerSearch = searchTerm.toLowerCase();

  const onDragEnd = async result => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const destLaneId = Number(destination.droppableId);
    const todoId = Number(draggableId);
    const todoData = lanes.flatMap(l => l.todos).find(t => t.id === todoId);
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
          let list = lane.todos;
          if (filters.priority && filters.priority !== 'all') {
            const pid = Number(filters.priority);
            list = list.filter(t => t.priority_id === pid);
          }
          list = list.filter(t => (lowerSearch ? t.name.toLowerCase().includes(lowerSearch) : true));

          switch (filters.sort) {
            case 'priority_asc':
              list = list.slice().sort((a, b) => a.priority_id - b.priority_id);
              break;
            case 'priority_desc':
              list = list.slice().sort((a, b) => b.priority_id - a.priority_id);
              break;
            case 'name_asc':
              list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'name_desc':
              list = list.slice().sort((a, b) => b.name.localeCompare(a.name));
              break;
            default:
              break;
          }

          return (
            <LaneColumn key={lane.id} lane={lane}>
              <ScrollBox aria-label={`${lane.name} tasks`}>
                {list.map((todo, idx) => (
                  <TodoItem key={todo.id} todo={todo} index={idx} done={lane.is_done} searchTerm={lowerSearch} />
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
