import React from 'react'
import { useParams } from 'react-router-dom'
import otherAQARTablesObject from '../js/OtherAQARTablesObject'
import TableAccordion from '../../faculty/reports/aqar/components/TableAccordion'
import Footer from '../../../components/Footer'
import GoBack from '../../../components/GoBack'
import siteLinks from '../../../components/siteLinks'
import EmptyBox from '../../../components/EmptyBox'

const SingleOtherAQAR = () => {

    const { tableId, academicYear } = useParams()

    let obj = otherAQARTablesObject(academicYear)
    const AQARTables = [{ ...findObjectById(obj, tableId), share: false }]
    const bred = [siteLinks.welcome, { title: 'AQAR' }, { title: `Module: ${tableId}` }]
    console.log('AQAR:', AQARTables)

    return (
        <div>
            <GoBack backUrl={"/"} bredLinks={bred} pageTitle={`Annual Quality Assurance Report (${academicYear})`} />
            <div className='flex flex-col items-center justify-between min-h-screen'>

                {
                    AQARTables?.[0]?.id === tableId ? <TableAccordion AQARTables={AQARTables} showIndex={false} /> :
                        <div className='my-5'>
                            <EmptyBox title='Sorry for your inconvenience, this page is not available.' />
                        </div>
                }


                <Footer />
            </div>
        </div>
    )
}

export default SingleOtherAQAR


function findObjectById(obj, targetId) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const components = obj[key].components;
            for (let i = 0; i < components.length; i++) {
                if (components[i].id === targetId) {
                    return components[i];
                }
            }
        }
    }
    return null; // Return null if the object with the specified id is not found
}

