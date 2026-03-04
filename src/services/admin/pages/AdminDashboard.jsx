import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, ArcElement, Title, Legend, Tooltip } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import getDocumentCount from '../../../components/requestComponents/getDocumentCount';

///icons
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import VideoChatRoundedIcon from '@mui/icons-material/VideoChatRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import getDepartmentWiseDocumentCount from '../../../components/requestComponents/getDocumentDepartmentwise';
import { scrollToSection } from '../../dashboard/pages/AllDepartments';

ChartJs.register(
  ArcElement, Title, Legend, Tooltip, BarElement, CategoryScale, LinearScale,
)

const Btn = styled(Button)({
  textTransform: 'none'
});

const AdminDashboard = () => {

  //main dashboard Count ststes
  const [count, setCount] = useState({ facltyCount: 0, directorCount: 0, alumniCount: 0, studentCount: 0, booksAndChaptersCount: 0, researchProjectsCount: 0, petantCount: 0, eContentDevelopedCount: 0, conferenceOrganizedCount: 0, invitedTalkCount: 0, researchGuidanceCount: 0, researchPapersCount: 0, fellowshipCount: 0 })

  const { facltyCount, alumniCount, studentCount, booksAndChaptersCount, researchProjectsCount, petantCount, eContentDevelopedCount, conferenceOrganizedCount, invitedTalkCount, researchGuidanceCount, researchPapersCount, fellowshipCount, } = count


  //student Count States
  const studentDPartObj = { compCount: 0, chemiCount: 0, managementCount: 0, eduCount: 0, mathCount: 0, phyCount: 0, socialCount: 0, socialLaturCount: 0, earthCount: 0, lifeCount: 0, mediaCount: 0, pharmaCount: 0, fineCount: 0, langCount: 0, managementLaturCount: 0, techLaturCount: 0, }

  const [departmentWiseStudentCount, setDepartmentWiseStudentCount] = useState(studentDPartObj);

  const { compCount, chemiCount, managementCount, eduCount, mathCount, phyCount, socialCount, socialLaturCount, earthCount, lifeCount, mediaCount, pharmaCount, fineCount, langCount, managementLaturCount, techLaturCount, } = departmentWiseStudentCount

  const [activeButton, setActiveButton] = useState("faculty");
  const [activeModel, setActiveModel] = useState("User");
  const [activeProperty, setActiveProperty] = useState("department");
  const [activeName, setActiveName] = useState("Faculties");
  const [activeChart, setActiveChart] = useState("bar");

  const categories = [
    { Icon: <PersonRoundedIcon style={{ fontSize: '25px', }} />, name: "Faculties", Count: facltyCount, active: "faculty", model: "User", property: "department" },
    // { Icon: <LocalLibraryRoundedIcon style={{ fontSize: '25px', }} />, name: "Directors", Count: directorCount, active: "director", model: "DirectorUser", property: "department" },
    { Icon: <BoyRoundedIcon style={{ fontSize: '25px', }} />, name: "Alumni", Count: alumniCount, active: "alumni", model: "AlumniUser", property: "schoolName" },
    { Icon: <SchoolRoundedIcon style={{ fontSize: '25px', }} />, name: "Students", Count: studentCount, active: "student", model: "StudentUser", property: "schoolName" }
  ]

  const SubMenuCards = [
    { Icon: <AutoStoriesRoundedIcon style={{ fontSize: "20px" }} />, name: "Book & Chapters", Count: booksAndChaptersCount, active: "bookchapters", model: "BooksAndChapters", property: "userId.department" },
    { Icon: <StickyNote2RoundedIcon style={{ fontSize: "20px" }} />, name: "Research Papers", Count: researchPapersCount, active: "reserchpapers", model: "ResearchPaper", property: "userId.department" },
    { Icon: <ScienceRoundedIcon style={{ fontSize: "20px" }} />, name: "Research Projects", Count: researchProjectsCount, active: "reserchprojects", model: "ResearchProject", property: "userId.department" },
    { Icon: <LanguageRoundedIcon style={{ fontSize: "20px" }} />, name: "Econtent Developed", Count: eContentDevelopedCount, active: "econtentdeveloped", model: "EContentDeveloped", property: "userId.department" },
    { Icon: <BookmarkAddedRoundedIcon style={{ fontSize: "20px" }} />, name: "Patents Published", Count: petantCount, active: "petantspublished", model: "Patent", property: "userId.department" },
    { Icon: <VideoChatRoundedIcon style={{ fontSize: "20px" }} />, name: "Conference Organized", Count: conferenceOrganizedCount, active: "conferenceorganized", model: "ConferenceOrganized", property: "userId.department" },
    { Icon: <LightbulbRoundedIcon style={{ fontSize: "20px" }} />, name: "Invited Talks", Count: invitedTalkCount, active: "invitedtalks", model: "InvitedTalk", property: "userId.department" },
    { Icon: <CardMembershipRoundedIcon style={{ fontSize: "20px" }} />, name: "Research Guidance", Count: researchGuidanceCount, active: "reserchguidence", model: "PhdAwarded", property: "userId.department" },
    { Icon: <AttachMoneyRoundedIcon style={{ fontSize: "20px" }} />, name: "Fellowships", Count: fellowshipCount, active: "fellowships", model: "Fellowship", property: "userId.department" },
  ]

  const data = {
    labels: ["Computational Sciences", "Chemical Sciences", "Commerce and Management Sciences", "Educational Sciences", "Mathematical Sciences", "Physical Sciences", "Social Sciences", "Earth Sciences", "Life Sciences", "Pharmacy", "Media Studies", "Fine and Performing Arts", "Language, Literature and Culture", "Management Sciences, Sub-Campus, Latur", "Technology, Sub-Campus, Latur", "Social Sciences, Sub-Campus, Latur"],
    datasets: [
      {
        label: `${activeName}`,
        // data :[876, 374, 421, 782, 652, 256, 390, 918, 312, 563, 849, 237, 666, 223, 621, 848], //dummy data for testing
        data: [
          compCount, chemiCount, managementCount, eduCount, mathCount, phyCount, socialCount, earthCount, lifeCount, pharmaCount, mediaCount, fineCount, langCount, managementLaturCount, techLaturCount, socialLaturCount,
        ],
        backgroundColor: ["#a57c1b", "#ffb400", "#363445", "#5e569b", "#9080ff", "#54bebe", "#dedad2", "#e4bcad", "#df979e", "#d7658b", "#63bff0", "#e2e2e2", "#e1a692", "#cbd6e4", "#df8879", "#f4f100"
        ],
        // ["#FADADD", "#F08080", "#FFDAB9", "#FFFACD", "#FFFFE0", "#98FB98", "#B0E0E6", "#87CEEB", "#E6E6FA", "#D8BFD8", "#FFE4E1", "#FDF5E6", "#FAEBD7", "#FFFFF0", "#F5F5DC", "#D3D3D3",],
        borderColor: ["#704e10", "#a87500", "#1f1b27", "#3e3773", "#574daa", "#319b9b", "#a8a69f", "#b1886d", "#b2645a", "#9e4e6c", "#2b8ebc", "#b0b0b0", "#b87762", "#8a9cb2", "#b15a4a", "#b2a000"],
        // ["#F5A3AC", "#CD5C5C", "#FFC58A", "#F0E68C", "#EEDC82", "#9ACD32", "#ADD8E6", "#6495ED", "#BA55D3", "#B57EDC", "#FFC0CB", "#ECD5C5", "#FFE4B5", "#F0E68C", "#F5DEB3", "#C0C0C0",],
        hoverOffset: 5,
        borderWidth: 2,
        cutout: "75%",
        // borderRadius: 15,
        // offset: 8,
      },
    ],
  };

  const Scale = activeChart === "bar" ? {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: true
      }
    }
  } : ""


  const options = {
    layout: { padding: 30 },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // position: 'right',

      },
      title: {
        display: false,
        // text: `${activeName}`,
      },
    },
    scales: Scale
  };

  const DoughnutLabelsLine = {
    id: "doughnutLabelsLine",
    afterDraw(chart, args, options) {
      const { ctx, chartArea: { width, height } } = chart;
      const a = chart.getDatasetMeta(0).data[0].x
      const b = chart.getDatasetMeta(0).data[0].y
      ctx.fillText(chart.data.datasets[0].label, a, b)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '12px Arial';
      ctx.fillStyle = "#767474";
      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((datapoint, index) => {

          if (window.innerWidth >= 1000) {
            if (dataset.data[index] !== 0) {
              //line
              const { x, y } = datapoint.tooltipPosition();
              const halfWidth = width / 2;
              const halfHeight = height / 2;
              const xLine = x >= halfWidth ? x + 40 : x - 40;
              const yLine = y >= halfHeight ? y + 40 : y - 40;
              const extraLine = x >= halfWidth ? 20 : -20;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(xLine, yLine);
              ctx.lineTo(xLine + extraLine, yLine);
              ctx.strokeStyle = "#767474";
              ctx.stroke();
              //labels
              const halfTextWidth = ctx.measureText(chart.data.labels[index]).width / 2;
              const extraPadding = x >= halfWidth ? halfTextWidth + 5 : -(halfTextWidth + 5);
              ctx.fillText(chart.data.labels[index], xLine + extraLine + extraPadding, yLine);
            }
          }
        })
      });
    }
  }

  const plugins = [DoughnutLabelsLine];

  useEffect(() => {
    getDocumentCount({ model: '', setState: setCount })

  }, []);

  useEffect(() => {
    getDepartmentWiseDocumentCount({ model: activeModel, setState: setDepartmentWiseStudentCount, property: activeProperty })

  }, [activeModel, activeProperty]);

  return (
    <div style={{ width: "100%", overflow: "hidden", border: "solid #d8dadb 1px", background: "#FFF" }} >
      <div className='table-responsive p-3' style={{ display: "flex", gap: "15px", margin: "10px 17px", background: "#f1f3f4", borderRadius: "25px" }}>
        {
          categories?.map((item, index) => <button onClick={() => { setActiveButton(item.active); setActiveModel(item.model); setActiveProperty(item.property); setActiveName(item.name); scrollToSection("chart") }} key={index} className={`adminDashbordCard ${activeButton === item.active ? 'active-dashbord-card' : ''}`}  >

            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px" }}>
              <div style={{ paddingLeft: "25PX", }}>{item.Icon}</div>
              <div style={{ paddingRight: "33PX", fontSize: "17px", fontWeight: 500, }}>{item.Count}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div></div>
              <div style={{ paddingRight: "33PX", fontSize: "13px", fontWeight: 500, }}>
                {item.name}
              </div>
            </div>
          </button>)
        }
      </div>
      <div>
        <div className='table-responsive' style={{ width: "100%", padding: "3px 20px 10px 20px", display: "flex" }}>

          <div style={{ minWidth: "760px", padding: "5px 10px", background: "#f1f3f4", borderRadius: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {
              SubMenuCards?.map((ItemCards, index) => <button key={index} onClick={() => { setActiveButton(ItemCards.active); setActiveModel(ItemCards.model); setActiveProperty(ItemCards.property); setActiveName(ItemCards.name); scrollToSection("chart") }} className={`sub-menu-card ${activeButton === ItemCards.active ? 'sub-menu-card-active' : ''}`}>
                <div style={{ fontSize: "15px", fontWeight: 800, padding: "3px 20px", display: "flex", justifyContent: "space-between" }}>{ItemCards.Icon}<div>{ItemCards.Count}</div></div>
                <div className='flex justify-center text-[11px]'><div>{ItemCards.name}</div></div>
              </button>
              )
            }

          </div>
        </div>
      </div>

      <div className='chart-button-section'>
        <Btn className={`${activeChart === "bar" ? "activeChartBtn" : ""}`} onClick={() => { setActiveChart("bar"); scrollToSection("chart") }} startIcon={<BarChartIcon />} sx={{ background: "#f1f3f4", borderRadius: "10px", color: "#ae7e28" }} >
          Bar Chart
        </Btn>
        <Btn className={`${activeChart === "pie" ? "activeChartBtn" : ""}`} onClick={() => { setActiveChart("pie"); scrollToSection("chart") }} startIcon={<PieChartIcon />} sx={{ background: "#f1f3f4", borderRadius: "10px", color: "#ae7e28" }} >Pie Chart</Btn>
      </div>

      <section id="chart" className='section-pie'>
        <div >
          {activeChart === "pie" ? <Doughnut data={data} options={options} plugins={plugins} style={{ maxHeight: "550px" }} /> : <Bar data={data} options={options} />}
        </div>
      </section>

    </div>
  )
}

export default AdminDashboard