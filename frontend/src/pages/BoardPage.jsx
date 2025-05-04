import { TodoList } from '../features/todos';
import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const BoardPage = ({ onToggleTheme, theme }) => (
  <div className="App-header">
    <Tooltip title={theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}>
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 16 }}
        onClick={onToggleTheme}
        color="inherit"
      >
        {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
    <TodoList />
  </div>
);

export default BoardPage;
