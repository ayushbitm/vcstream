import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  // @Output() emitLeaveChannel = new EventEmitter();
  // @Output() emitmicToggle =new EventEmitter();
  // @Output() emitcamToggle =new EventEmitter();
  // @Output() emitScreenShare =new EventEmitter();

  // @Input() audio !: boolean;
  // @Input() video !: boolean;
  @Input() screenSharing !: boolean;
  @Input() remote :any;

  constructor() { }

  ngOnInit(): void {
  }

  // leave(){
  //   this.emitLeaveChannel.emit();
  // }

  // micToggle(){
  //   this.emitmicToggle.emit();
  // }
  
  // camToggle(){
  //   this.emitcamToggle.emit();
  // }

  // screenShare(){
  //   this.emitScreenShare.emit();
  // }
}
