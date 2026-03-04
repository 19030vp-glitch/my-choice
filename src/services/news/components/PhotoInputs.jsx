import React, { useState } from 'react';

const PhotoInputs = () => {
    const [inputs, setInputs] = useState(['']); // Array to store input values

    const handleInputChange = (index, value) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = value;
        setInputs(updatedInputs);
    };

    const handleAddInput = () => {
        setInputs([...inputs, '']); // Add a new empty input to the array
    };

    const handleRemoveInput = () => {
        const updatedInputs = [...inputs];
        if (updatedInputs.length > 1) {
            updatedInputs.pop();
        }
        setInputs(updatedInputs);
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                {
                    inputs.map((input, index) => (
                        <div>
                            <label className="mb-2" htmlFor={`Input ${index + 1}`}>{`Upload Photo ${index + 1}`}</label>
                            <div className='flex items-center justify-start gap-2'>
                                <input
                                    key={index}
                                    type="file"
                                    value={input}
                                    onChange={(e) => handleInputChange(index, e.target.files[0])}
                                    className="form-control"
                                />

                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="flex items-start gap-2 mt-4">
                <button onClick={handleAddInput} className="bg-blue-500 hover:bg-blue-600 text-white text-sm p-2 rounded-md" type="button">Add Photo</button>

                <button onClick={() => handleRemoveInput()} className="bg-red-500 hover:bg-red-600 text-white text-sm p-2 rounded-md" type='button'>Remove</button>
            </div>
        </div>
    );
};

export default PhotoInputs;
