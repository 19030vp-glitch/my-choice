import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NumberToTextField from '../components/NumberToTextField'
import { BGPad, Remark } from './Teaching'

const PolicyDocuments = ({ casYearState, policyDocuments, setPolicyDocuments, patents, setPatents, awards, setAwards, fellow, setFellow, saveLoader, setSaveLoader }) => {

    const [totalActivityScore, setTotalActivityScore] = useState(0)

    useEffect(() => {
        setTotalActivityScore(policyDocuments?.totalScore + patents?.totalScore + awards?.totalScore + fellow?.totalScore)
    }, [policyDocuments?.totalScore, patents?.totalScore, awards?.totalScore, fellow?.totalScore])

    const patentCalculator = (calculationProp) => {
        let { item, setState, state, serverData } = calculationProp

        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        serverData?.data?.data?.forEach((item) => {
            if (item.isNat === 'National') {
                newMap[item._id] = { score: 7, isNat: item.isNat }
            }
            else if (item.isNat === 'International') {
                newMap[item._id] = { score: 10, isNat: item.isNat }
            }
        })


        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && state?.dataMap?.includes(key)) {
                grandTotal += newMap[key].score
            }
        }

        setState((current) => {
            return {
                ...current,
                totalScore: grandTotal,
                scoreMap:
                    { ...newMap }
            }
        })
    }

    const awardCalculator = (calculationProp) => {

        let { item, setState, state, serverData } = calculationProp

        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));


        serverData?.data?.data?.forEach(item => {
            if (item.isNat === 'National') {
                newMap[item._id] = { score: 5, isNat: item.isNat }

            }
            else if (item.isNat === 'International') {
                newMap[item._id] = { score: 7, isNat: item.isNat }

            }

        });

        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && state?.dataMap?.includes(key)) {
                grandTotal += newMap[key].score
            }
        }


        setState((current) => {
            return {
                ...current,
                totalScore: grandTotal,
                scoreMap:
                    { ...newMap },
            }
        })
    }

    const fellowCalculator = (calculationProp) => {

        let { item, setState, state, serverData } = calculationProp

        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        serverData?.data?.data?.forEach(item => {
            if (item.isNat === 'National') {
                newMap[item._id] = { score: 5, isNat: item.isNat }

            }
            else if (item.isNat === 'International') {
                newMap[item._id] = { score: 7, isNat: item.isNat }

            }
        });


        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && state?.dataMap?.includes(key)) {
                grandTotal += newMap[key].score
            }
        }


        setState((current) => {
            return {
                ...current,
                totalScore: grandTotal,
                scoreMap:
                    { ...newMap },
            }
        })
    }

    const policyCalculator = (calculationProp) => {

        let { item, setState, state, serverData } = calculationProp

        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject?.[elem._id]]));

        let score = 0
        serverData?.data?.data?.forEach(item => {
            if (item.isNat === 'State') {
                newMap[item._id] = { score: 4, isNat: item.isNat }
            }
            else if (item.isNat === 'National') {
                newMap[item._id] = { score: 7, isNat: item.isNat }
            }
            else if (item.isNat === 'International') {
                newMap[item._id] = { score: 10, isNat: item.isNat }
            }
        });


        let grandTotal = 0

        for (const key in newMap) {
            if (newMap[key]?.score && state?.dataMap?.includes(key)) {
                grandTotal += newMap[key].score
            }
        }

        setState((current) => {
            return {
                ...current,
                totalScore: grandTotal,
                scoreMap:
                    { ...newMap },
            }
        })
    }


    return <BGPad classes='mt-3'>

        <div className="bg-blue-300 p-2 text-blue-900 rounded-full w-full flex items-center justify-between px-4">
            <div className='flex items-center justify-start gap-2'>
                <p>Activity 5: <span className='font-bold ml-3'>Patents, Policy Documents & Awards / Fellowship </span></p>
            </div>
            <div className='flex items-center justify-end'>
                <div className='w-52 p-2 bg-blue-100 rounded-xl'>
                    Total Activity Score : <span className='text-green-900 font-bold'>
                        {totalActivityScore ? totalActivityScore.toFixed(2) : 0}</span>
                </div>
            </div>
        </div>
        <div>
            <div className='mt-2 text-sm md:text-base'>

                <NumberToTextField saveLoader={saveLoader} setSaveLoader={setSaveLoader}
                    facultyTableAvailable="PatentPublished" scoreCalculator={patentCalculator}
                    state={patents} setState={setPatents} casYearState={casYearState}
                    classes='my-3' model="Patent" addName="Patent" activityName="Patents Published" activity="Sub-Activity 1"
                >

                </NumberToTextField>

            </div>
        </div>

        <div>
            <div className='mt-5 text-sm md:text-base'>

                <NumberToTextField scoreCalculator={policyCalculator} facultyTableAvailable="PolicyDocuments" saveLoader={saveLoader} setSaveLoader={setSaveLoader}
                    state={policyDocuments} setState={setPolicyDocuments} casYearState={casYearState}
                    classes='my-3' model="PolicyDocuments" addName="Policy Documents" activityName="Policy Documents" activity="Sub-Activity 2"
                    options={[
                        { field: 'Text', keyName: "policyName", label: "Policy Name" },
                        {
                            field: 'Select', keyName: "organizationName", label: "Organisation Name",
                            options: ['International Body', 'Organizations like UNO / UNESCO / World Bank / IMF etc.', 'Central Government / State Government']
                        },
                        { field: 'Select', keyName: "isNat", label: "Type", options: ['State', 'National', 'International'] },
                        { field: 'Year', keyName: "year", label: "Academic Year", },
                        { field: 'File', keyName: "proof", label: "Uploaded Proof", },]}
                >

                </NumberToTextField>

            </div>
        </div>

        <div>
            <div className='mt-5 text-sm md:text-base'>

                <NumberToTextField scoreCalculator={awardCalculator} saveLoader={saveLoader} setSaveLoader={setSaveLoader} facultyTableAvailable="AwardRecognition" casYearState={casYearState} state={awards} setState={setAwards}
                    classes='my-3' model="AwardRecognition" addName="Awards" activityName="Awards & Recognitions" activity="Sub-Activity 3 [A]"
                >
                </NumberToTextField>

            </div>
        </div>

        <div>
            <div className='mt-5 text-sm md:text-base'>

                <NumberToTextField saveLoader={saveLoader} setSaveLoader={setSaveLoader}
                    facultyTableAvailable="Fellowship" scoreCalculator={fellowCalculator}
                    state={fellow} setState={setFellow} casYearState={casYearState}
                    classes='my-3' model="Fellowship" addName="Fellowship" activityName="Fellowship" activity="Sub-Activity 3 [B]"
                >

                </NumberToTextField>

            </div>
        </div>
    </BGPad>
}

