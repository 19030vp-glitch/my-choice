import { createSlice } from '@reduxjs/toolkit'

export const NavbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        page: 'profile',
        reportLoading: false,
    },
    reducers: {
        setPage(state, action) {
            state.page = action.payload
        },
        setReportLoading(state, action) {
            state.reportLoading = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setPage, setReportLoading } = NavbarSlice.actions

export default NavbarSlice.reducer