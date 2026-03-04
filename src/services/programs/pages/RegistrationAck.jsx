import React from 'react'
import Acknowledgement from '../../../components/Acknowledgement'
import GoBack from '../../../components/GoBack'
import title from '../../../js/title'
import { useLocation } from 'react-router-dom'
import Footer from '../../../components/Footer'

const RegistrationAck = () => {

    title('Successfull Program Registration')

    const location = useLocation();
    const program = location.state;

    return (
        <div>
            <GoBack pageTitle="Program Registration Acknowledgment" backUrl="/" />
            <Acknowledgement title="Registration Successfull" navigateTo="/" >


                {
                    program ? <div>
                        <div>
                            <p>Thank you for your successful registration for the program titled
                                <p className="text-lg">
                                    "<b className="text-green-800">{program?.title}</b>"
                                </p>
                            </p>
                            <p className='my-3'>Date of the Program:
                                <p className="text-lg">
                                    <b className="text-green-800"> {program?.programDate} </b>
                                </p>
                                <p className="mt-4">Organized by -- <b> {program?.arrangedBy} </b> </p>
                                <p> on the venue -- <b> {program?.venue} </b> </p>
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

export default RegistrationAck
