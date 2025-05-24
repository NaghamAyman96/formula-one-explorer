import axios from 'axios';

const BASE_URL = 'https://ergast.com/api/f1';

export const getSeasons = (limit = 20, offset = 0) =>
    axios.get(`${BASE_URL}/seasons.json?limit=${limit}&offset=${offset}`);

export const getRaces = (season: string) =>
    axios.get(`${BASE_URL}/${season}/races.json`);

export const getRaceResults = (season: string, round: string) =>
    axios.get(`${BASE_URL}/${season}/${round}/results.json`);