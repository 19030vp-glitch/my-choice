import React from 'react'
import FileViewer from '../../../components/FileViewer'

const View = ({ proof, serviceName="faculty" }) => {
    return (
        <FileViewer fileName={proof} serviceName={serviceName} />
    )
}

export default View
