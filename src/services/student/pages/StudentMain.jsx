import React from 'react'
import { useSelector } from "react-redux";

const StudentMain = () => {
  const alumniActive = useSelector(state => state.alumniActive.alumniActive)
  return (
    <>
    student main
   </>
  )
}
export default StudentMain