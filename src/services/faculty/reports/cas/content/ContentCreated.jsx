import React, { useEffect, useState } from 'react'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddAuthorBooks from './AddAuthorBooks';
import BottomButtons from './BottomButtons';
import AddTranslationWork from './AddTranslationWork';
import { BGPad, Remark } from './Teaching';
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded';
import AddChapter from './AddChapter';
import { TextField } from '@mui/material';
import MOOCS from './MOOCS';
import EContent from './EContent';
import NumberToTextField from '../components/NumberToTextField';



const ContentCreated = ({ ictData, setIctData, casYearState, saveLoader, setSaveLoader }) => {

    const scoreCalculator = (calculationProp) => {
        let { item, setState, state, serverData } = calculationProp

        const scoreMapObject = state?.scoreMap

        let newMap = Object.fromEntries(serverData?.data?.data?.map(elem => [elem._id, scoreMapObject[elem._id]]));

        let score = 0


        if (item) {
            if (item.creationType === 'Development of Innovative Pedagogy') {
                score += 5
            } else if (item.creationType === 'Design of new curriculla & courses') {
                score += 2
            } else if (state?.scoreMap?.[item._id]?.creationType === 'MOOCS') {
                if (state?.scoreMap?.[item._id]?.moocType === 'complete') {
                    score += state?.scoreMap?.[item._id]?.credit * 5
                } else if (state?.scoreMap?.[item._id]?.moocType === 'module') {
                    score += state?.scoreMap?.[item._id]?.credit * 5
                } else if (state?.scoreMap?.[item._id]?.moocType === 'content') {
                    score += state?.scoreMap?.[item._id]?.credit * 2
                }
                else if (state?.scoreMap?.[item._id]?.moocType === 'course') {
                    score += state?.scoreMap?.[item._id]?.credit * 8 > 20 ? 20
                        : state?.scoreMap?.[item._id]?.credit * 8
                }
            } else if (state?.scoreMap?.[item._id]?.creationType === 'E-Content') {
                if (state?.scoreMap?.[item._id]?.econType === 'complete') {
                    score += 12
                } else if (state?.scoreMap?.[item._id]?.econType === 'module') {
                    score += state?.scoreMap?.[item._id]?.credit * 5
                } else if (state?.scoreMap?.[item._id]?.econType === 'paper') {
                    score += state?.scoreMap?.[item._id]?.credit * 2
                } else if (state?.scoreMap?.[item._id]?.econType === 'course') {
                    score += 10
                }
            }
        }


        // ict score 
        let pedScore = 0;
        let courseScore = 0;

        let moocComplete = 0;
        let moocModule = 0;
        let moocContent = 0;
        let moocCourse = 0;

        let econComplete = 0;
        let econModule = 0;
        let econPaper = 0;
        let econCourse = 0;


        let keys = Object.keys(newMap)
        keys.forEach((element) => {

            if (state?.dataMap?.includes(element)) {
                if (newMap?.[element]?.creationType === 'Development of Innovative Pedagogy') {
                    pedScore += 5
                } else if (newMap?.[element]?.creationType === 'Design of new curriculla & courses') {
                    courseScore += 2
                } else if (newMap?.[element]?.creationType === 'MOOCS') {
                    if (newMap?.[element]?.moocType === 'complete') {
                        moocComplete += newMap?.[element]?.credit * 5
                    } else if (newMap?.[element]?.moocType === 'module') {
                        moocModule += newMap?.[element]?.credit * 5
                    } else if (newMap?.[element]?.moocType === 'content') {
                        moocContent += newMap?.[element]?.credit * 2
                    }
                    else if (newMap?.[element]?.moocType === 'course') {
                        moocCourse += newMap?.[element]?.credit * 8 > 20 ? 20
                            : newMap?.[element]?.credit * 8
                    }
                } else if (newMap?.[element]?.creationType === 'E-Content') {
                    if (newMap?.[element]?.econType === 'complete') {
                        econComplete += 12
                    } else if (newMap?.[element]?.econType === 'module') {
                        econModule += newMap?.[element]?.credit * 5
                    } else if (newMap?.[element]?.econType === 'paper') {
                        econPaper += newMap?.[element]?.credit * 2
                    } else if (newMap?.[element]?.econType === 'course') {
                        econCourse += 10
                    }
                }
            }


        })





        let totalIctScore = 0

        for (const key in newMap) {
            if (newMap[key]?.score && (item ? key !== item?._id : true) && state?.dataMap?.includes(key)) {

                totalIctScore += newMap[key].score
            }
        }

        totalIctScore = totalIctScore + score

        setState((current) => {
            return {
                ...current,
                totalScore: totalIctScore,
                pedScore,
                courseScore,
                moocComplete,
                moocModule,
                moocContent,
                moocCourse,
                econComplete,
                econModule,
                econPaper,
                econCourse,
                econScore: econComplete + econModule + econPaper + econCourse,
                moocScore: moocComplete + moocModule + moocContent + moocCourse,
                scoreMap: item ? { ...newMap, [item._id]: { ...current.scoreMap?.[item._id], score: score, creationType: item?.creationType } } : { ...newMap }
            }
        })

    }


    return (

        <BGPad classes='mt-3'>
            <div>
                <div className='mt-2 text-sm md:text-base'>

                    <NumberToTextField scoreCalculator={scoreCalculator} saveLoader={saveLoader} setSaveLoader={setSaveLoader}
                        facultyTableAvailable="EContentDeveloped"
                        state={ictData} setState={setIctData} casYearState={casYearState}
                        isForm={true} classes='my-3' model="EContentDeveloped" addName="ICT" activityName="ICT (Information & Communication Technology)" activity="Activity 3"

                    >

                    </NumberToTextField>

                </div>
            </div>
        </BGPad>

    )
}

export default ContentCreated


const ContentPoints = ({ item, setState, state, serverData, scoreCalculator }) => {


    useEffect(() => {

        scoreCalculator({ item, setState, state, serverData })

    }, [state?.scoreMap?.[item._id]?.creationType, state?.scoreMap?.[item._id]?.moocType, state?.scoreMap?.[item._id]?.econType, state?.scoreMap?.[item._id]?.credit], state?.scoreMap?.[item._id]?.module)



    return <div>
        <p className='mb-2'>Type : <strong>{item.creationType}</strong></p>
        <hr className='mb-3' />
        <div>
            {
                item.creationType === 'Development of Innovative Pedagogy' ?
                    <div>
                        <p>5 Points for Development of Innovative Pedagogy</p>
                    </div> : item.creationType === 'Design of new curriculla & courses' ?
                        <div>
                            <p>2 Points for Design of new curriculla & courses</p>
                        </div> : item.creationType === 'MOOCS' ?
                            <div>
                                <MOOCS state={state} setState={setState} item={item} />
                            </div> : item.creationType === 'E-Content' ?
                                <div>
                                    <EContent state={state} setState={setState} item={item} />
                                </div> : null
            }
        </div>
    </div>
}

export { ContentPoints }







