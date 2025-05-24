import { Routes, Route, Navigate } from 'react-router-dom';
import SeasonList from './pages/SeasonList';
import RaceList from './pages/RaceList';
import RaceDetails from './pages/RaceDetails';
import { CssBaseline, Typography, AppBar, Toolbar } from '@mui/material';

const App = () => (
  <>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          🏁 Formula One Explorer
        </Typography>
      </Toolbar>
    </AppBar>
    <div style={{ width: '100vw', maxWidth: '100vw', padding: '2rem', overflowX: 'hidden' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/seasons" replace />} />
        <Route path="/seasons" element={<SeasonList />} />
        <Route path="/seasons/:season" element={<RaceList />} />
        <Route path="/seasons/:season/:round" element={<RaceDetails />} />
      </Routes>
    </div>
  </>
);

export default App;