export default PolicyDocuments

const PatentPoints = ({ item, setState, state, serverData, scoreCalculator }) => {

    useEffect(() => {
        scoreCalculator({ item, setState, state, serverData })
    }, [])

    return <div>
        National Patent : <strong>07</strong> Points
        <br />
        International Patent : <strong>10</strong> Points

        <hr className='my-2' />
        Current Patent is <strong>{item.isNat}</strong>
    </div>
}

const AwardPoints = ({ item, setState, state, serverData, scoreCalculator }) => {

    useEffect(() => {
        scoreCalculator({ item, setState, state, serverData })
    }, [])



    return <div>
        International Award / Recognition : <strong>07</strong> Points
        <br />
        National Award / Recognition  : <strong>05</strong> Points

        <hr className='my-2' />
        Current Award / Recognition is <strong>{item.isNat}</strong>
    </div>
}

const FellowPoints = ({ item, setState, state, serverData, scoreCalculator }) => {

    useEffect(() => {

        scoreCalculator({ item, setState, state, serverData })

    }, [])



    return <div>
        International Fellowship : <strong>07</strong> Points
        <br />
        National Fellowship : <strong>05</strong> Points

        <hr className='my-2' />
        Current Fellowship is <strong>{item.isNat}</strong>
    </div>
}

const PolicyPoints = ({ item, setState, state, serverData, scoreCalculator }) => {
    useEffect(() => {
        scoreCalculator({ item, setState, state, serverData })


    }, [])

    return <div>
        International Policy Documents : <strong>10</strong> Points
        <br />
        National Policy Documents : <strong>07</strong> Points
        <br />
        State Policy Documents : <strong>04</strong> Points

        <hr className='my-2' />
        Current Fellowship is <strong>{item.isNat}</strong>
    </div>
}


export { PatentPoints, AwardPoints, FellowPoints, PolicyPoints }

