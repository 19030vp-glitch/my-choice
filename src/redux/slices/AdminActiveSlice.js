import { createSlice } from '@reduxjs/toolkit'

export const AdminActiveSlice = createSlice({
    name: 'adminActive',
    initialState: {
        adminActive: 'Dashboard',
    },
    reducers: {
        setAdminActive(state, action) {
            state.adminActive = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAdminActive } = AdminActiveSlice.actions

export default AdminActiveSlice.reducer