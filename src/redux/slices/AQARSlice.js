import { createSlice } from '@reduxjs/toolkit'

export const AQARSlice = createSlice({
    name: 'aqar',
    initialState: {
        aqarYear: null,
    },
    reducers: {
        setAqarYear: (state, action) => {
            state.aqarYear = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setAqarYear } = AQARSlice.actions

export default AQARSlice.reducer