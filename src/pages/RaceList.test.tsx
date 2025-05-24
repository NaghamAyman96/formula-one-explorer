import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RaceList from './RaceList';
import * as api from '../services/ergastApi';
import store from '../store';

jest.mock('../services/ergastApi');

const mockRaces = {
    data: {
        MRData: {
            RaceTable: {
                Races: [
                    {
                        raceName: 'Australian Grand Prix',
                        season: '2024',
                        round: '1',
                        Circuit: { circuitName: 'Albert Park' },
                        date: '2024-03-17',
                    },
                    {
                        raceName: 'Bahrain Grand Prix',
                        season: '2024',
                        round: '2',
                        Circuit: { circuitName: 'Bahrain International Circuit' },
                        date: '2024-03-24',
                    },
                ],
            },
        },
    },
};

describe('RaceList', () => {
    it('renders race cards and handles pinning', async () => {
        (api.getRaces as jest.Mock).mockImplementation(() => Promise.resolve(mockRaces));

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/seasons/2024"]}>
                    <Routes>
                        <Route path="/seasons/:season" element={<RaceList />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/Australian Grand Prix/i)).toBeInTheDocument();
            expect(screen.getByText(/Bahrain Grand Prix/i)).toBeInTheDocument();
        });

        const pinButtons = screen.getAllByRole('button', { name: /Pin/i });
        fireEvent.click(pinButtons[0]);

        expect(await screen.findByRole('button', { name: /Unpin/i })).toBeInTheDocument();
    });
});