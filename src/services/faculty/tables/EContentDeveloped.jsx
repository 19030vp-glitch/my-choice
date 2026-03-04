import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import BulkExcel from '../../../components/BulkExcel';
import useFetchData from '../../../hooks/useFetchData';
import { FacultyTables } from '../components/FacultyMainTable';
import AddButton from '../../director/components/UtilityComponents/AddButton';
import editReq from '../../../components/requestComponents/editReq';
import addReq from '../../../components/requestComponents/addReq';
import DialogBox from '../../../components/formComponents/DialogBox';
import Text from '../../../components/formComponents/Text';
import Select from '../../../components/formComponents/Select';
import Lists from '../../../components/tableComponents/Lists';
import UploadFile from '../../../components/formComponents/UploadFile';
import Table from '../../../components/tableComponents/TableComponent'
import { academicYearGenerator } from '../../../inputs/Year';


const EContentDeveloped = ({academicYear}) => {
    const model = "EContentDeveloped";
    const module = "main";
    const getproof = "proof"
    const serviceName = "faculty";
    const year = "year";
    const proofFolder = { getproof, folder: serviceName }
    const {title, typeObject, tableHead, icon, link} = FacultyTables.EContentDeveloped
    const {Proof, ...excelTypeObject} = typeObject
    const [Loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const initialstate = {moduleName: "", creationType: "", platform: "", year: "", link: "", Proof: ""};
    const [values, setValues] = useState(initialstate)
    const [excelOpen, setExcelOpen] = useState(false)
    const [itemToEdit, setItemToEdit] = useState(null)
    const [data, setData] = useState([])
    const facultyUser = useSelector((state) => state.user?.user);
    const _id = facultyUser?._id;
    const filter = { userId: _id }
    const showTable = true;
    const academicYears = academicYear || academicYearGenerator(29, true, true);
    const arr = ["Development of Innovative Pedagogy", "Design of new curriculla & courses", ""]
    const { data: serverData, isLoading, refetch } = useFetchData(model, module, filter, showTable, setData)

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
        edit ? editReq({ id: itemToEdit, ...proofFolder }, model, initialstate, {...values, platform: values.platform||"N.A."}, setValues, refetch, setOpen, setEdit, setItemToEdit, setLoading, module) :
            addReq({ ...proofFolder, userId: _id }, model, initialstate, {...values, platform: values.platform||"N.A."}, setValues, refetch, setOpen, setLoading, module)
    }

    return (
        <div>
            <AddButton setData={setData} serverData={serverData} getproof={getproof} model={model} module={module} title={title} filter={filter} year={year} serviceName={serviceName} onclick={setOpen} exceldialog={setExcelOpen} customName={title} filterByAcademicYear={true} dataCount={data ? data?.data?.length : 0} showTable={showTable} data={data?.data} tableHead={tableHead} icon={icon} link={link} />
            {/* // HEADER */}

            <BulkExcel proof={getproof} sampleFile={title} title={title} SendReq={model} refetch={refetch} module={module} open={excelOpen} setOpen={setExcelOpen} commonFilds={filter} tableHead={tableHead} typeObject={excelTypeObject} link={link} />

            <DialogBox title={`${edit ? "Edit" : "Add"} ${title}`} buttonName="Submit" isModalOpen={open} setIsModalOpen={setOpen} onClickFunction={onSubmit} onCancel={onCancel} maxWidth="lg" loading={Loading}>
              <div className='flex flex-wrap'>
                <Text className='col-md-6 col-lg-4' id="moduleName" value={values.moduleName} label={tableHead.moduleName} setState={setValues}/>
                <Select className='col-md-6 col-lg-4' id="creationType" value={values.creationType} label={tableHead.creationType} setState={setValues} options={Lists.eContentCreation} />
                {!(arr.includes(values.creationType))&&<Select className='col-md-6 col-lg-4' id="platform" value={values.platform} label={tableHead.platform} setState={setValues} options={Lists.eContentPlatform} />}
                <Select className='col-md-6 col-lg-4' id="year" value={values.year} label={tableHead.year} setState={setValues} options={academicYears} />
                <Text className='col-md-6 col-lg-4' id="link" value={values.link} label={tableHead.link} setState={setValues} />
                <UploadFile className='col-md-6 col-lg-4' id="Proof" label={tableHead.Proof} setState={setValues} required={!edit} />
              </div>
            </DialogBox>

            {showTable && <Table title={title} TB={data?.data} module={module} year={year} fatchdata={refetch} setItemToEdit={setItemToEdit} isLoading={isLoading} tableHead={tableHead} SendReq={model} getproof={getproof} proof={serviceName || module} proofFolder={proofFolder} link={link} />}
        </div>
    )
}
export default EContentDeveloped