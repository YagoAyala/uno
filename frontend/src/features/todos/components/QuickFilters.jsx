import { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, IconButton, Popover } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useQuery } from '@apollo/client';
import { PRIORITIES_QUERY } from '../../../api/graphql/queries';

const QuickFilters = ({ onApply }) => {
  const { data } = useQuery(PRIORITIES_QUERY);
  const priorities = data?.priorities ?? [];

  const [priority, setPriority] = useState('all');
  const [done, setDone] = useState('all');
  const [sort, setSort] = useState('none');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => onApply({ priority, done, sort }), [priority, done, sort, onApply]);

  const open = Boolean(anchorEl);
  const toggle = e => setAnchorEl(open ? null : e.currentTarget);

  return (
    <>
      <IconButton size="small" onClick={toggle}>
        <FilterListIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box p={2} display="flex" flexDirection="column" gap={2} minWidth={200}>
          <FormControl variant="standard">
            <InputLabel id="priority-filter-label">Priority</InputLabel>
            <Select
              labelId="priority-filter-label"
              value={priority}
              onChange={e => setPriority(e.target.value)}
              label="Priority"
            >
              <MenuItem value="all">All</MenuItem>
              {priorities.map(p => (
                <MenuItem key={p.id} value={String(p.id)}>
                  {p.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard">
            <InputLabel id="done-filter-label">Status</InputLabel>
            <Select
              labelId="done-filter-label"
              value={done}
              onChange={e => setDone(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="not_done">Not done</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard">
            <InputLabel id="sort-filter-label">Sort</InputLabel>
            <Select
              labelId="sort-filter-label"
              value={sort}
              onChange={e => setSort(e.target.value)}
              label="Sort"
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="priority_asc">Priority Low → High</MenuItem>
              <MenuItem value="priority_desc">Priority High → Low</MenuItem>
              <MenuItem value="name_asc">Name A → Z</MenuItem>
              <MenuItem value="name_desc">Name Z → A</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Popover>
    </>
  );
};

export default QuickFilters;
