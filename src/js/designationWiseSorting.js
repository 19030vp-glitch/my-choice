function designationWiseSorting(data) {
    return data?.sort(function (a, b) {
        if (a.designation === b.designation) return 0;
        if (a.designation === "Professor & Director") return -1;
        if (b.designation === "Professor & Director") return 1;
        if (a.designation === "Senior Professor") return -1;
        if (b.designation === "Senior Professor") return 1;
        if (a.designation === "Professor") return -1;
        if (b.designation === "Professor") return 1;
        if (a.designation === "Associate Professor") return -1;
        if (b.designation === "Associate Professor") return 1;
        if (a.designation === "Assistant Professor") return -1;
        if (b.designation === "Assistant Professor") return 1;
        return 0;
    })
}

export default designationWiseSorting