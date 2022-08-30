import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-check-device',
  templateUrl: './check-device.component.html',
  styleUrls: ['./check-device.component.css']
})
export class CheckDeviceComponent implements OnInit {

  @Output() emitJoinChannel = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  join(){
    this.emitJoinChannel.emit();
  }

}
