import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import fetchAQARMatter, { saveAQARMatter } from '../js/fetchAQARMatter'
import UserLoading from '../../../pages/UserLoading'
import { Editor } from '@tinymce/tinymce-react'
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'

const AQARTextMatter = ({ academicYear, matterType, userType, school, isAdmin }) => {

    const [matter, setMatter] = useState({ content: '' })
    const [matters, setMatters] = useState(null)
    const editorRef = useRef(null);

    const filter = isAdmin ? { academicYear: academicYear, userType, matterType } : { academicYear: academicYear, userType, matterType, school: school || null }

    const { data, isLoading, refetch } = useQuery(`Matter-${matterType}-${academicYear}-${school || 'admin'}`, () => fetchAQARMatter(filter, isAdmin), { refetchOnWindowFocus: false })

    const handleBlur = () => {
        // if (editorRef.current) {
        //     submitMatter({ content: editorRef.current.getContent() })
        // }

        if (matter) {
            submitMatter(matter)
        }

    };


    const submitMatter = (contentMatter) => {

        const formData = {
            matter: JSON.stringify(contentMatter), userType, matterType, academicYear, school
        }

        saveAQARMatter(formData, refetch)

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {

            if (isAdmin) {
                setMatters(data?.data?.data)
            } else {
                setMatter(JSON.parse(data?.data?.data?.matter) || { content: '' })
            }
        }


    }, [data])


    return <div>
        {isLoading ? <UserLoading title="Getting data" /> : <form>
            {
                !isAdmin ? <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-3 p-3">
                    <div style={{ height: '350px', overflowY: 'auto' }}>
                        <ReactQuill
                            theme="snow" // You can change the theme as needed
                            value={matter}
                            onChange={(html) => {
                                setMatter(() => html);
                            }}
                            onBlur={handleBlur}
                            placeholder='Start typing here...'
                            className='h-[87%]'
                        />
                    </div>
                </div> : <div className="bg-gray-50 rounded-md p-3 mt-3 border">
                    {
                        matters && matters?.length > 0 ? <div >
                            <p className='text-semibold mb-3 font-medium'>School / Department wise content / write-up:</p>
                            <div className="max-h-72 overflow-y-scroll">
                                <table className="table table-responsive table-bordered ">
                                    <thead className="bg-primary text-white">
                                        <tr>
                                            <th>School / Department Name </th>
                                            <th>Content / write-up</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            matters?.map((matter) => {

                                                console.log("matter", matter)
                                                return <tr>
                                                    <td>
                                                        {matter?.school}
                                                    </td>
                                                    <td>
                                                        <div dangerouslySetInnerHTML={{ __html: JSON.parse(matter.matter) }} />
                                                    </td>

                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div> : <div>
                            <p className="text-center my-3 text-yellow-500">No data available</p>
                        </div>
                    }
                </div>
            }

        </form>}
    </div>
}

export default AQARTextMatter