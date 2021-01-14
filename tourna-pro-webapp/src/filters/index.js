
function dateFormat(date){
    var converted = new Date(date)
    return converted.toLocaleDateString()
}

export default function (vue) {
  vue.filter('dateFormat', dateFormat)
}