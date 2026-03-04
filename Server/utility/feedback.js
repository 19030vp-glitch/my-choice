const Feedback = require("../models/utility-models/feedback")

function feedback(app) {

    app.post('/api/userFeedback', function(req, res){
        const {email, feedback} = req.body
        const newFeedback = new Feedback({email, feedback})
        newFeedback.save()

        if(newFeedback){
            res.send({status: 'success', data: newFeedback})
        }
        else{
            res.send({status: 'error', error: 'Could not send feedback, please try again later.'})
        }
    })


}




module.exports = feedback