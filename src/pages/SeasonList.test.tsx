import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SeasonList from './SeasonList';
import * as api from '../services/ergastApi';

jest.mock('../services/ergastApi');

const mockSeasons = {
    data: {
        MRData: {
            SeasonTable: {
                Seasons: Array.from({ length: 5 }, (_, i) => ({ season: `${2020 + i}` }))
            },
        },
    },
};

describe('SeasonList', () => {
    it('renders seasons and handles pagination', async () => {
        (api.getSeasons as jest.Mock).mockResolvedValue(mockSeasons);

        render(
            <MemoryRouter>
                <SeasonList />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/2020/)).toBeInTheDocument();
        });

        const nextButton = screen.getByRole('button', { name: /Next/i });
        expect(nextButton).toBeEnabled();
        fireEvent.click(nextButton);
    });
});
