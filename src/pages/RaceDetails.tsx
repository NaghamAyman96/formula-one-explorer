import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRaceResults } from '../services/ergastApi';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const RaceDetails = () => {
    const { season, round } = useParams<{ season: string; round: string }>();
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        if (!season || !round) return;
        getRaceResults(season, round)
            .then(res => {
                const raceResults = res.data.MRData.RaceTable.Races[0]?.Results || [];
                setResults(raceResults);
            })
            .catch(console.error);
    }, [season, round]);

    const chartData = results.map(result => ({
        name: `${result.Driver.givenName} ${result.Driver.familyName}`,
        points: parseFloat(result.points),
    }));

    return (
        <Box sx={{ width: '100vw', px: 2 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                🏁 Race Results - {season} Round {round}
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 3, width: '100%', overflowX: 'auto' }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Position</TableCell>
                            <TableCell>Driver</TableCell>
                            <TableCell>Constructor</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((result, index) => (
                            <TableRow key={index}>
                                <TableCell>{result.position}</TableCell>
                                <TableCell>
                                    {result.Driver.givenName} {result.Driver.familyName}
                                </TableCell>
                                <TableCell>{result.Constructor.name}</TableCell>
                                <TableCell>{result.Time?.time || 'N/A'}</TableCell>
                                <TableCell>{result.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ width: '100%', height: Math.max(300, chartData.length * 40), mt: 5 }}>
                <Typography variant="h5" fontWeight="medium" gutterBottom>
                    📊 Points Distribution
                </Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 20, bottom: 20, left: 60 }}>
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={200} interval={0} tick={{ fontSize: 14 }} />
                        <Tooltip />
                        <Bar dataKey="points" fill="#1976d2" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default RaceDetails;