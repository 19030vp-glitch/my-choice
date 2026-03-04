import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';


const tableHead = { index: "Sr. no.", SchoolName: 'School', Name_of_student_placed: "Name of student placed/started Business", Program_graduated_from: "Program graduated from", Name_of_the_employer: "Name of the employer/business", Employer_contact_details: "Employer/business contact details", Pay_package_annum: "Pay package ( ₹ / annum)", Academic_Year: "Year of Placement", Upload_Proof: "Upload Proof", }

function AlumniJobs({ id, setState, yearFilter, schoolName, Heading, setLoaded }) {

    const SendReq = "Placement";
    const module = 'Admin'

    let filter = yearFilter.length === 0 && schoolName === 'All Schools' ? {Type_Of_Placement: "Placement",AlumniId:{$exists:true ,$ne:"undefined"}} : yearFilter.length !== 0 && schoolName === 'All Schools' ? { Academic_Year: {$in:yearFilter}, Type_Of_Placement: "Placement",AlumniId:{$exists:true ,$ne:"undefined"} } : yearFilter.length === 0 && schoolName !== 'All Schools' ? { SchoolName: schoolName, Type_Of_Placement: "Placement",AlumniId:{$exists:true ,$ne:"undefined"} } : { Academic_Year: {$in:yearFilter}, SchoolName: schoolName, Type_Of_Placement: "Placement",AlumniId:{$exists:true ,$ne:"undefined"} }

    const params = { model: SendReq, id: '', module, filter, }

    const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => getReq(params))

    useEffect(() => {
        setState((pri) => {
            return {
                ...pri,
                [id]: data?.data
            }
        })
        if (!isLoading) {
            setLoaded((pre) => {return{...pre,[id]: true}});
          }
    }, [data && data])

    return (
        <AdminAcordinTable Heading={Heading} data={data?.data} SendReq={SendReq} proof='Upload_Proof' tableHead={tableHead} year='Academic_Year' module='director' isLoading={isLoading} />
    );
}

export default AlumniJobs;