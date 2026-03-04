import React, { useEffect, useState } from 'react'
import programsByNIRF from '../js/programsByNIRF';
import { useQuery } from 'react-query';
import getReq from '../../../../../components/requestComponents/getReq';
import { Text } from './PlacemntAndHEForPriv3Year';
import useNIRFGetProgram from '../../../../../hooks/director-hooks/useNIRFGetProgram';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserLoading from '../../../../../pages/UserLoading';
import ArrowButton from '../../../../../components/ArrowButton';
import Note from '../../academic-audit/components/Note';
import { submitStrength } from '../js/utility';
import { NotAvailableComponentNIRF } from './StudentIntake';

const tableHead = { males: "No. of Male Students", females: "No. of Female Students", total: "Total Students", outSideState: "Outside State (Including male & female)", outSideCountry: "Outside Country (Including male & female)", economicallyBackward: "Economically Backward (Including male & female)", sociallyChallenged: "Socially Challenged (SC+ST+OBC Including male & female)", fullFeeGovernment: "No. of students receiving full tuition fee reimbursement from the State and Central Government", fullFeeInstitution: "No. of students receiving full tuition fee reimbursement from Institution Funds", fullFeePrivateBodies: "No. of students receiving full tuition fee reimbursement from the Private Bodies", notReceivingfullFee: "No. of students who are not receiving full tuition fee reimbursement" }

const TotalAnnualStudentStrength = ({ admin = false, }) => {

  let model = "TotalAnnualStudentStrength";
  let module = "nirf";
  const user = useSelector((state) => state.user?.directorUser)
  const [programTypes, setProgramTypes] = useState([])
  let school = user?.department
  const { academicYear } = useParams()

  const { programs, isLoading: isProgramLoading } = useNIRFGetProgram(user, academicYear, !admin)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  useEffect(() => {
    setProgramTypes(programs || [])
  }, [programs])



  let filter = { academicYear, school }
  const params = { model, module, filter }
  const { data, isLoading, refetch } = useQuery([model, params], () => getReq(params), { refetchOnWindowFocus: false })


  let initialstate = { academicYear, school };
  programTypes.forEach((e) => {
    initialstate[e] = {
      males: null, females: null, total: null, outSideState: null, outSideCountry: null, economicallyBackward: null, sociallyChallenged: null, fullFeeGovernment: null, fullFeeInstitution: null, fullFeePrivateBodies: null, notReceivingfullFee: null
    }
  })

  const [values, setValues] = useState(initialstate)

  useEffect(() => {
    if (data?.data?.[0]) {
      const firstItem = data.data[0];
      Object.keys(firstItem).forEach((key) => {
        setValues((prev) => ({
          ...prev, [key]: firstItem[key]
        }))
      });
    }
  }, [data]);

  const submit = () => {
    submitStrength(values, refetch, module, model, setIsSubmitLoading)
  }

  return (
    isLoading ? <div className='w-full flex justify-center my-5'><UserLoading title="Loading contents" /></div> :


      programTypes?.length > 0 ?

        <div className='mt-2'>
          <Note classes="bg-yellow-100 text-yellow-700 rounded-t-md p-2 mt-2" title={`1. Include all programs of all years in the academic year ${academicYear}.`} />
          <Note classes="bg-yellow-100 text-yellow-700 rounded-b-md p-2" title="2. Students counted under socially challenged shall not be counted in economically backward and vice versa." />
          <Note classes="bg-yellow-100 text-yellow-700 rounded-b-md p-2" title="3. Students whose parental income is less than taxable slab shall be considered under economically backward." />
          <Note classes="bg-yellow-100 text-yellow-700 rounded-b-md p-2" title="4. The students receiving full tuition fee reimbursement shall only be entered. Students receiving partial tuition fee reimbursements andscholarships shall not be entered." />
          <Note classes="bg-yellow-100 text-yellow-700 rounded-b-md p-2 mb-2" title="5. Sum of Students Receiving full tuition fee reimbursement from the State & Central Government, Institution Fund, Private Bodies and No. ofStudents who are not receiving full tuition fee reimbursement should be less than or equal to sum of Economically Backward and SociallyChallenged students" />


          <div className="table-responsive mx-1">
            <table className='mt-5 table table-bordered'>
              <thead className='bg-primary text-light'>
                <tr><th></th>{Object.keys(tableHead).map((e, i) => {
                  return <th key={`head-${i}`}>{tableHead[e]}</th>
                })}</tr>
              </thead>
              <tbody>
                {
                  isProgramLoading ? <UserLoading title="Getting data" /> :
                    programTypes.map((e, i) => {
                      return <tr key={`body-${i}`}>
                        <th>{programsByNIRF[e].name}</th>
                        <td><Text type="number" name="males" fieldName={e} setValues={setValues} value={values?.[e]?.males} /></td>
                        <td><Text type="number" name="females" fieldName={e} setValues={setValues} value={values?.[e]?.females} /></td>
                        <td><Text type="number" name="total" fieldName={e} setValues={setValues} value={values?.[e]?.total} /></td>
                        <td><Text type="number" name="outSideState" fieldName={e} setValues={setValues} value={values?.[e]?.outSideState} /></td>
                        <td><Text type="number" name="outSideCountry" fieldName={e} setValues={setValues} value={values?.[e]?.outSideCountry} /></td>
                        <td><Text type="number" name="economicallyBackward" fieldName={e} setValues={setValues} value={values?.[e]?.economicallyBackward} /></td>
                        <td><Text type="number" name="sociallyChallenged" fieldName={e} setValues={setValues} value={values?.[e]?.sociallyChallenged} /></td>
                        <td><Text type="number" name="fullFeeGovernment" fieldName={e} setValues={setValues} value={values?.[e]?.fullFeeGovernment} /></td>
                        <td><Text type="number" name="fullFeeInstitution" fieldName={e} setValues={setValues} value={values?.[e]?.fullFeeInstitution} /></td>
                        <td><Text type="number" name="fullFeePrivateBodies" fieldName={e} setValues={setValues} value={values?.[e]?.fullFeePrivateBodies} /></td>
                        <td><Text type="number" name="notReceivingfullFee" fieldName={e} setValues={setValues} value={values?.[e]?.notReceivingfullFee} /></td>
                      </tr>
                    }
                    )
                }
              </tbody>
            </table>
          </div>
          <ArrowButton className="my-4" onClickFunction={submit} title={!isSubmitLoading ? 'Submit Details' : 'Saving data...'} showArrow={false} />
        </div> : <NotAvailableComponentNIRF academicYear={academicYear} />
  )
}

export default TotalAnnualStudentStrength

export { tableHead as tableHeadStudentStrength }
