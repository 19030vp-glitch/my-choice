import React from 'react'
import GoBack from '../../../components/GoBack'
import { skillsAuthParams } from './SkillsHome'
import siteLinks from '../../../components/siteLinks'
import useOtherServiceAuth from '../../../hooks/useOtherServiceAuth'
import title from '../../../js/title'
import OtherMainTable from '../../../components/OtherMainTable'

const SkillFillData = () => {
  useOtherServiceAuth({ ...skillsAuthParams, shouldNavigate: false })
  const bredLinks = [siteLinks.welcome, siteLinks.skillHome, siteLinks.skillFillData]
  title(siteLinks.skillFillData.title)

  return (
    <div>
      <GoBack pageTitle={siteLinks.skillFillData.title} bredLinks={bredLinks} />
      <div className="mt-4">
      <OtherMainTable model="CounselingAndGuidance" extraInitialFilds={{ otherUser: "Skill", SchoolName: "Centre for Competitive Exams, Training & Skills Development" }}  />
      </div>
    </div>
  )
}

export default SkillFillData
