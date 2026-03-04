function generateOverallCONRENChartData(
  conRenDocuments,
  conConstants,
  renConstants
) {
  const conDocsMap = new Map();
  const renDocsMap = new Map();

  // Map documents by infraId for easy lookup
  conRenDocuments.forEach((doc) => {
    if (doc.tabId === "A") {
      conDocsMap.set(doc.infraId, doc);
    } else if (doc.tabId === "B") {
      renDocsMap.set(doc.infraId, doc);
    }
  });

  // Initialize chart data objects
  const conChartData = generateCONRENChartData(
    conConstants,
    conDocsMap,
    "Construction"
  );
  const renChartData = generateCONRENChartData(
    renConstants,
    renDocsMap,
    "Renovation"
  );

  const mergeChartData = (conChartData, renChartData) => {
    const mergedData = {
      labels: [],
      datasets: [],
    };

    // Merge labels
    mergedData.labels = [
      ...conChartData.labels.map((label, index) => `A-${index + 1}`),
      ...renChartData.labels.map((label, index) => `B-${index + 1}`),
    ];

    // Merge datasets
    const mergedDataset = {
      label: "Overall Status of Construction and Renovation",
      data: [
        ...conChartData.datasets[0].data,
        ...renChartData.datasets[0].data,
      ],
      backgroundColor: [
        ...conChartData.datasets[0].backgroundColor,
        ...renChartData.datasets[0].backgroundColor,
      ],
      borderColor: [
        ...conChartData.datasets[0].borderColor,
        ...renChartData.datasets[0].borderColor,
      ],
      borderWidth: 1,
    };

    mergedData.datasets.push(mergedDataset);

    return mergedData;
  };

  const conRenChartData = mergeChartData(conChartData, renChartData);

  return {
    conRenChartData,
    conChartData,
    renChartData,
  };
}

function generateCONRENChartData(constants, docsMap, label) {
  const labels = [];
  const data = [];

  constants.forEach((item, index) => {
    const doc = docsMap.get(item.id);
    let status;

    if (doc) {
      status =
        doc.statusInPercentage === "0"
          ? "Not yet started"
          : doc.statusInPercentage === "100"
            ? "Completed"
            : `${doc.statusInPercentage}% done`;
      labels.push(`${item.name} (${status})`);
      data.push(parseInt(doc.statusInPercentage));
    } else {
      // Document not found, add default entry
      labels.push(`${item.name} (Not yet started)`); // Default status
      data.push(0); // Default status percentage
    }
  });

  return {
    labels: labels,
    datasets: [
      {
        label,
        data: data,
        backgroundColor: [
          label === "Construction"
            ? "rgba(255, 99, 132, 0.6)"
            : "rgba(55, 199, 24, 0.6)",
          label === "Construction"
            ? "rgba(54, 162, 235, 0.6)"
            : "rgba(154, 262, 248, 0.6)",
          label === "Construction"
            ? "rgba(255, 206, 86, 0.6)"
            : "rgba(25, 26, 214, 0.6)",
        ],
        borderColor: [
          label === "Construction"
            ? "rgba(255, 99, 132, 1)"
            : "rgba(55, 199, 24, 1)",
          label === "Construction"
            ? "rgba(54, 162, 235, 1)"
            : "rgba(154, 262, 248, 1)",
          label === "Construction"
            ? "rgba(255, 206, 86, 1)"
            : "rgba(25, 26, 214, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
}

function generateEQUIPChartData(equipmentDocuments) {
  const elementIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  console.log(equipmentDocuments)

  // Initialize count for each status
  let counts = {
    "Not yet purchased": 0,
    Purchased: 0,
    "Tender Invited": 0,
    "Installation completed": 0,
  };

  elementIds.forEach((id) => {
    const document = equipmentDocuments.find((doc) => doc.elementId === id);
    if (document) {
      counts[document.status]++;
    } else {
      counts["Not yet purchased"]++;
    }
  });

  // Extract labels and data from the input object
  const labels = Object.keys(counts);
  const data = Object.values(counts);

  // Create a datasets array with a single dataset containing the data
  const datasets = [
    {
      label: "Equipment Status",
      data: data,
      backgroundColor: [
        "rgba(255, 159, 64, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
        "rgba(255, 99, 132, 0.6)",
      ],
      borderColor: [
        "rgba(255, 159, 64, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 99, 132, 1)",
      ],
      borderWidth: 1,
    },
  ];

  // Create the chart data object
  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  return chartData;
}

function generateSOFTChartData(softDocuments) {
  // Initialize the result object
  const result = {};

  const ids = {
    Soft1: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    Soft2: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    Soft3: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",],
    Soft4: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    Soft5: ["1", "2", "3", "4"],
    Soft6: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
    Soft7: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    Soft8: ["1", "2", "3", "4", "5"],
    Soft9: ["1", "2"],
    Soft10: ["1", "2", "3", "4", "5", "6", "7"],
  };

  Object.keys(ids).forEach((subType) => {
    result[subType] = { "Not yet Started": 0, Ongoing: 0, Completed: 0 };
    ids[subType].forEach((elementId) => {
      const existingDoc = softDocuments.find((doc) => {
        return doc.subType === subType && doc.elementId === parseInt(elementId);
      });

      if (existingDoc) {
        result[subType][existingDoc.status]++;
      } else {
        result[subType]["Not yet Started"]++;
      }
    });
  });

  const chartData = generateEQUIPMENTChartData(result);
  return chartData;
}

const generateEQUIPMENTChartData = (result) => {
  const chartData = {
    labels: [],
    datasets: [
      {
        label: "Not yet started",
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        stack: "Stack 0",
        data: [],
      },
      {
        label: "Ongoing",
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        stack: "Stack 0",
        data: [],
      },
      {
        label: "Completed",
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        stack: "Stack 0",
        data: [],
      },
    ],
  };

  // Populate chartData with data from the input
  Object.keys(result).forEach((subType, i) => {
    chartData.labels.push(`Activity-${i + 1}`);
    const counts = result[subType] || {
      "Not yet Started": 0,
      Ongoing: 0,
      Completed: 0,
    };
    chartData.datasets[0].data.push(counts["Not yet Started"]);
    chartData.datasets[1].data.push(counts["Ongoing"]);
    chartData.datasets[2].data.push(counts["Completed"]);
  });

  return chartData;
};

module.exports = {
  generateCONRENChartData,
  generateOverallCONRENChartData,
  generateEQUIPChartData,
  generateSOFTChartData,
};
