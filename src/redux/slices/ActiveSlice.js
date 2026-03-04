import { createSlice } from '@reduxjs/toolkit'

export const ActiveSlice = createSlice({
    name: 'active',
    initialState: {
        active: 'profile',
    },
    reducers: {
        setActive(state, action) {
            state.active = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setActive } = ActiveSlice.actions

export default ActiveSlice.reducer