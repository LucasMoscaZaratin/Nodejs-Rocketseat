//import { DatabaseMomory } from './database-memory.js'
import {fastify} from 'fastify'
import { DatabasePostgress } from './databese-postgres.js'

const server = fastify()

//const database = new DatabaseMomory()
const database = new DatabasePostgress()

server.post('/videos', async(request, reply) => {
    const {title, description, duration} = request.body
    
    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

server.get('/videos', async(request) =>{
    const search = request.query.search
    console.log(search)

    const videos =  await database.lsit(search)

    return videos
})

server.put('/videos/:id', async(request, reply) =>{
    const videoId = request.params.id
    const {title, description, duration} = request.body

    await database.updated(videoId,{
        title,
        description,
        duration,
    })
    
    return reply.status(204).send()
})

server.delete('/videos/:id', async(request, reply) =>{
    const videoId = request.params.id

    await database.delete(videoId)
    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})