


const generateChartDataForTeacher = (responses, questions) => {

    questions.forEach((question) => {
        if (question.type === 'table') {
            // rating
            const ratings = question.head.reduce((obj, rating) => {
                obj[rating] = 0;
                return obj;
            }, {});

            const internalQuestions = {};

            responses.forEach((response) => {

                const questionResponse = response[question.question];
                Object.entries(questionResponse).forEach(([internalQuestion, rating]) => {
                    if (!internalQuestions[internalQuestion]) {
                        internalQuestions[internalQuestion] = question.head.reduce((obj, rating) => {
                            obj[rating] = 0;
                            return obj;
                        }, {});
                    }

                    internalQuestions[internalQuestion][rating]++;
                });


            })


            const chartData = Object.entries(internalQuestions).map(([question, ratings]) => {
                return {
                    question,
                    data: {
                        labels: Object.keys(ratings),
                        datasets: [
                            {
                                data: Object.values(ratings),
                                backgroundColor: ['green', 'blue', 'yellow', 'orange', 'red',]
                            }
                        ]
                    }
                };
            });

            question.data = chartData;


        } else if (question.type === 'text') {
            const textData = [];
            responses.forEach((response) => {
                const textSection = response[question.question];
                if (textSection) {
                    textData.push(textSection);
                }
            })

            question.data = textData;

        } else if (question.type === 'radio') {
            const ratings = question.options.reduce((obj, rating) => {
                obj[rating] = 0;
                return obj;
            }, {});
            responses.forEach((response) => {
                let radioAnswer = response[question.question];
                ratings[radioAnswer]++
            })

            let radioChartData = {
                labels: Object.keys(ratings),
                datasets: [
                    {
                        data: Object.values(ratings),
                        backgroundColor: ['green', 'blue', 'yellow', 'red']
                    }
                ]
            }

            question.data = radioChartData
        }
    })

}

module.exports = generateChartDataForTeacher