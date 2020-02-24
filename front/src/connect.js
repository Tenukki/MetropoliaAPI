import axios from 'axios'
const baseUrl = "http://localhost:3004/api/infos"


const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const request = await axios.post(baseUrl, newObject)
  return request.data
}

const findDate = async newObject => {
    const request = await axios.post(baseUrl+"/find", newObject)
    return request.data
}

const findName = async id => {
    const request = await axios.get(`${baseUrl}/names?name=${id}`)
    return request.data
}



export default { getAll, create,findDate,findName}