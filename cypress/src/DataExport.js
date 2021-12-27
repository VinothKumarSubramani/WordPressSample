export default (data) => {

  global[Object.keys(data)[0]] = data[Object.keys(data)[0]];

}