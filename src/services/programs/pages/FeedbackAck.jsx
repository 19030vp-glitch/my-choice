import React from 'react'
import Acknowledgement from '../../../components/Acknowledgement'
import GoBack from '../../../components/GoBack'
import title from '../../../js/title'
import { useLocation } from 'react-router-dom'
import Footer from '../../../components/Footer'

const FeedbackAck = () => {

    title('Successfull Feedback Submission')

    const location = useLocation();
    const program = location.state;

    return (
        <div>
            <GoBack pageTitle="Program Feedback Acknowledgment" backUrl="/" />
            <Acknowledgement title="Feedback Sent Successfully" navigateTo="/" >


                {
                    program ? <div>
                        <div>
                            <p>Thank you for your successful feedback submission for the program titled
                                <p className="text-lg">
                                    "<b className="text-green-800">{program?.title}</b>"
                                </p>
                            </p>

                            <p className="my-4">
                                Your input is greatly appreciated and will help us enhance our programs and services. We look forward to serving you again in the future. Your feedback makes a difference!
                            </p>

                        </div>
                    </div> : <p className="my-5 text-center">Sorry, this page is not available. The session has expired.</p>
                }
            </Acknowledgement>

            <div className="mt-5">
                <Footer />
            </div>


        </div>
    )
}

export default FeedbackAck
