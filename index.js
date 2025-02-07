const server = require("express")()
const emojis = require('./emojis.js')

server.use(cors())

server.get("/search/:term", (request, response) => {
    const {term} = request.params
    const foundEmojis = emojis.filter((emoji) => {
        if(term.length === 1 && emoji.letter === term){
            console.log(emoji)
            return true
        }

        if(term.length > 1 && emoji.name.includes(term)){
            console.log(emoji)
            return true
        }
    }).sort((a, b) => {
        if(a.name < b.name){
            return -1
        }
        if(a.name > b.name){
            return 1
        }
    })
    response.send(foundEmojis)
})

server.get("/search", (request, response) => {
    response.send(emojis)
})

server.get("/", (request, response) => {
    response.send("Welcome to emoji api serving little packets of emotions")
})

module.exports = server