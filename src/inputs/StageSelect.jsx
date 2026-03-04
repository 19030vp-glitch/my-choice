import React from 'react'

const StageSelect = ({ space = 'col-md-2', state, setState, title = "Choose Stage / Level", forDesignation = false }) => {

    return (
        <div className={space}>
            <label htmlFor="validationCustom04" className="form-label" >{title}</label>
            <select className="form-select" id="validationCustom04" required onChange={(e) => { setState(e.target.value) }} value={state}>
                <option selected={state === null && true} disabled value="">Choose</option>



                {
                    forDesignation ?
                        <>
                            {
                                forDesignation === 'Assistant Professor' ?
                                    <>
                                        <option value="Academic Level 10">Academic Level 10</option>
                                        <option value="Academic Level 11">Academic Level 11</option>
                                        <option value="Academic Level 12">Academic Level 12</option>
                                    </> : <>
                                        <option value={forDesignation}>{forDesignation}</option>
                                    </>
                            }
                        </>
                        :
                        <>
                            <option value="Academic Level 10">Academic Level 10</option>
                            <option value="Academic Level 11">Academic Level 11</option>
                            <option value="Academic Level 12">Academic Level 12</option>
                            <option value="Associate Professor">Associate Professor</option>
                            <option value="Professor">Professor</option>
                            <option value="Senior Professor">Senior Professor</option>
                        </>
                }


            </select>


        </div>
    )
}

export default StageSelect
