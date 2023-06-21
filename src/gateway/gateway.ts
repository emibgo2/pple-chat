import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { log } from 'console';
import { Server } from 'http';
import { RoomDto } from 'src/room/dto/room.dto';
import { RoomService } from 'src/room/room.service';

@WebSocketGateway({})
export class MyGateway implements OnModuleInit {
  constructor(private readonly roomService: RoomService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('socket.localAddress', socket.localAddress);
      console.log('Connected');
    });
  }

  @SubscribeMessage('createRoom')
  async onNewMssage(@MessageBody() body: RoomDto) {
    this.roomService.createRoom(body.usernames, body.roomName).then((room) => {
      log('room', room);
      this.server.emit('onMessage', room);
    });
  }
}
