import { createSlice } from '@reduxjs/toolkit'

export const AcademicYearSlice = createSlice({
    name: 'academicYear',
    initialState: {
        academicYear: '2021-22',
    },
    reducers: {
        setAcademicYear: function (state, action) {
            state.academicYear = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAcademicYear } = AcademicYearSlice.actions

export default AcademicYearSlice.reducer