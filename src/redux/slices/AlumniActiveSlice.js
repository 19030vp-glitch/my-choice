import { createSlice } from '@reduxjs/toolkit'

export const AlumniActiveSlice = createSlice({
    name: 'alumniActive',
    initialState: {
        alumniActive: 'alumniContribution',
    },
    reducers: {
        setAlumniActive(state, action) {
            state.alumniActive = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAlumniActive } = AlumniActiveSlice.actions

export default AlumniActiveSlice.reducer