import { Select } from 'antd';

const { Option } = Select;

function MultipleYearSelect() {

    // generate years
    let showCurrentYear = true
    let now;
    if (showCurrentYear) {
        now = new Date().getUTCFullYear();
    } else {
        now = new Date().getUTCFullYear() - 1
    }


    const arrayOfYears = Array(now - (now - 30)).fill('').map((v, idx) => `${now - (idx + 1)}-${(now - idx).toString().slice(2, 4)}`);

    function handleChange(value) {
        console.log(`Selected: ${value}`);
    }

    return (
        <Select
            className='p-2'
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Select Academic Year"
            onChange={handleChange}
        >
            {arrayOfYears.map((year) => (
                <Option key={year} value={year}>
                    {year}
                </Option>
            ))}
        </Select>
    );
}

export default MultipleYearSelect
