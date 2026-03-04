import { createSlice } from '@reduxjs/toolkit'

export const ModalSlice = createSlice({
    name: 'modal',
    initialState: {
        editModal: false,
        deleteModal: false,
        addQualificationModal: false,
        profile: false,
        degreeModal: false,
    },
    reducers: {
        setEditModal(state, action) {
            state.editModal = action.payload
        },
        setDeleteModal(state, action) {
            state.deleteModal = action.payload
        },
        setAddQualificationModal(state, action) {
            state.addQualificationModal = action.payload
        },
        setProfile(state, action) {
            state.profile = action.payload
        },
        setDegreeModal(state, action) {
            state.degreeModal = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setEditModal, setDeleteModal, setAddQualificationModal, setProfile, setDegreeModal } = ModalSlice.actions

export default ModalSlice.reducer