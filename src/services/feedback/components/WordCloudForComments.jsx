import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Cloud from 'react-d3-cloud';


const WordCloudForComments = ({ comments }) => {

    const [wordCloud, setWordCloud] = useState(null)

    function generateWordCloudData(comments) {
        // Count the occurrences of each word in the comments
        const wordCountMap = {};
        comments.forEach((comment) => {
            const words = comment.split(' ');
            words.forEach((word) => {
                // Exclude unnecessary words or add custom logic to highlight specific words
                if (word !== 'No' && word !== 'nothing' && word !== 'ok') {
                    if (wordCountMap[word]) {
                        wordCountMap[word]++;
                    } else {
                        wordCountMap[word] = 1;
                    }
                }
            });
        });

        // Convert the word count map to an array of word cloud data objects
        const wordCloudData = Object.keys(wordCountMap).map((word) => ({
            text: word,
            value: wordCountMap[word],
        }));

        return wordCloudData;
    }

    function fontSizeMapper(word) {
        // Placeholder function for adjusting font size based on word value
        // Customize this function to scale the font size as desired
        return Math.log2(word.value) * 15
    }

    function rotate(word) {
        // Placeholder function for rotating the words
        // Customize this function to set the rotation angle as desired
        return 0;
    }



    useEffect(() => {
        if (comments) {
            setWordCloud(generateWordCloudData(comments))
        }
    }, [comments])

    return (
        <div>
            {
                wordCloud && <Cloud data={wordCloud} fontSizeMapper={fontSizeMapper} rotate={rotate} />
            }

        </div>
    );
};


export default WordCloudForComments
