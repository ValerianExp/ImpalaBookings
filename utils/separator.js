function separator(str) {

    let size = str.split("&")[0].split("?")[1].split("=")[0];
    // console.log(size);
    let sizeValue = str.split("&")[0].split("?")[1].split("=")[1];
    // console.log(sizeValue);

    let offset;
    let offsetValue;
    if (str.split("&").length > 1) {
        offset = str.split("&")[1].split("=")[0];
        console.log(offset);
        offsetValue = str.split("&")[1].split("=")[1];
        console.log(offsetValue);
    }

    return { size: sizeValue, offset: offsetValue }
}

module.exports = separator;