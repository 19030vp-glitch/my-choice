import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        adminUser: null,
        directorUser: null,
        alumniUser: null,
        studentUser: null,
        proUser: null,
        youthUser: null,
        dsdUser: null,
        krcUser: null,
        sportsUser: null,
        nssUser: null,
        examUser: null,
        placementUser: null,
        iilUser: null,
        skillUser: null,
        pgUser: null,
        apdsUser: null,
        swayamUser: null,
        esttUser: null,
        ushaUser: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setAdminUser(state, action) {
            state.adminUser = action.payload
        },
        setDirectorUser(state, action) {
            state.directorUser = action.payload
        },
        setAlumniUser(state, action) {
            state.alumniUser = action.payload
        },
        setStudentUser(state, action) {
            state.studentUser = action.payload
        },
        setProUser(state, action) {
            state.proUser = action.payload
        },
        setYouthUser(state, action) {
            state.youthUser = action.payload
        },
        setDSDUser(state, action) {
            state.dsdUser = action.payload
        },
        setKRCUser(state, action) {
            state.krcUser = action.payload
        },
        setSportsUser(state, action) {
            state.sportsUser = action.payload
        },
        setNSSUser(state, action) {
            state.nssUser = action.payload
        },
        setExamUser(state, action) {
            state.examUser = action.payload
        },
        setPlacementUser(state, action) {
            state.placementUser = action.payload
        },
        setIILUser(state, action) {
            state.iilUser = action.payload
        },
        setSkillUser(state, action) {
            state.skillUser = action.payload
        },
        setPGUser(state, action) {
            state.pgUser = action.payload
        },
        setAPDSUser(state, action) {
            state.apdsUser = action.payload
        },
        setSwayamUser(state, action) {
            state.swayamUser = action.payload
        },
        setESTTUser(state, action) {
            state.esttUser = action.payload
        },
        setUSHAUser(state, action) {
            state.ushaUser = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setUser, setAdminUser, setDirectorUser, setAlumniUser, setStudentUser, setProUser, setYouthUser, setDSDUser, setKRCUser, setSportsUser, setNSSUser, setExamUser, setPlacementUser, setIILUser, setSkillUser, setPGUser, setAPDSUser, setSwayamUser, setESTTUser, setUSHAUser } = UserSlice.actions

export default UserSlice.reducer
