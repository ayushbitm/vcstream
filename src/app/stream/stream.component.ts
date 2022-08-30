import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  @Output() emitLeaveChannel = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  leave(){
    this.emitLeaveChannel.emit();
  }
}
