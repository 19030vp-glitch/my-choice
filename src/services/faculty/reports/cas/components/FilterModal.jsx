import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button } from 'antd';
import React, { useState } from 'react'
import { useEffect } from 'react';
import TableData from '../../../../director/reports/academic-audit/components/TableData';
import CASDataTable from '../components/CASDataTable'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';



const FilterModal = ({ scoreCalculator, refetch, title, data, setDataFilterModal, dataFilterModal, model, setState, state, isConsolidated = false, fetchFrom, setSaveLoader, recalculateScore }) => {

  const [filterData, setFilterData] = useState([])
  const [filteredServerData, setFilteredServerData] = useState(null)


  useEffect(() => {
    if (model === 'MainBookAndChapter') {
      let newData = filterBook(data)
      if (newData) {
        setFilteredServerData({ data: { data: newData } })
      }
    }
  }, [data])


  const onClose = () => {
    setDataFilterModal({ ...dataFilterModal, isOpen: false });
    recalculateScore(state, setState, filteredServerData ? filteredServerData : data);
    if (scoreCalculator) {
      scoreCalculator({ item: false, state, setState, serverData: filteredServerData ? filteredServerData : data })
      setSaveLoader(true);
    } else {
      setSaveLoader(true);
    }
  }

  return (
    <div className='w-full'>
      <Dialog open={dataFilterModal.isOpen} onClose={onClose} fullWidth maxWidth='md'>
        <DialogTitle>
          <div className='flex items-start justify-between text-base'>
            <p className='w-[60%]'>Filter : <b>{title}</b> </p>
            <p> Academic Year : <b>{dataFilterModal.year}</b></p>
            <p className='flex items-center justify-start gap-2 p-1 bg-blue-100 hover:bg-blue-200 rounded-md cursor-pointer' onClick={() => { refetch(); filterBook(); }}> <RefreshRoundedIcon /> Refresh</p>
          </div>
        </DialogTitle>
        <DialogContent>
          {model === 'MainBookAndChapter' && <div>
            <div className="flex p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400" role="alert">
              <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Please take following points into consideration</span>
                <ul className="mt-1.5 ml-4 list-disc list-inside">
                  <li> <span className="font-medium">Book Chapters:</span> If the chapters from the same book exceeds above 2, only first 2 will be considered for scoring, others will be filtered out.</li>
                  <li> <span className="font-medium">Translation Work:</span> If the translation work from the same book exceeds 3, only first 3 will be considered for scoring, others will be filtered out.</li>
                </ul>
              </div>
            </div>
          </div>
          }
          <FilterCheckBox data={model === "MainBookAndChapter" ? filteredServerData : data} model={model} year={dataFilterModal.year} state={state} setState={setState} filterData={filterData} setFilterData={setFilterData} isConsolidated={isConsolidated} fetchFrom={fetchFrom} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ textTransform: "none" }} className='bg-blue-800 text-white' >Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FilterModal

function filterBook(data, onlyTranslationData = false) {

  const chaptersMap = new Map();
  const translatorMap = new Map();
  const result = [];
  const onlyTranslation = []

  data?.data?.data?.sort((a, b) => {
    const createdAtA = new Date(a.createdAt);
    const createdAtB = new Date(b.createdAt);
    return createdAtA - createdAtB;
  }).forEach((item) => {
    if (item.type === 'Chapter') {
      if (!chaptersMap.has(item.titleOfBook)) {
        chaptersMap.set(item.titleOfBook, [item]);
        result.push(item);
      } else {
        const chapters = chaptersMap.get(item.titleOfBook);
        if (chapters.length < 2) {
          chapters.push(item);
          result.push(item);
        }
      }
    } else if (item.type === 'Translator') {
      if (!translatorMap.has(item.titleOfBook)) {
        translatorMap.set(item.titleOfBook, [item]);
        result.push(item);
        onlyTranslation.push(item);
      } else {
        const translators = translatorMap.get(item.titleOfBook);
        if (translators.length < 3) {
          translators.push(item);
          result.push(item);
          onlyTranslation.push(item);
        }
      }
    } else {
      result.push(item);
    }
  })

  if (onlyTranslationData) {
    return onlyTranslation
  }

  return result;
}

export { filterBook }


