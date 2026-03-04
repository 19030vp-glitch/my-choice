import React from 'react'
import { Link } from 'react-router-dom'
import Bred from '../components/Bred'
import Footer from '../components/Footer'
import siteLinks from '../components/siteLinks'
import title from '../js/title'
import { Result } from 'antd'
import GoBack from '../components/GoBack'
const PageNotFound = () => {
    let links =
        title("Page Not Found")
    return (
        <div>
            <GoBack pageTitle="Page Not Found" bredLinks={[siteLinks.welcome, { title: 'Page Not Found', link: '/*' }]} />

            <div className='h-screen'>
                <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
                <p className="mb-5 text-center"><Link to='/' className='text-blue-500 underline-none bg-blue-50 rounded-full py-2 px-5'>Take me Home</Link> </p>
            </div>

            <Footer />
        </div>
    )
}

export default PageNotFound