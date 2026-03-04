import React from 'react';
import Lists from '../../../components/tableComponents/Lists';
import YFSelect from './YFSelect';
import { academicYearGenerator } from '../../../inputs/Year';

const DashboardFilters = ({ dataFilter, setDataFilter, colleges, initialFilter }) => {
    return (
        <div>
            <p className="text-sm font-medium mb-2">Filters:</p>
            <div className="mb-4 border rounded-md p-2 flex items-end">
                <YFSelect setState={setDataFilter} value={dataFilter.district} id="district" className="col-md-2" label="District" options={["Nanded", "Latur", "Parbhani", "Hingoli"]} />
                <YFSelect setState={setDataFilter} value={dataFilter.category} id="category" className="col-md-2" label="Category" options={["Individual Competitions", "Group Competitions"]} />
                {
                    dataFilter?.category && <YFSelect setState={setDataFilter} value={dataFilter.competitionName} id="competitionName" className="col-md-2" label="Competitions" options={
                        Lists[dataFilter?.category === "Individual Competitions" ? "yfIndividual" : "yfGgroup"]} />
                }

                <button onClick={() => setDataFilter(initialFilter)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-1 ml-2">Clear Filters</button>
            </div>
        </div>
    );
}

export default DashboardFilters;
