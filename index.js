 
const express = require('express')
const cors = require('cors')
//const logger = require('./loggerMiddleware')
const app = express()

app.use(cors())
app.use(express.json())

//app.use(logger)
let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		date: '2019-05-30T17:30:31.098Z',
		important: true
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript',
		date: '2019-05-30T18:39:34.091Z',
		important: false
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		date: '2019-05-30T19:20:14.298Z',
		important: true
	},
	{
		id: 4,
		content: 'tengo que hacer mi portafolio',
		important: true,
		date: '2019-05-30T19:20:14.298Z',
	}
]

app.get('/', (request,response) => response.send('<h1>Hola humano<h1/>'))
app.get('/api/notes', (request,response) => {
	response.json(notes)
})
app.get('/api/notes/:id',(request,response) => {
	const id = Number(request.params.id)
	const note = notes.find((note => note.id === id))
	if (note){
		response.send(note)
	} else {
		response.status(400).send( )
	}
})
app.delete('/api/notes/:id',(request, response)=>{
	const id = Number(request.params.id)
	notes = notes.filter((note)=>note.id !== id)
	response.status(204).end()
})

app.post('/api/notes', (req,res)=>{ 
	const note = req.body

	if (!note || !note.content){
		return res.status(400).json({
			error: 'note content is missing'
		})
	}
	const ids = notes.map(note => note.id)
	const maxId = Math.max(...ids)
	const newNote = {
		id: maxId+1,
		content: note.content,
		important: typeof note.important === 'undefined' 
			? false
			: note.important,
		date: new Date().toISOString()
	}
	notes = notes.concat(newNote)
	res.json(newNote)
})
app.put('/api/notes/:id',(req,res)=>{
	const id = Number(req.params.id)
	const index = notes.findIndex((note)=>note.id === id) 
    console.log("🚀 ~ file: index.js ~ line 81 ~ app.put ~ index", index,req.path)
    index > -1
		?notes.splice(index,1,req.body)
		:console.log('error no se encontro la nota')
	res.send(notes[index])
	res.status(200).end()
})
app.use((req,res)=>{
	res.status(404).json({
		error: 'Not found'
	})
})
const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
	console.log(`El servidor se está ejecutando en ${ PORT }`)
})
