import { toast } from "react-hot-toast";

// Handle Avatar change
function handleAvatarChange(e, setAvatar, setFile, setOpen) {
    setAvatar(null)
    const file = e.target.files[0];
    setOpen(true)
if (e.target.files[0].size >= 10485760) {
    toast.error('Photo size should be less than 10 MB')
    setOpen(false)
    return
}
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
    setAvatar(reader.result)
    setFile(e.target.files[0])
}
}

export default handleAvatarChange