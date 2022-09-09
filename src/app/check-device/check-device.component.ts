import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import AgoraRTC from 'agora-rtc-sdk-ng';

@Component({
  selector: 'app-check-device',
  templateUrl: './check-device.component.html',
  styleUrls: ['./check-device.component.css']
})
export class CheckDeviceComponent implements OnInit {

  @Output() emitJoinChannel = new EventEmitter<{audio : boolean, video :boolean}>();

  constructor() { 
    this.listenlocalevents();
  }
  public audio : boolean = true;
  public video : boolean = true;
  public localAudioTrack  : any;
  public localVideoTrack : any;

  ngOnInit(): void {
  }

  public async listenlocalevents(){
    this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    this.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
      encoderConfig: "720p",
    });
    // await this.client.publish([this.localAudioTrack, this.localVideoTrack]);
    this.localVideoTrack.play("local_test");
  }
  
  join(){
    this.emitJoinChannel.emit({audio : this.audio,video :this.video});
  }

  micToggle(){
    this.audio = !this.audio;
  }
 async camToggle(){
    // this.video = !this.video;
    if(this.video)
    {
      // await this.rtc.client.unpublish(this.rtc.localVideoTrack);
      this.localVideoTrack.close();
      // console.log("hello",this.video);     
      // this.rtc.localVideoTrack.setEnabled(false);
      this.video=false;
    }
    else{
      console.log("hello",this.video);
      // this.rtc.localVideoTrack.setEnabled(true);
      this.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
        encoderConfig: "720p",
      });
      // await this.rtc.client.publish(this.rtc.localVideoTrack);
      this.localVideoTrack.play("local_test");
      this.video=true;
  }

}
}
