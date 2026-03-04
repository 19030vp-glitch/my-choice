function dateDifference(date1, date2) {
    var date1Obj = new Date(date1);
    var date2Obj = new Date(date2);
    var differenceMs = Math.abs(date2Obj - date1Obj);
    var differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return differenceDays 
  }

  export default dateDifference