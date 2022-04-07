const splitter = (date) => {
    const test = date.split(".")
    const temp = test[0]
    const result = temp.split("T")
    return result[0] + " " + result[1]
}
module.exports = {
    splitter
}