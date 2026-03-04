import { createSlice } from '@reduxjs/toolkit'

export const NIRFSlice = createSlice({
    name: 'nirf',
    initialState: {
        nirfPrograms: null,
    },
    reducers: {
        setNIRFPrograms: (state, action) => {
            state.nirfPrograms = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setNIRFPrograms } = NIRFSlice.actions

export default NIRFSlice.reducer