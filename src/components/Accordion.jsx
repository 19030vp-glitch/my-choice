import React from 'react'


const Accordion = ({ children, headBackgraound, border, headColor, backgraound, index }) => {
  return (
    <div style={{ border: { border }, width: "100%", padding: "3px", marginBottom: "10px", borderRadius: "10px" }}>

      <div className="accordion" id="accordionExample">

        <div className="accordion-item" style={{ border: { border }, borderRadius: "10px", background: { backgraound }, margin: "3px 0" }}>
          <h2 className="accordion-header flex" id={`heading-${index}`}>
            <button className="accordion-button" style={{ borderRadius: "8px", background: { headBackgraound }, color: { headColor }, fontSize: 17, fontWeight: 600 }} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
              {item?.value}
            </button>
            {/* <AdminExcelExport data={item?.childData} fileTitle={item?.filename} SendReq={item?.SendReq} /> */}
          </h2>
          <div id={`collapse-${index}`} className="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion