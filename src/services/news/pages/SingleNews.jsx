import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchSingleItem } from '../js/fetchNews'
import UserLoading from '../../../pages/UserLoading'
import serverLinks from '../../../js/serverLinks'
import Header from '../components/Header'
import moment from 'moment'
import FileViewer from '../../../components/FileViewer'
import title from '../../../js/title'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import NewsCorousel from '../components/NewsCorousel'

const SingleNews = () => {

    const { newsId } = useParams()

    let param = { newsId }
    const { data, isLoading, isError, error, refetch } = useQuery(['News', param.newsId], () => fetchSingleItem(param))

    title(data?.data?.data ? data?.data?.data.headline : 'News Viewer')
    const [copied, setCopied] = useState(false)

    const copyNews = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('News URL copied successfully')
        setCopied(true)

    }

    return (
        <div>
            <Header showSearch={false} title={"News"} />
            {
                !isLoading ? data?.data?.data && <div>

                    <div className='my-3 w-full'>
                        <div>
                            <div className='mt-3 bg-gray-100 p-3 border rounded-md'>
                                <div>

                                    <div className='flex items-start gap-2 justitfy-start mt-1'>
                                        <span className='bg-orange-100 border rounded-md text-orange-900 flex items-center justify-start gap-1 whitespace-nowrap md:text-sm text-xs px-1'>
                                            <InsertInvitationRoundedIcon sx={{ fontSize: '15px' }} /> <div><span>{moment(data?.data?.data?.date, "YYYY-MM-DD").format("DD/MM/YYYY")}</span>
                                            </div>
                                        </span>
                                        <span onClick={copyNews} className='flex items-center justify-start gap-1 bg-green-100 border rounded-md hover:bg-green-200 text-green-900 cursor-pointer md:text-sm text-xs px-1'>
                                            {
                                                !copied ? <ContentCopyIcon sx={{ fontSize: '15px' }} /> :
                                                    <AssignmentTurnedInIcon sx={{ fontSize: '15px' }} />
                                            }

                                            Copy News link</span>
                                    </div>

                                    <p className="text-base font-semibold text-start lg:text-2xl md:text-xl sm:text-md mt-3">{data?.data?.data.headline}</p>
                                </div>

                                <div>
                                    <p className="md:text-base text-sm text-start w-full mt-3">{data?.data?.data.desc}</p>
                                </div>

                                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {data?.data?.data?.photoURL.map((item) => (
                                        <div key={item} className="relative">
                                            <FileViewer fileName={item} serviceName="news">
                                                <img
                                                    src={serverLinks.showFile(item, 'news')}
                                                    className="w-full h-48 object-cover cursor-pointer hover:brightness-75 ease-in-out duration-200 border-2 border-blue-400 rounded-lg"
                                                    alt="News Thumbnail"
                                                />
                                            </FileViewer>
                                        </div>
                                    ))}
                                </div>


                            </div>


                        </div>
                    </div>
                </div> : <UserLoading title="Getting news" />
            }
        </div>
    )
}

export default SingleNews