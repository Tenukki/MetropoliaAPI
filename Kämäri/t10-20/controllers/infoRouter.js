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

  let start = Date.parse(eventJson.start)
  let end = Date.parse(eventJson.end)

  console.log(start)
  console.log(end)

  const blogs = await Info.find({})

  let newBlog = []

  blogs.forEach(value =>{
    let selected = Date.parse(value.date)
   // console.log("selected: "+ selected)
    if(selected <= end && selected >= start){
      newBlog.push(value)
    }
  })

/*
  let filteredBlogs = blogs.map(value =>{
    
    let paska = value.date.split("/").map(value => parseInt(value))

    return {
      event: value.event,
      location: value.location,
      date: paska
    }
  })
  */
  console.log(newBlog)
  response.json(newBlog)
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