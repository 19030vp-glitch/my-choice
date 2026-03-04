
const tables = [
    {
        name: 'Qualifications',
        columns: [
            'Exams', 'Institute/Board', 'Year', 'Percentage', 'Subjects',
        ],
    },
    {
        name: 'Degrees',
        columns: [
            'Degree', 'Title', 'University', 'Award Year', 'Proof',
        ],
    },
    {
        name: 'Lectures',
        columns: ['Sr No', 'Course/Paper', 'Teaching Mode', 'No of classes alloted per week', '% of classes taken as per documented record', 'Year', 'Upload Attendance',],
    }



];


const Years = ['2016-17','2017-18','2018-19','2019-20', '2020-21', '2021-22', '2022-23']

// generate years
const now = new Date().getUTCFullYear();  
const yearsToShow = 15
const FacultyYears = Array(now - (now - yearsToShow)).fill('').map((v, idx) => `${now - (idx+1)}-${(now - idx).toString().slice(2, 4)}`);



export { tables, Years };