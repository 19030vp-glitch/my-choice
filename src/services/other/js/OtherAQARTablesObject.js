import OtherMainTable from "../../../components/OtherMainTable";
import AQARCheckRadio from "../../aqar-naac/components/AQARCheckRadio";
import AQARTextMatter from "../../aqar-naac/components/AQARTextMatter";
import OtherDemandRatio from "../pages/OtherDemandRatio";

function otherAQARTablesObject(academicYear) {
    return {
        "Finance Department": {
            title: "Finance Department",
            components: [
                {
                    id: "2.1.1",
                    share: true,
                    academicYear,
                    title: "2.1.1 - Demand Ratio",
                    component: <OtherDemandRatio filterByAcademicYear={academicYear} />
                },
                {
                    id: "4.1.4",
                    share: true,
                    academicYear,
                    title: "4.1.4 - Total Expenditure (FAO)",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '4.1.4', userType: 'other', school: "Finance"
                    },
                    component: <OtherMainTable model="TotalExpenditure" academicYear={[academicYear]} />
                },
                {
                    id: "6.4.1",
                    share: true,
                    academicYear,
                    title: "6.4.1 - Institutional strategies for mobilisation of funds and the optimal utilisation of resources",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.4.1', userType: 'finance', school: "Finance"
                    },
                    component: <AQARTextMatter academicYear={academicYear} school="Finance" matterType='6.4.1' userType='finance' />
                },
                {
                    id: "6.4.2",
                    share: true,
                    academicYear,
                    title: "6.4.2 - Infrastructure and Maintenance Fundings",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.4.2', userType: 'other', school: "Finance"
                    },
                    component: <OtherMainTable model="MaintenanceAndInfrastructure" academicYear={[academicYear]} />                    
                },
                {
                    id: "6.4.4",
                    share: true,
                    academicYear,
                    title: "6.4.4 - Institution conducts internal and external financial audits regularly",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.4.4', userType: 'finance', school: "Finance"
                    },
                    component: <AQARTextMatter academicYear={academicYear} school="Finance" matterType='6.4.4' userType='finance' />
                },
            ]
        },
        "IQAC": {
            title: "IQAC",
            components: [
                {
                    id: "4.1.3",
                    share: true,
                    academicYear,
                    title: "4.1.3 - Availability of general campus facilities and overall ambience",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '4.1.3', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARTextMatter academicYear={academicYear} school="IQAC" matterType='4.1.3' userType='iqac' />
                },
                {
                    id: "4.3.2",
                    share: true,
                    academicYear,
                    title: "4.3.2 - Institution has an IT policy, makes appropriate budgetary provision and updates its IT facilities including Wi-Fi facility",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '4.3.2', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARTextMatter academicYear={academicYear} school="IQAC" matterType='4.3.2' userType='iqac' />

                },
                {
                    id: "5.1.4",
                    share: true,
                    academicYear,
                    title: "5.1.4 - The Institution adopts the following for redressal of student grievances including sexual harassment and ragging cases",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '5.1.4', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARCheckRadio
                        options={["Implementation of guidelines of statutory/regulatory bodies", "Organisation wide awareness and undertakings on policies with zero tolerance", "Mechanisms for submission of online/offline students’ grievances", "Timely redressal of the grievances through appropriate committees"]}
                        academicYear={academicYear} radioId={"5.1.4"} school="IQAC"
                    />

                },
                {
                    id: "6.1.1",
                    share: true,
                    academicYear,
                    title: "6.1.1 - The institution has a clearly stated vision and mission which are reflected in its academic and administrative governance",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.1.1', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARTextMatter academicYear={academicYear} school="IQAC" matterType='6.1.1' userType='iqac' />

                },
                {
                    id: "6.1.2",
                    share: true,
                    academicYear,
                    title: "6.1.2 - The effective leadership is reflected in various institutional practices such as decentralization and participative management",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.1.2', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARTextMatter academicYear={academicYear} school="IQAC" matterType='6.1.2' userType='iqac' />

                },
                {
                    id: "6.2.1",
                    share: true,
                    academicYear,
                    title: "6.2.1 - The institutional Strategic plan is effectively deployed",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.2.1', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARTextMatter academicYear={academicYear} school={"IQAC"} matterType='6.2.1' userType='iqac' />

                },
                {
                    id: "6.2.2",
                    share: true,
                    academicYear,
                    title: "6.2.2 - The functioning of the institutional bodies is effective and efficient as visible from policies, administrative setup, appointment and service rules, procedures, etc",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.2.2', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARTextMatter academicYear={academicYear}
                        school={"IQAC"} matterType='6.2.2' userType='iqac' />

                },
                {
                    id: "6.2.3",
                    share: true,
                    academicYear,
                    title: "6.2.3 - Institution Implements e-governance in its areas of operations ",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.2.3', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARCheckRadio
                        options={["Administration", "Finance and Accounts", "Student Admission and Support", "Examination"]}
                        academicYear={academicYear} radioId={"6.2.3"} school={"IQAC"}
                    />

                },
                {
                    id: "6.5.1",
                    share: true,
                    academicYear,
                    title: "6.5.1 - Internal Quality Assurance Cell (IQAC) has contributed significantly for institutionalizing the quality assurance strategies and processes by constantly reviewing the teaching learning process, structures & methodologies of operations and learning outcomes at periodic intervals",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.5.1', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARTextMatter academicYear={academicYear} school="IQAC" matterType='6.5.1' userType='iqac' />
                },
                {
                    share: true,
                    academicYear,
                    title: "6.5.2 - Institution adopted Quality assurance",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.5.2', userType: 'iqac', school: "IQAC"
                    },
                    component: <>
                        <AQARCheckRadio
                            options={["Academic Administrative Audit (AAA) and follow up action taken", "Confernces, Seminars, Workshops on quality conducted", "Collaborative quality initiatives with other institution(s)", "Orientation programme on quality issues for teachers and students", "Participation in NIRF", "Any other quality audit recognized by state, national or international agencies (ISO Certification, NBA)"]}
                            academicYear={academicYear} radioId={"6.5.2"} school="IQAC"
                        /> <OtherMainTable model="IQACInstitutionQualityAssurance" academicYear={[academicYear]} />  
                    </>
                },
                {
                    id: "6.5.3",
                    share: true,
                    academicYear,
                    title: "6.5.3 - Incremental improvements made for the preceding during the year with regard to quality (in case of first cycle) Post accreditation quality initiatives(second and subsequent cycles)",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '6.5.3', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARTextMatter academicYear={academicYear} school="IQAC" matterType='6.5.3' userType='iqac' />
                },
                {
                    id: "7.1.2",
                    share: true,
                    academicYear,
                    title: "7.1.2 - The Institution has facilities for alternate sources of energy and energy conservation",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '7.1.2', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARCheckRadio
                        options={["Solar energy", "Biogas plant", "Wheeling to the Grid", "Sensor-based energy conservation", "Use of LED bulbs / power-efficient equipment"]}
                        academicYear={academicYear} radioId={"7.1.2"} school={"IQAC"}
                    />

                },
                {
                    id: "7.1.3",
                    share: true,
                    academicYear,
                    title: "7.1.3 - Describe the facilities in the Institution for the management of the following types of degradable and non-degradable waste (within 200 words) 1) Solid waste management 2) Liquid waste management 3) Biomedical waste management 4) E-waste management 5)  Waste recycling system 6) Hazardous chemicals and radioactive waste management",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '7.1.3', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARTextMatter academicYear={academicYear} school={"IQAC"} matterType='7.1.3' userType='iqac' />
                },
                {
                    id: "7.1.4",
                    share: true,
                    academicYear,
                    title: "7.1.4 - Water conservation facilities available in the Institution",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '7.1.4', userType: 'iqac', school: "IQAC"
                    },
                    component: <AQARCheckRadio
                        options={["Rain water harvesting", "Bore well /Open well recharge", "Construction of tanks and bunds", "Waste water recycling", "Maintenance of water bodies and distribution system in the campus"]}
                        academicYear={academicYear} radioId={"7.1.4"} school={"IQAC"}
                    />

                },
            ]
        },
        "Scholarship": {
            title: "Scholarship",
            components: [
                {
                    share: true,
                    academicYear,
                    title: "5.1.1 - Students receiving scholarships",
                    hasSupportingDocument: true,
                    proofData: {
                        academicYear, proofType: '5.1.1', userType: 'other', school: "Scholarship Section"
                    },
                    component: <OtherMainTable model="Scholarship" academicYear={[academicYear]} />
                },
            ]
        }
    }
}


export default otherAQARTablesObject