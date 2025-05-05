import { useContext } from 'react';
import {
  Container,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { ColorModeContext } from '../contexts/ColorModeContext';
import { TodoList } from '../features/todos';

const BoardPage = () => {
  const { toggleColorMode } = useContext(ColorModeContext);
  const { palette } = useTheme();
  const isLight = palette.mode === 'light';

  return (
    <Container maxWidth="lg" sx={{ pt: 4, position: 'relative' }}>
      <Tooltip title={isLight ? 'Enable dark mode' : 'Enable light mode'}>
        <IconButton
          onClick={toggleColorMode}
          color="inherit"
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          {isLight ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>

      <TodoList />
    </Container>
  );
};

export default BoardPage;
