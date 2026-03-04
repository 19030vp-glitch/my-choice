import React, { useEffect, useState } from 'react'
import { Submit, Text, privYear } from './PlacemntAndHEForPriv3Year';
import { useQuery } from 'react-query';
import getReq from '../../../../../components/requestComponents/getReq';
import UserLoading from '../../../../../pages/UserLoading';
import { useParams } from 'react-router-dom';
import { numberToWord } from '../../../../../js/numberToWord';
import capitalizeText from '../../../../../js/capitalizeText';

const tableHead = { Consultancy: "Total no of Consultancy", clientOrganization: "Total no of Client Organization", amountReceived: "Total Amount Received (in INR)", amountInWords: "Amount Received in Words" }

const { amountInWords, ...validationTableHead } = tableHead

const ConsultancyNirf = ({ school, program, year, setChildData = false, parentData = false }) => {

  const { academicYear: paramsYear } = useParams()
  const academicYear = year || paramsYear
  const model = "ConsultancyNirf";
  const module = "nirf"
  const privYearby1 = privYear(academicYear, 1);
  const privYearby2 = privYear(academicYear, 2);
  let filter = { academicYear: { $in: [academicYear, privYearby1, privYearby2] }, school }
  const params = { model, module, filter }
  const { data, isLoading, refetch } = useQuery(`${model}-${school}-${academicYear}`, () => getReq(params), { refetchOnWindowFocus: false })


  const preInitialState = { school, Consultancy: null, clientOrganization: null, amountReceived: null, amountInWords: null }

  const initialstate = { [academicYear]: preInitialState, [privYearby1]: preInitialState, [privYearby2]: preInitialState }

  const [values, setValues] = useState(initialstate);

  const [btnLoading, setBtnLoading] = useState({ [privYearby2]: false, [privYearby1]: false, [academicYear]: false })
  const yearArray = [privYearby2, privYearby1, academicYear]


  useEffect(() => {
    if (school) {
      setValues(initialstate)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [school])

  useEffect(() => {
    data?.data.forEach((e) => {
      setValues(prev => {
        return { ...prev, [e.academicYear]: { ...e, school: e.school || school } }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (setChildData) {
      setChildData((prev) => {
        return { ...prev, [school]: values }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values])

  return (
    <div>
      {isLoading ? <div className='w-full flex justify-center'><UserLoading title="Fetching Placement and HE Content" /></div> : <div className="my-3 border-2 rounded-md p-2">
        <p className="my-3 font-medium">{program} - {school}</p>

        <div className="table-responsive">
          <table className="table table-bordered" >
            <thead className={`${!year ? 'bg-primary' : 'bg-[#ae7e28]' } text-light`} >
              <tr>
                <th>Financial Year</th>
                {Object.values(tableHead)?.map((e, i) => <th key={`head${i}`}>{e}</th>)}
                {!year && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {
                yearArray.map((e, i) => {
                  return (<tr key={`tr-${i}`}>
                    <th>{e}</th>
                    <td>{!year ? <Text type="number" name="Consultancy" fieldName={e} setValues={setValues} value={values[e]?.Consultancy} /> : parentData ? parentData[e]?.Consultancy : values[e]?.Consultancy}</td>
                    <td>{!year ? <Text type="number" name="clientOrganization" fieldName={e} setValues={setValues} value={values[e]?.clientOrganization} /> : parentData ? parentData[e]?.clientOrganization : values[e]?.clientOrganization}</td>
                    <td>{!year ? <Text type="number" name="amountReceived" fieldName={e} setValues={setValues} value={values[e]?.amountReceived} /> : parentData ? parentData[e]?.amountReceived : values[e]?.amountReceived}</td>
                    <td>{capitalizeText(numberToWord(parentData ? parentData[e]?.amountReceived : values[e]?.amountReceived))}</td>
                    {!year && <td><Submit values={values[e]} model={model} module={module} academicYear={e} refetch={refetch} setBtnLoading={setBtnLoading} btnLoading={btnLoading} setValues={setValues} valdateArr={Object.keys(validationTableHead)} /></td>}

                  </tr>)
                })
              }
            </tbody>
          </table>
        </div>

      </div>
      }
    </div>
  )
}

export default ConsultancyNirf
