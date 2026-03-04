import { createSlice } from '@reduxjs/toolkit'

export const CASSlice = createSlice({
    name: 'cas',
    initialState: {
        casYear: null,
        teachingData: null,
        academicData: null,
        otherInfo: null,
        fetchYears: null,
    },
    reducers: {
        setTeachingTable(state, action) {
            state.teachingData = action.payload
        },
        setAcademicTable: (state, action) => {
            state.academicData = action.payload
        },
        setOtherInfoTable: (state, action) => {
            state.otherInfo = action.payload
        },
        setCasYear: (state, action) => {
            state.casYear = action.payload
        },
        setFetchYears: (state, action) => {
            state.fetchYears = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setTeachingTable, setAcademicTable, setOtherInfoTable, setCasYear, setFetchYears } = CASSlice.actions

export default CASSlice.reducer