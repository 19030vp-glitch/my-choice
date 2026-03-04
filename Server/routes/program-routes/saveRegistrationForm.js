const RegistrationResponse = require('../../models/program-models/registrationResponses');
const ProgramFeedback = require('../../models/program-models/programFeedback');
const ProgramModel = require('../../models/program-models/program');

async function registrationForm(app) {
    app.post('/program/registration', async (req, res) => {
        const { formData, programId } = req.body;

        try {
            // Check if the program exists
            const program = await ProgramModel.findById(programId);
            if (!program) {
                return res.send({ status: 'error', message: "Could not found the program, it doest not exist at the moment." });
            }

            // Create a new registration response
            const response = new RegistrationResponse({
                response: JSON.stringify(formData),
                program: programId,
            });

            // Save the registration response
            const savedResponse = await response.save();

            // Update the program's registrationResponse array
            program.registrationResponse.push(savedResponse._id);
            await program.save();

            return res.send({ status: 'success', message: 'Registration response saved successfully' });
        } catch (error) {
            console.error('Error:', error);
            return res.send({ status: 'error', message: `Server Error: ${error} ` });
        }
    });

    app.post('/program/feedback', async (req, res) => {
        const { formData, programId } = req.body;

        try {
            // Check if the program exists
            const program = await ProgramModel.findById(programId);
            if (!program) {
                return res.send({ status: 'error', message: "Could not found the program, it doest not exist at the moment." });
            }

            // Create a new registration response
            const response = new ProgramFeedback({
                response: JSON.stringify(formData),
                program: programId,
            });

            // Save the registration response
            const savedResponse = await response.save();

            // Update the program's registrationResponse array
            program.programFeedback.push(savedResponse._id);
            await program.save();

            return res.send({ status: 'success', message: 'Feedback sent successfully' });
        } catch (error) {
            console.error('Error:', error);
            return res.send({ status: 'error', message: `Server Error: ${error} ` });
        }
    });

    app.post('/programs/getRegistrations', async (req, res) => {
        try {
            const { filter } = req.body;
            let data = await RegistrationResponse.find({ filter }).lean().sort({ createdAt: -1 })
            res.send({ status: 'success', data })
        } catch (error) {
            res.send({ status: 'error', error })
        }
    })

    app.post('/program/registration/toggleResponseAcceptance', async (req, res) => {
        const { programId } = req.body;
        ProgramModel.findOne({ _id: programId }, (err, program) => {
            if (err) {
                console.error(err);
                res.send({ status: 'error', err })

            } else if (program) {
                program.acceptingResponses = !program.acceptingResponses;

                program.save((err, updatedProgram) => {
                    if (err) {
                        console.error(err);
                        res.send({ status: 'error', message: 'Error toggling...' })
                    } else {
                        res.send({ status: 'success', message: updatedProgram?.acceptingResponses ? 'Registration form is enabled' : 'Registration form is disabled.' })
                    }
                });
            } else {
                console.log("Program not found");
                res.send({ status: 'error', message: 'Program not found' })
            }
        });
    })
}

module.exports = registrationForm;
