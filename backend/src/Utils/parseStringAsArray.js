module.exports = function parseStringAsArrray(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim());
}