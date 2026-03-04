import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import checkSchemaForDataValidity from '../../data-validity/js/checkSchemaForDataValidity'
import { Modal } from 'antd'
import AllValidComponent from '../../data-validity/components/AllValidComponent'
import toast from 'react-hot-toast'

const CheckFacultyDataValidity = ({ user }) => {

    const { data: validityData } = useQuery(`Data-Validity-Faculty-${user?._id}`, () => checkSchemaForDataValidity({ userId: user._id }), { refetchOnWindowFocus: false, staleTime: 5000 })

    const [open, setOpen] = useState(true)

    useEffect(() => {
        if (validityData?.data?.isValid) {
            setOpen(false)
        }
    }, [validityData?.data])

    const handleCancel = () => {
        if (!validityData?.data?.isValid) {
            toast.error('You will not be able to proceed further before checking your data validity')
        } else {
            setOpen(false)
        }
    }


    return (
        validityData?.data && <>
            {!validityData?.data?.isValid && <Modal
                title="Data Completion Check of Faculty Profile"
                open={open}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}
                onCancel={handleCancel}
            >
                <div>
                    <div className="mt-4">
                        <AllValidComponent isValid={validityData?.data?.isValid} size="w-full" />
                    </div>
                </div>
            </Modal>}
        </>
    )
}

export default CheckFacultyDataValidity

