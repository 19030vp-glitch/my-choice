import { createSlice } from '@reduxjs/toolkit'

export const AuditSlice = createSlice({
    name: 'academicAudit',
    initialState: {
        auditYear: null,
        auditData: null,
    },
    reducers: {
        setAuditData(state, action) {
            state.auditData = action.payload
        },
        setAuditYear: (state, action) => {
            state.auditYear = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setAuditData, setAuditYear } = AuditSlice.actions

export default AuditSlice.reducer