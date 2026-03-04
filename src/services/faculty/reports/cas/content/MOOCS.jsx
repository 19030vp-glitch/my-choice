const MOOCS = ({ item, setState, state, }) => {

    const moocTypes = [
        { id: 1, title: 'Developed Complete MOOCs in 4 Quadrants', value: 'complete' },
        { id: 2, title: 'MOOCs (Developed in 4 Quadrants) per Module / Lecture', value: 'module' },
        { id: 3, title: 'Content Writer / Subject matter exper for each module of MOOCs', value: 'content' },
        { id: 4, title: 'Course Coordinator fo MOOCs', value: 'course' },
    ]

    return <div>

        <div>
            <div className="form-check">

                {
                    moocTypes.map((element, index) => {
                        return <div>
                            <input className="form-check-input" value={element.value} name="moocRadios" type="radio" id={`moocID-${index}`}
                                onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], creationType: item?.creationType, moocType: e.target.value } } }) }} checked={state?.scoreMap?.[item._id]?.moocType === element.value} />
                            <label className="form-check-label" htmlFor={`moocID-${index}`}>
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
                state?.scoreMap?.[item._id]?.moocType === 'complete' ?
                    <div className='col-md-4'>
                        <select className="form-select" required
                            value={state?.scoreMap?.[item._id]?.credit}
                            onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], credit: e.target.value } } }) }}>

                            <option selected disabled>No of Credits</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4 or more</option>

                        </select>
                    </div>




                    :
                    //module id : 2
                    state?.scoreMap?.[item._id]?.moocType === 'module' ?
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
                        state?.scoreMap?.[item._id]?.moocType === 'content' ?
                            <div className='col-md-4'>
                                <select className="form-select" value={state?.scoreMap?.[item._id]?.credit}
                                    onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], credit: e.target.value } } }) }}>

                                    <option selected disabled>No of Modules / Lectures</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4 or more</option>

                                </select>
                            </div> :






                            state?.scoreMap?.[item._id]?.moocType === 'course' ?
                                <div className='col-md-4'>
                                    <select className="form-select" required value={state?.scoreMap?.[item._id]?.credit}
                                        onChange={(e) => { setState({ ...state, scoreMap: { ...state?.scoreMap, [item._id]: { ...state?.scoreMap?.[item._id], credit: e.target.value } } }) }}>

                                        <option selected disabled>No of Credits</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4 or more</option>

                                    </select>
                                </div> : null
            }

        </div>
    </div>
}

export default MOOCS