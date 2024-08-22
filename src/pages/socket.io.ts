import { NextApiRequest } from 'next'
import { Server as NetServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import { NextApiResponseServerIO } from 'src/types/socket'

export const config = {
  api: {
    bodyParser: false
  }
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any
    const io = new SocketServer(httpServer, {
      path: '/socket.io',
      addTrailingSlash: false,
      transports: ['websocket']
    })
    res.socket.server.io = io

    io.on('connection', socket => {
      console.log('Client connected')

      socket.on('disconnect', () => {
        console.log('Client disconnected')
      })
    })
  }
  res.end()
}

export default ioHandler
