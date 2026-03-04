const EContent = ({ item, setState, state, }) => {

    const econtentTypes = [
        { id: 1, title: 'Developed Complete E-Content in 4 Quadrants', value: 'complete' },
        { id: 2, title: 'E-Content (Developed in 4 Quadrants) per Module / Lecture', value: 'module' },
        { id: 3, title: 'Contribution to development of e-Content module in complete course / Paper / e-Book', value: 'paper' },
        { id: 4, title: 'Editor of e-Content for Complete Course / Paper / e-Book', value: 'course' },
    ]

    return <div>

        <div>
            <div className="form-check">

                {
                    econtentTypes.map((element, index) => {
                        return <div>
                            <input className="form-check-input" value={element.value} name="econRadios" type="radio" id={`econID-${index}`}
                                onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], creationType: item?.creationType, econType: e.target.value } } }) }} checked={state?.scoreMap?.[item._id]?.econType === element.value} />
                            <label className="form-check-label" htmlFor={`econID-${index}`}>
                                {element.title}
                            </label>
                        </div>
                    })
                }
            </div>
        </div>

        <div>
            <hr className='my-2' />
            <p className='my-2'>Attempt and choose to calculate points</p>

            {
                // complete id : 1
                state?.scoreMap?.[item._id]?.econType === 'complete' ?
                    <p>12 Points for Developed Complete E-Content in 4 Quadrants</p>

                    :
                    //module id : 2
                    state?.scoreMap?.[item._id]?.econType === 'module' ?
                        <div className='col-md-4'>
                            <select className="form-select" value={state?.scoreMap?.[item._id]?.credit}
                                onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], credit: e.target.value } } }) }}>

                                <option selected disabled>No of Modules / Lectures</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4 or more</option>


                            </select>
                        </div>





                        :
                        state?.scoreMap?.[item._id]?.econType === 'paper' ?
                            <div className='col-md-4'>
                                <select className="form-select" value={state?.scoreMap?.[item._id]?.credit}
                                    onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], credit: e.target.value } } }) }}>

                                    <option selected disabled>No of Modules</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4 or more</option>
                                </select>
                            </div> :






                            state?.scoreMap?.[item._id]?.econType === 'course' ?
                                <p>10 Points for Editor of e-Content for Complete Course / Paper / e-Book</p>
                                : null
            }

        </div>
    </div>
}

export default EContent