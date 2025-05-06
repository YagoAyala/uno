import { Droppable } from '@hello-pangea/dnd';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Column = styled(Paper)(({ theme }) => ({
  width: 300,
  padding: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  background: theme.palette.background.paper,
  overflow: 'visible',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
}));

const LaneColumn = ({ lane, children }) => (
  <Droppable droppableId={String(lane.id)}>
    {provided => (
      <Column ref={provided.innerRef} {...provided.droppableProps} elevation={3}>
        <Typography variant="subtitle1" fontWeight={600}>
          {lane.name}
        </Typography>
        {children}
        {provided.placeholder}
      </Column>
    )}
  </Droppable>
);

export default LaneColumn;
