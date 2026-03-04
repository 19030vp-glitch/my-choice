import React from 'react'
import serverLinks from '../../../js/serverLinks'

const NewsCorousel = ({ files }) => {
    return (
        <div className="mx-auto">
            <div id="carouselExampleIndicators" className="carousel slide ">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">



                    {
                        files.map((photoURL, index) => {

                            return <div className={`carousel-item ${index === 0 && "active"}`}>
                                <img src={serverLinks.showFile(photoURL, 'news')} className="d-block w-[50%] h-[50%] mx-auto" alt="..." />
                            </div>
                        })
                    }

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-blue-700" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-blue-700" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}

export default NewsCorousel
