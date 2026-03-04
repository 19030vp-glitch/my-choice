const generateChartDataForStudent = (responses) => {
    const courseRatings = {
        'Very Good': 0,
        'Good': 0,
        'Satisfactory': 0,
        'Not-Satisfactory': 0
    };

    const facilityRatings = {
        'Very Good': 0,
        'Good': 0,
        'Satisfactory': 0,
        'N/A': 0
    };

    const facilityQuestions = {};

    const teacherData = {};
    const syllabusCoverageData = {};

    const programData = {};
    const commentsData = {};
    const howWasSyllabusData = {};
    const onlineLecture = {};


    responses.forEach((response) => {
        const teacherNames = response['Tick only those teachers who taught you this year'];

        teacherNames.forEach((teacherName) => {
            if (!teacherData[teacherName]) {
                teacherData[teacherName] = {};
            }
            const aboutTeacherSection = response[`About the teacher ${teacherName}`];

            Object.entries(aboutTeacherSection).forEach(([question, rating]) => {
                if (!teacherData[teacherName][question]) {
                    teacherData[teacherName][question] = {
                        'Very Good': 0,
                        'Good': 0,
                        'Satisfactory': 0,
                        'Un-Satisfactory': 0
                    };
                }

                teacherData[teacherName][question][rating]++;
            });

            const commentsSection = response[`If you have other major comments for  ${teacherName}`];
            if (commentsSection) {
                if (!commentsData[teacherName]) {
                    commentsData[teacherName] = [];
                }
                commentsData[teacherName].push(commentsSection);
            }

            const syllabusCoverage = response[`How much of the syllabus was covered in class by  ${teacherName}`];
            if (!syllabusCoverageData[teacherName]) {
                syllabusCoverageData[teacherName] = {
                    '85 to 100%': 0,
                    '70 to 85%': 0,
                    '55 to 70%': 0,
                    'Less than 55%': 0
                };
            }
            if (Array.isArray(syllabusCoverage)) {
                syllabusCoverage.forEach((coverage) => {
                    syllabusCoverageData[teacherName][coverage]++;
                });
            } else {
                syllabusCoverageData[teacherName][syllabusCoverage]++;
            }
        });


        const courseRating = response['Rate the course']['Overall rating'];
        courseRatings[courseRating]++;

        const facilitySection = response['Rate the Facilities available'];
        Object.entries(facilitySection).forEach(([question, rating]) => {
            if (!facilityQuestions[question]) {
                facilityQuestions[question] = {
                    'Very Good': 0,
                    'Good': 0,
                    'Satisfactory': 0,
                    'N/A': 0
                };
            }

            facilityQuestions[question][rating]++;
        });

        const program = response['Choose the program you are currently enrolled in'];

        const courseOutlineProvided = response['Were are you provided with a course and lecture outline at the beginning?'];

        if (!onlineLecture[program]) {
            onlineLecture[program] = {
                'Yes': 0,
                'No': 0
            };
        }

        if (courseOutlineProvided === 'Yes') {
            onlineLecture[program]['Yes']++;
        } else if (courseOutlineProvided === 'No') {
            onlineLecture[program]['No']++;
        }

        const syllabusWasQnA = response['The syllabus was?'];

        if (!howWasSyllabusData[program]) {
            howWasSyllabusData[program] = {
                'Challenging': 0,
                'Good': 0,
                'Adequate': 0,
                'Inadequate': 0
            };
        }

        syllabusWasQnA.forEach((rating) => {
            howWasSyllabusData[program][rating]++;
        });

        if (!programData[program]) {
            programData[program] = {
                ratings: {
                    'Very Good': 0,
                    'Good': 0,
                    'Satisfactory': 0,
                    'Not-Satisfactory': 0
                },
                count: 0
            };
        }
        programData[program].ratings[courseRating]++;
        programData[program].count++;
    });

    const onlineLectureChartData = Object.entries(onlineLecture).map(([program, data]) => {
        const { 'Yes': yesCount, 'No': noCount } = data;
        const total = yesCount + noCount;
        const yesPercentage = (yesCount / total) * 100;
        const noPercentage = (noCount / total) * 100;

        return {
            program,
            data: {
                labels: ['Yes', 'No'],
                datasets: [
                    {
                        data: [yesPercentage, noPercentage],
                        backgroundColor: ['green', 'red']
                    }
                ]
            }
        };
    });


    const syllabusWasChartData = Object.entries(howWasSyllabusData).map(([program, coverage]) => {
        return {
            program,
            data: {
                labels: Object.keys(coverage),
                datasets: [
                    {
                        label: program,
                        data: Object.values(coverage),
                        backgroundColor: ['green', 'blue', 'yellow', 'red'],
                        categoryPercentage: 0.6,
                        barPercentage: 0.4
                    }
                ]
            }
        };
    });

    const courseData = {
        labels: Object.keys(courseRatings),
        datasets: [
            {
                data: Object.values(courseRatings),
                backgroundColor: ['green', 'blue', 'yellow', 'red']
            }
        ]
    };

    const facilityData = {
        labels: Object.keys(facilityRatings),
        datasets: [
            {
                data: Object.values(facilityRatings),
                backgroundColor: ['green', 'blue', 'yellow', 'red']
            }
        ]
    };

    const facilityChartData = Object.entries(facilityQuestions).map(([question, ratings]) => {
        return {
            question,
            data: {
                labels: Object.keys(ratings),
                datasets: [
                    {
                        data: Object.values(ratings),
                        backgroundColor: ['green', 'blue', 'yellow', 'red']
                    }
                ]
            }
        };
    });

    const teacherChartData = Object.entries(teacherData).map(([teacherName, teacher]) => {
        const questionData = Object.entries(teacher).map(([question, ratings]) => {
            return {
                label: question,
                data: Object.values(ratings),
                backgroundColor: ['green', 'blue', 'yellow', 'red'],
                categoryPercentage: 0.6,
                barPercentage: 0.4
            };
        });

        return {
            teacherName,
            data: questionData
        };
    });

    const programChartData = Object.entries(programData).map(([program, data]) => {
        const { ratings, count } = data;
        return {
            program,
            data: {
                labels: Object.keys(ratings),
                datasets: [
                    {
                        label: program,
                        data: Object.values(ratings),
                        backgroundColor: ['green', 'blue', 'yellow', 'red'],
                        categoryPercentage: 0.6,
                        barPercentage: 0.4
                    }
                ]
            },
            count
        };
    });

    const syllabusCoverageChartData = Object.entries(syllabusCoverageData).map(([teacherName, coverage]) => {
        return {
            teacherName,
            data: {
                labels: Object.keys(coverage),
                datasets: [
                    {
                        data: Object.values(coverage),
                        backgroundColor: ['green', 'blue', 'yellow', 'red']
                    }
                ]
            }
        };
    });


    return { onlineLectureChartData, syllabusWasChartData, courseData, facilityData, facilityChartData, teacherChartData, programChartData, syllabusCoverageChartData, commentsData };
};

module.exports = generateChartDataForStudent