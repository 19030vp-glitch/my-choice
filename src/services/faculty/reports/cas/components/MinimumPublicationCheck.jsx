import React, { useEffect, useState } from 'react'
import ChooseDataTable from './ChooseDataTable'
import { useSelector } from 'react-redux'
import Note from '../../../../director/reports/academic-audit/components/Note'

const MinimumPublicationCheck = ({ level, eligData, setEligData, fullCASData, setPublicationCriteriaItems, publicationCriteriaItems }) => {

    const fieldName = level === 'stage3' ? 'isResearchPaper' : 'isPublication'
    const [chooseData, setChooseData] = useState([])

    // check table related details
    const researchPaperTableHeads = { paperTitle: 'Paper Title', journalName: 'Journal Name', publicationYear: 'Publication Year', year: 'Year', Proof: 'Proof' }

    const user = useSelector((state) => state.user?.user)
    const filter = { userId: user?._id }


    const isItemPresent = (itemId) => {
        return chooseData?.some(item => item?._id === itemId);
    };



    useEffect(() => {
        if (fullCASData?.[level]) {
            setEligData(() => {
                return { ...eligData, [fieldName]: (fullCASData[level] && (JSON.parse(fullCASData[level]) ? JSON.parse(fullCASData[level])?.[fieldName] : true)) }
            })

            setPublicationCriteriaItems(() => {
                return [...JSON.parse(fullCASData?.[level])?.["researchPapers"] || []].filter((item) => isItemPresent(item))
            })
        } else {
            setEligData(() => {
                return { ...eligData, [fieldName]: true }
            })
            setPublicationCriteriaItems([])
        }
    }, [fullCASData, level, chooseData])

    useEffect(() => {
        setEligData((prev) => {
            return { ...prev, researchPapers: publicationCriteriaItems }
        })
    }, [publicationCriteriaItems])


    const criteria = {
        'stage3': {
            title: 'A minimum of seven publications in the peer-reviewed or UGC-listed journals out of which three research papers should have been published during the assessment period.',
            publicationCriteria: ["7 or more", "Lesser than 7 but more than 3"]
        },
        'stage4': {
            title: 'A minimum of ten publications in the peer-reviewed or UGC-listed journals out of which three research papers should have been published during the assessment period.',
            publicationCriteria: ["10 or more", "Lesser than 10 but more than 3"]
        }
    }




    return (
        <div>
            {/* <div className="bg-blue-100 p-3 border rounded-md my-3 col-md-5 mx-auto">
                <p className='my-2'>{criteria?.[level]?.title}</p>

                <p className="mt-2">Please choose the number of publications you have published during the assessment period:</p>

                <div className='ml-5 mt-3'>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault"
                            id={criteria?.[level]?.publicationCriteria[0]}
                            checked={eligData[fieldName]}
                            onChange={
                                (e) => { setEligData({ ...eligData, [fieldName]: true }) }}
                        />
                        <label class="form-check-label" for={criteria?.[level]?.publicationCriteria[0]}>
                            {criteria?.[level]?.publicationCriteria[0]}
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault"
                            id={criteria?.[level]?.publicationCriteria[1]}
                            checked={!eligData[fieldName]}
                            onChange={
                                (e) => { setEligData({ ...eligData, [fieldName]: false }) }}
                        />

                        <label class="form-check-label" for={criteria?.[level]?.publicationCriteria[1]}>
                            {criteria?.[level]?.publicationCriteria[1]}
                        </label>
                    </div>


                </div>
            </div> */}

            {<div className="mt-4 col-md-7 mx-auto bg-blue-100 p-3 border rounded-md">
                <p className='my-2'>{criteria?.[level]?.title}</p>

                <div className='flex items-start justify-between gap-5'>
                    <Note classes="mb-2 flex-1" title={`Choose at least ${level === 'stage3' ? "7" : "10"} publications independent of their assessment period, including the three publications which falls under the assessment period.`} />

                    <span className='whitespace-nowrap font-bold text-blue-800'>Selected: {publicationCriteriaItems?.length || 0}</span>
                </div>

                <ChooseDataTable model="ResearchPaper" tableHeads={researchPaperTableHeads} filter={filter} setSelectedItems={setPublicationCriteriaItems} selectedItems={publicationCriteriaItems} proof={"faculty"} showTable={!eligData[fieldName]} setChooseData={setChooseData} />
            </div>}
        </div>
    )
}

export default MinimumPublicationCheck
