import { ushaTableData, ushaTableHeads } from "../js/tableDetails"

const USHADetails = ({ id }) => {

    return (
        <div className="animate-once animate-fade-up">
            <table className="table table-bordered table-striped">
                <thead className="bg-blue-700 text-white">
                    <tr>
                        {ushaTableHeads[id].map((item) => {
                            return <th key={item}>{item}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {
                        ushaTableData[id].map((item, mainIndex) => {
                            return (
                                <tr key={`${id}-${mainIndex}`}>
                                    {
                                        item.map((cell, index) => {
                                            return (index !== 6 && id !== "D") || (index !== 8 && id === "D")
                                                ? (((id === "B" || id === "D") && index === 1)
                                                    ? <td>
                                                        {
                                                            <div>
                                                                <p>{cell[0]}</p>
                                                                <ul className="ml-5 mt-2" style={{ listStyle: "disc" }}>
                                                                    {
                                                                        cell[1].map((bCellItem, bCellIndex) => {
                                                                            return <li key={`cellItem${bCellIndex}`}>
                                                                                {bCellItem}
                                                                            </li>
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        }
                                                    </td>
                                                    : <td key={index}>{cell}</td>)
                                                : <td>
                                                    <ul className="ml-5 space-y-3" style={{ listStyle: "disc" }}>
                                                        {
                                                            cell.map((cellItem, cellIndex) => {
                                                                return <li key={`cellItem${cellIndex}`}>
                                                                    {cellItem}
                                                                </li>
                                                            })
                                                        }
                                                    </ul>
                                                </td>
                                        })
                                    }
                                </tr>
                            )
                        }
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default USHADetails





