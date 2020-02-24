const infoRouter = require("express").Router()
const Info = require("../models/info")


infoRouter.get("/", async (request, response) => {
  const blogs = await Info.find({})
  console.log(blogs) 
  response.json(blogs.map(Info => Info.toJSON()))
})



infoRouter.get("/names", async (request, response) => {

  let name = request.query
  
  console.log(name)
  
  const blogs = await Info.findOne({event: name.name})
  console.log(blogs) 
  response.json(blogs.toJSON())
  
})



infoRouter.post("/find", async (request, response) => {
  let a = request.body

  let eventJson = {start: a.start,end: a.end}

  let start = eventJson.start.split("/").map(value => parseInt(value))
  let end = eventJson.end.split("/").map(value => parseInt(value))

  console.log(start)
  console.log(end)

  const blogs = await Info.find({})
  let filteredBlogs = blogs.map(value =>{
    
    let paska = value.date.split("/").map(value => parseInt(value))

    return {
      event: value.event,
      location: value.location,
      date: paska
    }
  })
  console.log(filteredBlogs)
  response.status(200)
  /*
  const newInfo = new Info(eventJson)
  await newInfo.save()
  response.json(newInfo.toJSON())
*/
    
})


infoRouter.post("/", async (request, response) => {
  let a = request.body

  let eventJson = {
    event: a.event,
    date: a.date,
    location: a.location
  }
  
  const newInfo = new Info(eventJson)
  await newInfo.save()
  response.json(newInfo.toJSON())

}


)

module.exports = infoRouter