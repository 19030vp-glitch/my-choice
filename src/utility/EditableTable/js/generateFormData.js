function generateFormData(data, formDataArray, extraDetails = null) {

    let formData = new FormData()

    extraDetails?.forEach((item) => {
        formData.append([item.name], item.value);
    })

    formDataArray?.forEach((item) => {
        formData.append([item.name], item.value ? data?.[item.value] : data?.[item.name]);
    })

    formData.append("isNew", data["isNew"]);

    return formData;
}

export default generateFormData