import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const AdminAQAR = () => {

    const navigate = useNavigate()

    return <div className="min-h-screen border mt-2">
        <div className="flex justify-center mt-5">
            <Button variant="contained" onClick={() => navigate('/admin/aqar')} >GO to Admin AQAR</Button>
        </div>
    </div>

}

export default AdminAQAR
