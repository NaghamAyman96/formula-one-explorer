import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PinnedState {
    races: string[]; // store as raceId "season-round"
}

const initialState: PinnedState = {
    races: JSON.parse(localStorage.getItem('pinnedRaces') || '[]'),
};

const pinnedSlice = createSlice({
    name: 'pinned',
    initialState,
    reducers: {
        toggleRace(state, action: PayloadAction<string>) {
            if (state.races.includes(action.payload)) {
                state.races = state.races.filter((id) => id !== action.payload);
            } else {
                state.races.push(action.payload);
            }
            localStorage.setItem('pinnedRaces', JSON.stringify(state.races));
        },
    },
});

export const { toggleRace } = pinnedSlice.actions;
export default pinnedSlice.reducer;
