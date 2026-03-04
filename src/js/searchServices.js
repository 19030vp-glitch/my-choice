const searchServices = (query, serviceList, setUimsService) => {
    const result = serviceList.filter((service) => {
        const title = service.title.toLowerCase();
        return title.includes(query.toLowerCase());
    })
    setUimsService(() => result)
}

export default searchServices