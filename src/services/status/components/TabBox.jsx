import { Box, Tab, Tabs } from '@mui/material';

const TabBox = ({ value, setValue, tabs }) => {
    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    return <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered >

            {
                tabs.map((item) => {
                    return <Tab style={{ textTransform: 'none', backgroundColor: '#f2f2ff', margin: '10px', borderRadius: '10px' }} className='bg-blue-100' label={item} />
                })
            }
        </Tabs>
    </Box>

}

export default TabBox