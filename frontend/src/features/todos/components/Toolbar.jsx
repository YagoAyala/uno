import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useDebounce from '../../../hooks/useDebounce';

const Toolbar = ({ onApply }) => {
  const [text, setText] = useState('');
  const debounced = useDebounce(text, 400);

  useEffect(() => {
    onApply(debounced);
  }, [debounced, onApply]);

  return (
    <Box display="flex" gap={2} flexWrap="wrap" width="100%">
      <TextField
        variant="outlined"
        placeholder="Search tasks..."
        fullWidth
        value={text}
        onChange={e => setText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: text && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear filter"
                size="small"
                edge="end"
                onClick={() => setText('')}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Toolbar;
