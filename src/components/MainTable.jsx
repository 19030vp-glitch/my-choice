import { useEffect, useState } from "react"
import useFetchData from "../hooks/useFetchData"
import addReq from "./requestComponents/addReq"
import editReq from "./requestComponents/editReq"
import AddButton from "../services/director/components/UtilityComponents/AddButton"
import DialogBox from "./formComponents/DialogBox"
import Select from "./formComponents/Select"
import UploadFile from "./formComponents/UploadFile"
import Text from "./formComponents/Text"
import BulkExcel from "./BulkExcel"
import Table from './tableComponents/TableComponent'
import TextArea from "./formComponents/TextArea"
import SchoolsProgram from "./SchoolsProgram"
import Lists from "./tableComponents/Lists"



const MainTable = ({ getproof, model, module, title, filter, initialstate, typeObject, tableHead, commonFilds = null, excelTypeObject, year, serviceName, showTable = true, proofFolder = {}, link = null, icon = null, }) => {


    const [data, setData] = useState([])
    const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, showTable, setData)
    const [values, setValues] = useState(initialstate)
    const [open, setOpen] = useState(false)
    const [excelOpen, setExcelOpen] = useState(false)
    const [itemToEdit, setItemToEdit] = useState(null)
    const [edit, setEdit] = useState(false);
    const [Loading, setLoading] = useState(false);

    useEffect(() => {
        if (itemToEdit && data.data) {
            data?.data.forEach((item) => {
                if (item?._id === itemToEdit) {
                    setEdit(true); setOpen(true);
                    setValues({ ...item, Proof: undefined })
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemToEdit])


    const onCancel = () => {
        setValues(initialstate); setItemToEdit(null); setEdit(false); setOpen(false)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        edit ? editReq({ id: itemToEdit, ...proofFolder }, model, initialstate, values, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
            addReq({ ...proofFolder }, model, initialstate, values, setValues, refetch, setOpen, setLoading, module)
    }

    return (
        <>
            <AddButton setData={setData} serverData={serverData} getproof={getproof} model={model} module={module} title={title} filter={filter} year={year} serviceName={serviceName} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0} showTable={showTable} data={data?.data} tableHead={tableHead} icon={icon} link={link} />


            {(tableHead && typeObject) && <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
                <div className='flex flex-wrap'>

                    {
                        Object.keys(typeObject).map((key, i) => {
                            return Array.isArray(typeObject[key]) ?

                                <Select key={`${key}${i}`} className='col-md-6 col-lg-4' id={key} value={values?.[key]}
                                    label={tableHead?.[key]} options={typeObject[key]} setState={setValues} />

                                : typeObject[key] === 'school' ?

                                    <Select key={`${key}${i}`} className='col-md-6 col-lg-4' id={key} value={values?.[key]}
                                        label={tableHead?.[key]} options={SchoolsProgram[values?.SchoolName]?.map(item => item[0]) || []} setState={setValues} />

                                    : typeObject[key] === 'district' ?

                                        <Select key={`${key}${i}`} className='col-md-6 col-lg-4' id={key} value={values?.[key]}
                                            label={tableHead?.[key]} options={Lists.statesInIndia[values?.state]?.map(item => item) || []} setState={setValues} />

                                        : typeObject[key] === 'proof' ?

                                            <UploadFile key={`${key}${i}`} className='col-md-6 col-lg-4' id={key} label={tableHead?.[key]} setState={setValues} required={!edit} />

                                            : typeObject[key] === 'textarea' ?

                                                <TextArea key={`${key}${i}`} className='col-md-6 col-lg-4' id={key} value={values?.[key]} label={tableHead?.[key]} setState={setValues} />

                                                :

                                                <Text key={`${key}${i}`} className='col-md-6 col-lg-4' id={key} type={typeObject?.[key]} value={values?.[key]} label={tableHead?.[key]} setState={setValues} />
                        })
                    }

                </div>
            </DialogBox>}

            <BulkExcel proof={getproof} sampleFile={title} title={title} SendReq={model} refetch={refetch} module={module} open={excelOpen} setOpen={setExcelOpen} commonFilds={commonFilds || filter} tableHead={tableHead} typeObject={excelTypeObject} link={link} />

            {showTable && <Table title={title} TB={data?.data} module={module} year={year} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} getproof={getproof} proof={serviceName || module} proofFolder={proofFolder} link={link} />}
        </>
    )
}

export default MainTable
