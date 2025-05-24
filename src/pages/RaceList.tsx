import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRaces } from '../services/ergastApi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRace } from '../store/pinnedSlice';
import type { RootState } from '../store';
import {
    Box,
    Grid,
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
} from '@mui/material';

const RaceList = () => {
    const { season } = useParams<{ season: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pinned = useSelector((state: RootState) => state.pinned.races);
    const [races, setRaces] = useState<any[]>([]);

    useEffect(() => {
        if (!season) return;
        getRaces(season)
            .then(res => {
                const data = res.data.MRData.RaceTable.Races;
                const sorted = [...data].sort((a, b) => {
                    const idA = `${a.season}-${a.round}`;
                    const idB = `${b.season}-${b.round}`;
                    const pinnedA = pinned.includes(idA) ? 1 : 0;
                    const pinnedB = pinned.includes(idB) ? 1 : 0;

                    if (pinnedB !== pinnedA) {
                        return pinnedB - pinnedA; // pinned first
                    }

                    // fallback to chronological order
                    return Number(a.round) - Number(b.round);
                });
                setRaces(sorted);
            })
            .catch(console.error);
    }, [season, pinned]);

    const handlePin = (id: string) => {
        dispatch(toggleRace(id));
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                📅 Races in {season}
            </Typography>
            <Grid container spacing={3}>
                {races.map(race => {
                    const id = `${race.season}-${race.round}`;
                    return (
                        <Grid key={id} size={{ xs: 6, sm: 6, md: 4 }} component="div">
                            <Card elevation={3}>
                                <CardContent>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        {race.raceName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {race.Circuit.circuitName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(race.date).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric',
                                        })}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color={pinned.includes(id) ? 'warning' : 'primary'}
                                        onClick={() => handlePin(id)}
                                    >
                                        {pinned.includes(id) ? 'Unpin' : 'Pin'}
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate(`/seasons/${season}/${race.round}`)}
                                    >
                                        Details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default RaceList;