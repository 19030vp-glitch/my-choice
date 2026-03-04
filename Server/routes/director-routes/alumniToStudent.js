const Alumni = require('../../models/alumni-models/alumniUserSchema')
const Student = require('../../models/student-models/studentUserSchema')
const fs = require('fs')
const path = require('path');


const alumniToStudent = async () => {

    const AllAlumni = await Alumni.find({})

    const failedAlumni = []

    console.log("Alumni :", AllAlumni[0])

    AllAlumni.forEach(async (alumni, index) => {
        const { _id, salutation, photoURL, name, email, mobile, gender, schoolName, password, programGraduated,
            address, dob, doStarted, cast, religion, country, abcNo, doCompleted, Upload_Proof, isAlumni } = alumni

        let newStudentSchema = {
            _id: _id,
            salutation,
            photoURL,
            name,
            email,
            mobile,
            gender,
            schoolName,
            password,
            programGraduated: Array.isArray(programGraduated) ? programGraduated[0] : programGraduated,
            address: address || null,
            dob: dob || null,
            programEnroledOn: doStarted || null,
            cast: cast || null,
            religion: religion || null,
            country: country || null,
            abcNo: abcNo || null,
            doCompletion: doCompleted || null,
            alumniProof: Upload_Proof,
            isAlumni: isAlumni || true
        }

        const newStudent = await new Student(newStudentSchema)

        newStudent.save().then((createdStudent) => {
            if (createdStudent) {

                try {
                    const sourceFilePath = path.join(__dirname, `../../uploads/faculty-uploads/${photoURL}`)
                    const destinationFilePath = path.join(__dirname, `../../uploads/student-uploads/${photoURL}`)

                    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
                        if (err) {
                            console.error('Error moving file:', err);
                        } else {
                            console.log('File moved successfully!');
                        }
                    });
                } catch (error) {
                    console.log('Error moving photoURL, file not found',);
                }

                try {
                    const sourceFilePath2 = path.join(__dirname, `../../uploads/faculty-uploads/${Upload_Proof}`)
                    const destinationFilePath2 = path.join(__dirname, `../../uploads/student-uploads/${Upload_Proof}`)

                    fs.copyFile(sourceFilePath2, destinationFilePath2, (err) => {
                        if (err) {
                            console.error('Error moving file:', err);
                        } else {
                            console.log('File moved successfully!');
                        }
                    });
                } catch (error) {
                    console.log('Error moving alumni proof, file not found',);

                }




            }
            else {
                failedAlumni.push(alumni)
            }
        })
    })



    console.log('=================================================================================================================================================These are the failed alumni:', failedAlumni, "===============================================================================================================================================")





}


module.exports = { alumniToStudent }