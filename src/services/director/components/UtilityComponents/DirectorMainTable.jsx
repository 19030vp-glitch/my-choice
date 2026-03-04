import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MainTable from '../../../../components/MainTable'
import SchoolsProgram from '../../../../components/SchoolsProgram'
import { academicYearGenerator } from '../../../../inputs/Year'
import directorTables from '../../js/directorTables'


const modifyObject = (Obj) => {
    const result = { ...Obj };
    delete result.SchoolName;
    result.Action = "Action";
    return result
}
const modifyObject2 = (Obj) => {
    const result = { ...Obj };
    result.Action = "Action";
    return result
}
const modifyObject3 = (Obj) => {
    const result = { ...Obj };
    delete result.SchoolName;
    return result
}

const serviceName = 'director';
const module = 'main';
let getproof = "Upload_Proof";
const nonProofModels = ["CourceInAllProgram", "NewPrograms"]

const DirectorMainTable = ({ model, academicYear = null, showTable = true, extraInitialFilds = {} }) => {
    
    const directorUser = useSelector((state) => state.user?.directorUser);
    const department = directorUser?.department;
    const [typeObject, setTypeObject] = useState(null);
    const [tableHead, setTableHead] = useState(null);
    const [initialState, setInitialState] = useState({});
    const [excelTypeObject, setExcelTypeObject] = useState(null);
    const [icon, setIcon] = useState(null);
    const academicYears = academicYear || academicYearGenerator(29, true, true);
    const year = directorTables?.[model]?.year
    let filter = { SchoolName: department }
    if(nonProofModels.includes(model)) {
        getproof = null
    }
    if (extraInitialFilds) {
        filter = {...filter, ...extraInitialFilds}
    }
    if (academicYear) {
        filter[year] = { $in: academicYear }
    }
    useEffect(() => {
        if (directorUser) {
            const programs = SchoolsProgram[department]?.map(item => { return item?.[0] })
            let newTypeObject = modifyObject3(directorTables?.[model]?.typeObject)
            let newTableHead = modifyObject(directorTables?.[model]?.tableHead)
            let newExcelObject = {}
            setInitialState(extraInitialFilds)
            setIcon(directorTables?.[model].icon)
            for (const key in newTypeObject) {
                if (newTypeObject[key] === 'programs') {
                    newTypeObject[key] = programs;
                }
                else if (newTypeObject[key] === 'academicYears') {
                    newTypeObject[key] = academicYears;
                }
                if (key !== "Proof") {
                    newExcelObject[key] = newTypeObject[key];
                }
                setInitialState(prev => ({ ...prev, [key]: '' }));
            }
            setInitialState(prev => ({ ...prev, SchoolName: department }));
            setTypeObject(() => newTypeObject);
            setTableHead(() => newTableHead);
            setExcelTypeObject(() => newExcelObject);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [model, directorUser])

    return (
        <div>
            {(department && typeObject && tableHead && excelTypeObject) && <MainTable tableHead={tableHead} typeObject={typeObject} model={model} module={module} title={directorTables?.[model]?.title} getproof={getproof} initialstate={initialState} filter={filter} excelTypeObject={excelTypeObject} year={year} showTable={showTable} serviceName={serviceName} proofFolder={{ getproof, folder: serviceName }} icon={icon} />}
        </div>
    )
}


export default DirectorMainTable
export { nonProofModels, getproof, serviceName, modifyObject, modifyObject2, modifyObject3 } 