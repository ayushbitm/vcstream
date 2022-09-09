import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  
  @Output() emitLeaveChannel = new EventEmitter();
  @Output() emitmicToggle =new EventEmitter();
  @Output() emitcamToggle =new EventEmitter();
  @Output() emitScreenShare =new EventEmitter();

  @Input() audio !: boolean;
  @Input() video !: boolean;
  @Input() screenSharing !: boolean;

  ngOnInit(): void {
  }

  leave(){
    this.emitLeaveChannel.emit();
  }

  micToggle(){
    this.emitmicToggle.emit();
  }
  
  camToggle(){
    this.emitcamToggle.emit();
  }

  screenShare(){
    this.emitScreenShare.emit();
  }

}
