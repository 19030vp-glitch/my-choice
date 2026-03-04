import { useSelector } from "react-redux";
import MainTable from "../../../../components/MainTable";
import { modifyObject, modifyObject3 } from "./DirectorMainTable";
import directorTables from "../../js/directorTables";
import { useEffect, useState } from "react";
import { academicYearGenerator } from "../../../../inputs/Year";
import SchoolsProgram from "../../../../components/SchoolsProgram";

const DirectorFacultyMainTable = ({ model, academicYear = null, showTable = true, extraFilter={} }) => {

    const serviceName = 'director';
    const module = 'main';
    const getproof = "Upload_Proof";

    const user = useSelector((state) => state.user?.user);
    const department = user?.department;
    const _id = user?._id;
    const [typeObject, setTypeObject] = useState(null)
    const [tableHead, setTableHead] = useState(null)
    const [initialState, setInitialState] = useState({});
    const [excelTypeObject, setExcelTypeObject] = useState(null);
    const academicYears = academicYear || academicYearGenerator(29, true, true);
    const year = directorTables?.[model]?.year
    const filter = { SchoolName: department, userId: _id }
    const icon = directorTables?.[model]?.icon
    if (model === "ConferencesSemiWorkshopOrganized") {
        delete filter.SchoolName
    }
    if (academicYear) {
        filter[year] = { $in: academicYear }
    }
    if (extraFilter) {
        Object.assign(filter, extraFilter)
    }
    useEffect(() => {
        if (user) {
            const programs = SchoolsProgram[department]?.map(item => { return item?.[0] })
            let newTypeObject = modifyObject3(directorTables?.[model]?.typeObject);
            let newTableHead = modifyObject(directorTables?.[model]?.tableHead);
            let newExcelTypeObject = {}
            for (const key in newTypeObject) {
                if (newTypeObject[key] === 'programs') {
                    newTypeObject[key] = programs;
                }
                else if (newTypeObject[key] === 'academicYears') {
                    newTypeObject[key] = academicYears;
                }
                if (key !== "Proof") {
                    newExcelTypeObject[key] = newTypeObject[key];
                }
                setInitialState(prev => ({ ...prev, [key]: '' }));
            }
            setInitialState(prev => ({ ...prev, SchoolName: department, userId: _id }));
            setTableHead(() => newTableHead);
            setTypeObject(() => newTypeObject)
            setExcelTypeObject(() => newExcelTypeObject)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model, user])

    return (
        <div>
            {(department && typeObject && tableHead && excelTypeObject) && <MainTable tableHead={tableHead} typeObject={typeObject} model={model} module={module} title={directorTables?.[model]?.title} getproof={getproof} initialstate={initialState} filter={filter} excelTypeObject={excelTypeObject} year={year} showTable={showTable} serviceName={serviceName} proofFolder={{ getproof, folder: serviceName }} icon={icon} />}
        </div>
    )
}

export default DirectorFacultyMainTable