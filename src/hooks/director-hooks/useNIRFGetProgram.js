import { useQuery } from 'react-query'; // Assuming you are using react-query
import { fetchPrograms } from '../../services/director/reports/nirf/js/savePrograms';
import { useEffect } from 'react';

const useNIRFGetProgram = (user, academicYear, enabled = true, all = false) => {
    const { data, isLoading, refetch } = useQuery(`NIRF-Programs-${user?.id}-${academicYear}`, () => fetchPrograms(user?.department, academicYear, all), { enabled });

    useEffect(() => {
        refetch()
    }, [user])

    return { programs: data?.data, isLoading };
};

export default useNIRFGetProgram;
