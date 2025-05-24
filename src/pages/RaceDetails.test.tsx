import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RaceDetails from './RaceDetails';
import * as api from '../services/ergastApi';

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Polyfill ResizeObserver for Recharts
global.ResizeObserver = class {
    observe() { }
    unobserve() { }
    disconnect() { }
};

jest.mock('../services/ergastApi');

const mockData = {
    data: {
        MRData: {
            RaceTable: {
                Races: [
                    {
                        Results: [
                            {
                                position: '1',
                                Driver: { givenName: 'Max', familyName: 'Verstappen' },
                                Constructor: { name: 'Red Bull' },
                                Time: { time: '1:27:45' },
                                points: '25',
                            },
                            {
                                position: '2',
                                Driver: { givenName: 'Charles', familyName: 'Leclerc' },
                                Constructor: { name: 'Ferrari' },
                                Time: { time: '1:28:01' },
                                points: '18',
                            },
                        ],
                    },
                ],
            },
        },
    },
};

describe('RaceDetails', () => {
    it('renders race details and chart correctly', async () => {
        (api.getRaceResults as jest.Mock).mockResolvedValueOnce(mockData);

        render(
            <MemoryRouter initialEntries={["/seasons/2024/1"]}>
                <Routes>
                    <Route path="/seasons/:season/:round" element={<RaceDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Race Results - 2024 Round 1/i)).toBeTruthy();
            expect(screen.getByText(/Max Verstappen/i)).toBeTruthy();
            expect(screen.getByText(/Ferrari/i)).toBeTruthy();
        });
    });
});
