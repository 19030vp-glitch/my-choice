import { configureStore } from '@reduxjs/toolkit'
import { NavbarSlice } from './slices/NavbarSlice'
import { ModalSlice } from './slices/ModalSlice'
import { UserSlice } from './slices/UserSlice'
import { ActiveSlice } from './slices/ActiveSlice'
import { AcademicYearSlice } from './slices/AcademicYearSlice'
import { CASSlice } from './slices/CASSlice'
import { AuditSlice } from './slices/AuditSlice'
import { DirectorActiveSlice } from './slices/DirectorActiveSlice'
import { AlumniActiveSlice } from './slices/AlumniActiveSlice'
import { AdminActiveSlice } from './slices/AdminActiveSlice'
import { AQARSlice } from './slices/AQARSlice'
import { NIRFSlice } from './slices/NIRFSlice'

export default configureStore({
    reducer: {
        navbar: NavbarSlice.reducer,
        modal: ModalSlice.reducer,
        user: UserSlice.reducer,
        active: ActiveSlice.reducer,
        academicYear: AcademicYearSlice.reducer,
        cas: CASSlice.reducer,
        aqar: AQARSlice.reducer,
        academicAudit: AuditSlice.reducer,
        directorActive: DirectorActiveSlice.reducer,
        alumniActive: AlumniActiveSlice.reducer,
        adminActive: AdminActiveSlice.reducer,
        nirf: NIRFSlice.reducer,
    },
})
