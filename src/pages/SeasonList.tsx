import { useEffect, useState } from 'react';
import { getSeasons } from '../services/ergastApi';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

const SeasonList = () => {
    const [seasons, setSeasons] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const limit = 20;
    const navigate = useNavigate();

    useEffect(() => {
        getSeasons(limit, page * limit)
            .then(res => {
                const data = res.data.MRData.SeasonTable.Seasons.map((s: any) => s.season);
                setSeasons(data);
            })
            .catch(console.error);
    }, [page]);

    return (
        <Box textAlign="center">
            <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                🏆 Choose a Season
            </Typography>
            <Grid container spacing={3} justifyContent="center">
                {seasons.map(season => (
                    <Grid key={season} size={{ xs: 6, sm: 4, md: 3, lg: 2 }} component="div">
                        <Paper elevation={3}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => navigate(`/seasons/${season}`)}
                                sx={{
                                    padding: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                }}
                            >
                                {season}
                            </Button>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 5 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setPage(p => Math.max(p - 1, 0))}
                    disabled={page === 0}
                >
                    ← Previous
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setPage(p => p + 1)}
                >
                    Next →
                </Button>
            </Stack>
        </Box>
    );
};

export default SeasonList;