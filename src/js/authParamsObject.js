import siteLinks from "../components/siteLinks";
import { setAPDSUser, setDSDUser, setESTTUser, setExamUser, setIILUser, setKRCUser, setNSSUser, setPGUser, setPlacementUser, setSkillUser, setSportsUser, setSwayamUser, setUSHAUser } from "../redux/slices/UserSlice";

const authParamsObject = {
    dsd: { shouldNavigate: true, tokenName: "dsd-token", setUser: setDSDUser, navigationHomeLink: siteLinks.dsdHome.link, navigationLoginLink: siteLinks.dsdLogin.link, model: "DSDUser" },

    krc: { shouldNavigate: true, tokenName: "krc-token", setUser: setKRCUser, navigationHomeLink: siteLinks.krcHome.link, navigationLoginLink: siteLinks.krcLogin.link, model: "KRCUser" },

    sports: { shouldNavigate: true, tokenName: "sports-token", setUser: setSportsUser, navigationHomeLink: siteLinks.sportsHome.link, navigationLoginLink: siteLinks.sportsLogin.link, model: "SportsUser" },

    nss: { shouldNavigate: true, tokenName: "nss-token", setUser: setNSSUser, navigationHomeLink: siteLinks.nssHome.link, navigationLoginLink: siteLinks.nssLogin.link, model: "NSSUser" },

    exam: { shouldNavigate: true, tokenName: "exam-token", setUser: setExamUser, navigationHomeLink: siteLinks.examHome.link, navigationLoginLink: siteLinks.examLogin.link, model: "ExamUser" },

    tpo: { shouldNavigate: true, tokenName: "placement-token", setUser: setPlacementUser, navigationHomeLink: siteLinks.placementHome.link, navigationLoginLink: siteLinks.placementLogin.link, model: "PlacementUser" },

    iil: { shouldNavigate: true, tokenName: "iil-token", setUser: setIILUser, navigationHomeLink: siteLinks.iilHome.link, navigationLoginLink: siteLinks.iilLogin.link, model: "IILUser" },

    skill: { shouldNavigate: true, tokenName: "skill-token", setUser: setSkillUser, navigationHomeLink: siteLinks.skillHome.link, navigationLoginLink: siteLinks.skillLogin.link, model: "SkillUser" },

    pg: { shouldNavigate: true, tokenName: "pg-token", setUser: setPGUser, navigationHomeLink: siteLinks.pgHome.link, navigationLoginLink: siteLinks.pgLogin.link, model: "PGUser" },

    apds: { shouldNavigate: true, tokenName: "apds-token", setUser: setAPDSUser, navigationHomeLink: siteLinks.apdsHome.link, navigationLoginLink: siteLinks.apdsLogin.link, model: "APDSUser" },

    swayam: { shouldNavigate: true, tokenName: "swayam-token", setUser: setSwayamUser, navigationHomeLink: siteLinks.swayamHome.link, navigationLoginLink: siteLinks.swayamLogin.link, model: "SwayamUser" },

    estt: { shouldNavigate: true, tokenName: "estt-token", setUser: setESTTUser, navigationHomeLink: siteLinks.esttHome.link, navigationLoginLink: siteLinks.esttLogin.link, model: "ESTTUser" },

    usha: { shouldNavigate: true, tokenName: "usha-token", setUser: setUSHAUser, navigationHomeLink: siteLinks.ushaHome.link, navigationLoginLink: siteLinks.ushaLogin.link, model: "USHAUser" }


};


export default authParamsObject;