const FilterCheckBox = ({ data, model, year, setState, state, isConsolidated, fetchFrom }) => {

  const [isAllChecked, setIsAllChecked] = useState(false)
  const DataTable = isConsolidated ? TableData : CASDataTable

  const checkAll = () => {
    let arr = state?.dataMap ? state?.dataMap : [];
    let newArray = [];
    let serverArr = !isConsolidated ? data?.data?.data?.filter(function (filterable) { return filterable.year === year; }) : data?.filter(function (filterable) {
      return fetchFrom === "faculty" ? filterable.year === year : (filterable.Academic_Year === year || filterable.Acadmic_Year === year || filterable.Year_of_Award === year || filterable.Academic_year === year || filterable.Acadmic_year === year || filterable.Year_of_activity === year || year.includes(filterable.Year))
    });

    serverArr.forEach(item => {
      newArray.push(item._id);
    });

    setState(prevState => ({ ...prevState, dataMap: [...new Set([...prevState.dataMap, ...newArray])] }));
    setIsAllChecked(true);
  };



  const uncheckAll = () => {
    let arr = [...new Set(state?.dataMap)]
    let serverArr = !isConsolidated ? data?.data?.data?.filter(function (filterable) { return filterable.year === year; }) : data
    let newArr = []
    serverArr.forEach((item, index) => {
      newArr.push(item._id)
    })

    let filterArray = arr.filter((item) => !newArr.includes(item))

    setState({ ...state, dataMap: [...new Set(filterArray)] })
    setIsAllChecked(false)


  }


  const verifyCheckAll = () => {
    let isAllChecked = false;
    if (!isConsolidated) {
      isAllChecked = data && data?.data?.data?.filter(function (filterable) { return filterable.year === year; })?.length === state?.dataMap?.length;
    } else {
      isAllChecked = data && data?.filter(function (filterable) {
        return fetchFrom === "faculty" ? filterable.year === year : (filterable.Academic_Year === year || filterable.Acadmic_Year === year || filterable.Year_of_Award === year || filterable.Academic_year === year || filterable.Acadmic_year === year || filterable.Year_of_activity === year || year.includes(filterable.Year))
      })?.length === state?.dataMap?.length;
    }
    setIsAllChecked(isAllChecked);
  };



  const singleCheckUncheck = (e, itemId) => {
    if (e.target.checked) {
      if (!state.dataMap || state.dataMap === undefined) {
        setState({ ...state, dataMap: [itemId] })
        verifyCheckAll()
      } else {
        setState({ ...state, dataMap: [...state.dataMap, itemId] })
        verifyCheckAll()
      }
    } else {
      setState({ ...state, dataMap: [...state.dataMap.filter((elem) => elem !== itemId)] })
      verifyCheckAll()

    }

  }




  return (
    <>
      <table className="table">
        <thead className="sticky-top bg-light">
          <tr>
            <th scope="col">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="selectAll" onChange={(e) => {
                  e.target.checked ? checkAll() : uncheckAll();
                }} checked={isAllChecked} />
              </div>
            </th>
            {
              DataTable[model]?.mainKey.head.map((head) => {
                return <th scope="col"><label htmlFor="selectAll">{head}</label></th>
              })
            }
            {
              isConsolidated && <th scope="col">Academic Year</th>
            }

          </tr>
        </thead>
        {
          !isConsolidated ? <tbody>

            {data && data?.data?.data?.filter(function (filterable) { return filterable.year === year; })?.map((item, index) => {

              return <tr key={index}>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={item._id} id={item._id}
                      onChange={(e) => { singleCheckUncheck(e, item._id) }} checked={state?.dataMap?.includes(item._id)} />
                  </div>
                </td>
                {
                  DataTable[model]?.mainKey.keyName.map((key) => {
                    return <td><label htmlFor={item._id}>{item?.[key]}</label></td>
                  })
                }
              </tr>

            })}
          </tbody> :
            <tbody>
              {data && data?.filter(function (filterable) {
                return fetchFrom === "faculty" ? filterable.year === year : (filterable.Academic_Year === year || filterable.Acadmic_Year === year || filterable.Year_of_Award === year || filterable.Academic_year === year || filterable.Acadmic_year === year || filterable.Year_of_activity === year || year.includes(filterable.Year))
              })?.map((item, index) => {
                return <tr key={index}>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value={item._id} id={item._id}
                        onChange={(e) => { singleCheckUncheck(e, item._id) }} checked={state.dataMap?.includes(item._id)} />
                    </div>
                  </td>
                  {
                    DataTable[model]?.mainKey.keyName.map((key) => {
                      return key === 'name' ? <td><label htmlFor={item._id}>{item.userId.name}</label></td> : <td><label htmlFor={item._id}>{item?.[key]}</label></td>
                    })
                  }
                  <td>{item?.year || item?.Academic_Year || item?.Academic_year || item?.Acadmic_Year || item?.Year_of_activity || item?.Year_of_Award || item?.Acadmic_year || item?.Year || 'NA'}</td>
                </tr>

              })}
            </tbody>
        }
      </table>
    </>
  )
}



