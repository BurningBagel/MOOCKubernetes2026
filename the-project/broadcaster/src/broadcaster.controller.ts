import { Controller, Get } from '@nestjs/common';
import { BroadcasterService } from './broadcaster.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class BroadcasterController {
  constructor(private readonly broadcasterService: BroadcasterService) {}

  @EventPattern('todo_created')
  handleTodoCreated(@Payload() data: any){
    
  }
}
