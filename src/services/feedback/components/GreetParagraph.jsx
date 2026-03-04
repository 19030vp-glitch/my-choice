const GreetParagraph = ({ userType }) => {

    const paragraphs = {
        employer: <div> <p>Dear Employer,</p>
            <p> We extend our heartfelt gratitude to you for providing numerous employment opportunities to our graduates at your esteemed Company/Organization. We kindly request you to take a moment of your valuable time to fill out this feedback form. Your input will greatly assist us in enhancing our Institution further and enable us to offer you exceptional employees in the future.</p></div>,


        parent: <div> <p>Dear Parent,</p> <p>Thank you for considering our University for your ward's Higher Education. We value your feedback on how the syllabus of the chosen Programme has been beneficial. Your insights will greatly help us in enhancing our educational offerings to better serve our students and their future success. We sincerely appreciate your participation in this feedback process.</p></div>,


        alumni: <div> <p>Dear Esteemed Alumni,</p>
            <p>
                We sincerely value your association with the University and would be extremely grateful if you could take a few minutes to share your valuable feedback with us. Your insights and experiences as an alumnus play a vital role in shaping the future of our university and improving the overall learning environment. We sincerely appreciate your participation in this feedback process. </p></div>,

        studentSurvey: <div>
            <p>Greetings to all our students. </p>
            <p>
                Your feedback is essential for us to enhance your learning environment. Please take a moment to share your candid responses in our student satisfaction survey to make a positive impact.
            </p>
        </div>,
        upmsc: <div>
            <p>Greetings to all our students. </p>
            <p>
                Your feedback is essential for us to enhance your learning environment. Please take a moment to share your candid responses in our UPSC-MPSC Foundation Course to make a positive impact.
            </p>
        </div>
    }

    return <div className='bg-blue-50 p-2 text-xs sm:text-sm md:text-base rounded-md text-blue-900'> {paragraphs[userType]}</div>
}

export default GreetParagraph