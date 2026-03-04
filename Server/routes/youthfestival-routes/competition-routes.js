const fs = require('fs');
const express = require('express');
const router = express.Router();
const YfCompetition = require('../../models/youth-festival/yfCompetitionSchema.js');
const YfStudent = require('../../models/youth-festival/yfStudentSchema');
const { ObjectId } = require('mongoose').Types;

router.post('/youthfestival/competition/add', async (req, res) => {
    try {
        const { college, selectedStudents, competitionName, academicYear, isGroup, isEdit, alreadySelectedStudents, edit, compId } = req.body;

        let competition;
        const filter = { college: college._id, competitionName }

        if (!isGroup) {
            try {
                const existingCompetition = await YfCompetition.findOne(filter);

                if (existingCompetition) {
                    existingCompetition.academicYear = academicYear;
                    existingCompetition.isGroup = isGroup;
                    existingCompetition.students = selectedStudents;
                    await existingCompetition.save();
                } else {
                    competition = new YfCompetition({
                        college: college._id,
                        competitionName,
                        academicYear,
                        isGroup,
                        students: selectedStudents,
                    });

                    await competition.save();
                }

                if (isEdit) {
                    await removeCompetitionFromStudents(alreadySelectedStudents, existingCompetition?._id,)
                    await addIDtoStudent(selectedStudents, existingCompetition)

                } else {
                    await addIDtoStudent(selectedStudents, existingCompetition, competition)
                }
                res.send({ status: 'success', message: 'Student added successfully to the individual competition' });
            } catch (error) {
                res.send({ status: 'error', message: 'Could not add student to competition' });
            }

        } else {
            if (edit) {
                const filter = { _id: compId }
                const existingCompetition = await YfCompetition.findOne(filter);
                existingCompetition.students = selectedStudents;
                await existingCompetition.save();

                await removeCompetitionFromStudents(alreadySelectedStudents, existingCompetition?._id,)
                await addIDtoStudent(selectedStudents, existingCompetition)
                res.send({ status: 'success', message: "Students Edited successfully" })
            } else {
                try {
                    competition = new YfCompetition({
                        college: college._id,
                        competitionName,
                        academicYear,
                        isGroup,
                        students: selectedStudents,
                    });

                    await competition.save();
                    await addIDtoStudent(selectedStudents, null, competition)

                    res.send({ status: 'success', message: 'Student added successfully to the group competition' });
                } catch (error) {
                    res.send({ status: 'error', message: 'Could not add student to competition' });
                }
            }

        }


    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', message: 'An error occurred while processing the request.' });
    }
});

router.post('/youtfestival/delete/competition', async (req, res) => {
    const { compId } = req.body
    const comp = await YfCompetition.findOne({ _id: compId });
    if (comp) {
        await removeCompetitionFromStudents(comp?.students, compId)
        await comp.delete()
        res.send({ status: 'success', message: 'Competition deleted' })
    } else {
        res.send({ status: 'error' })
    }
})

router.post('/youthfestival/get/competitionData', async (req, res) => {
    const { model, filter } = req.body;
    const docs = await YfCompetition.find(filter).sort({ createdAt: -1 }).populate('students').exec();
    const data = docs.filter((item) => item.students.length > 0)
    res.send({ status: 'success', data: data })
})

router.post('/youthfestival/get/student/select', async (req, res) => {
    const { filter, isGroup, competitionId } = req.body;
    const docs = await YfCompetition.findOne(filter).populate('students').exec();
    res.send({ status: 'success', data: docs })
})

router.post('/youthfestival/delete/student', async (req, res) => {
    const { studentId } = req.body;
    const student = await YfStudent({ _id: studentId })
    if (student) {
        const competitions = student.competitions

        try {
            const updatePromises = competitions.map(async (compId) => {
                const competition = await YfCompetition.findById({ _id: compId });

                if (!competition) {
                    console.error(`Competition with ID ${compId} not found.`);
                    return null;
                }

                // Remove the competitionId from the student's competitions array
                competition.students = competition.students.filter((id) => id.toString() !== studentId.toString());

                // Save the updated student document
                return competition.save();
            });

            const updatedCompetition = await Promise.all(updatePromises);

            // Handle errors or null values in updatedStudents as needed
            const errors = updatedCompetition.filter((updatedStudent) => updatedStudent === null);
            if (errors.length > 0) {
                console.error(`There were ${errors.length} errors when updating students.`);
            }
            await student.delete()
            res.send({ status: 'success' })
        } catch (error) {
            console.error(error);
            throw error; // You can handle the error as needed
        }


    } else {
        res.send({ status: 'error' })
    }
})


module.exports = router;

async function addIDtoStudent(selectedStudents, existingCompetition, competition) {
    if (selectedStudents && selectedStudents.length > 0) {
        const studentPromises = selectedStudents.map(async (studentId) => {
            const student = await YfStudent.findById(studentId);

            if (student) {
                student.competitions.push(existingCompetition ? existingCompetition._id : competition._id);
                let arr = student.competitions
                const uniqueIds = new Set(arr.map(id => id.toString()));

                // Convert the Set back to an array of ObjectIds
                const uniqueIdArray = [...uniqueIds].map(id => new ObjectId(id));
                student.competitions = uniqueIdArray
                return student.save();
            } else {
                console.error(`Student with ID ${studentId} not found.`);
                return null;
            }
        });

        const savedStudents = await Promise.all(studentPromises);

        const errors = savedStudents.filter((savedStudent) => savedStudent === null);
        if (errors.length > 0) {
            console.error(`There were ${errors.length} errors when saving students.`);
        }
    }
}

async function removeCompetitionFromStudents(selectedStudents, competitionId) {
    try {
        const updatePromises = selectedStudents.map(async (studentId) => {
            const student = await YfStudent.findById(studentId);

            if (!student) {
                console.error(`Student with ID ${studentId} not found.`);
                return null;
            }

            // Remove the competitionId from the student's competitions array
            student.competitions = student.competitions.filter((id) => id.toString() !== competitionId.toString());

            // Save the updated student document
            return student.save();
        });

        const updatedStudents = await Promise.all(updatePromises);

        // Handle errors or null values in updatedStudents as needed
        const errors = updatedStudents.filter((updatedStudent) => updatedStudent === null);
        if (errors.length > 0) {
            console.error(`There were ${errors.length} errors when updating students.`);
        }

        return updatedStudents;
    } catch (error) {
        console.error(error);
        throw error; // You can handle the error as needed
    }
}

