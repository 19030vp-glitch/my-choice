import { createSlice } from '@reduxjs/toolkit'

export const DirectorActiveSlice = createSlice({
    name: 'directorActive',
    initialState: {
        directorActive: 'SyllabusRevision',
        ssmActive: 'activeStudent',
    },
    reducers: {
        setDirectorActive(state, action) {
            state.directorActive = action.payload
        },
        setSsmActive(state, action) {
            state.ssmActive = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setDirectorActive, setSsmActive } = DirectorActiveSlice.actions

export default DirectorActiveSlice.reducer