const Title = ({ title, className }) => {
    return <p className={`sticky-top mb-4 w-full font-semibold bg-blue-100 p-2 rounded-md text-blue-800 ${className}`}>{title}</p>
}


export default Title