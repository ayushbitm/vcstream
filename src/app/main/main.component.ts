import { Component, OnInit } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"
import { Subscription, timer } from 'rxjs';
import { gstream } from '../gstream';
import { sstream } from '../sstream';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public join_stream = {
    appId: "b0b58b051ab648d8898deb5cb66a1ac0",
    channel: "test",
    token: "007eJxTYHBuD/woaWgntPiP6U4ll/1T5Ram6zNr/XN4e4VJYPo0zSIFhiSDJFOLJANTw8QkMxOLFAsLS4uU1CTT5CQzs0TDxGQD7X7R5NUPxJJPzvnHwsgAgSA+C0NJanEJAwMAwmkgDA==",
    uid: 123456,
  };

  // public rtc : IAgoraRTCClient= {
  //   client: IAgoraRTCClient,
  //   localAudioTrack: IMicrophoneAudioTrack ,
  //   localVideoTrack: ICameraVideoTrack,
  // };
  public rtc !: gstream ;
  public screen_rtc !: sstream;
  // public screen_uid !: s


  public isJoined =false;
  constructor() {
  }

  ngOnInit(): void {
    this.isJoined = false;
    this.rtc = new gstream();
  }

  // public remote_rtc  : IAgoraRTCRemoteUser[] = [];
  public audio =true;
  public video =true;
  public screenSharing =false;

  public timersub !: Subscription;

  async joinChannel() {
    await this.rtc.joinChannel(this.join_stream.appId, this.join_stream.channel, this.join_stream.token);
  }

  public async emitScreenShare(){
    if(!this.screenSharing){
      this.screen_rtc= new sstream();
      this.rtc.screen_stream =this.screen_rtc;
      await this.screen_rtc.screenShare(this.join_stream.appId,this.join_stream.channel,this.join_stream.token);

      this.timersub = timer(1000,500).subscribe(() => {
          const val = this.screen_rtc.screenvideoTrack.isPlaying;
          if(val == false && this.screenSharing !=false)
          {
            this.closeScreenShare();
            this.screenSharing =false;
          }
      })
      this.screenSharing=true

    }
    else
    {
      this.closeScreenShare();
      this.screenSharing =false; 
    }
  
  }

  async closeScreenShare(){
    if(this.screen_rtc.screen_share_track instanceof Array)
    await this.screen_rtc.screenAudioTrack.close();
    await this.screen_rtc.screenvideoTrack.close();
    await this.screen_rtc.client.leave();
    const playerContainer = document.getElementById("screen_sharing");
    playerContainer && playerContainer.remove();
    this.timersub.unsubscribe()
  }

  async leaveCall() {

    await this.rtc.localAudioTrack.close();
    await this.rtc.localVideoTrack.close();

    this.rtc.client.remoteUsers.forEach((user) => {
      const playerContainer = document.getElementById("user.uid");
      playerContainer && playerContainer.remove();
    });
    this.rtc.isJoined = false;
    await this.rtc.client.leave();
  }

  public emitmicToggle(){
    if(this.audio)
    {
      this.rtc.localAudioTrack.setEnabled(false);
      this.audio=false;
    }
    else{
      this.rtc.localAudioTrack.setEnabled(true);
      this.audio=true;
    }
  }

  public async emitcamToggle(){
    if(this.video)
    {
      console.log("hello",this.video);
     
      await this.rtc.client.unpublish(this.rtc.localVideoTrack);
      // this.rtc.localVideoTrack.setEnabled(false);
      this.video=false;
    }
    else{
      console.log("hello",this.video);
      await this.rtc.client.publish(this.rtc.localVideoTrack);
      // this.rtc.localVideoTrack.setEnabled(true);
      this.video=true;
    }
    // this.screen_rtc.screenvideoTrack. = () => { // Click on browser UI stop sharing button
    //   console.info("Recording has ended");
    // };
  
  }
  // stream.getVideoTracks()[0].onended = function () {
  //   // doWhatYouNeedToDo();
  // };
  
 

}

  

//TODO : create CameraVideoTrack => is an interface for the video captured by a local camera and adds several camera-related functions.
//AgoraRTC.createCameraVideoTrack.

// createMicrophoneAndCameraTracks -> Creates a local track using the audio and video captured by the microphone and camera at the same time, and return a list containing CameraVideoTrack and of MicrophoneAudioTrack.
//  createMicrophoneAndCameraTracks to create a local track, if either the camera or microphone cannot complete the capture, the entire capture fails, and the SDK throws an error. This is because the audio and video capture is done at the same time

//When creating local audio and video tracks, the SDK may throw the following errors due to the differences between devices and browsers.
// NOT_SUPPORTED: The function used is not supported by the current browser.
// MEDIA_OPTION_INVALID: The specified capture configurations cannot be satisfied, usually because the device does not support the specified resolution or frame rate.
// DEVICE_NOT_FOUND: The specified capture device cannot be found.
// PERMISSION_DENIED: The user refuses to grant permission to access the camera or microphone. Or, when selecting a sharing source for screen sharing, the user closes the selection window.
// CONSTRAINT_NOT_SATISFIED: The browser does not support the specified capture configurations.
// SHARE_AUDIO_NOT_ALLOWED: The user does not check Share Audio when sharing audio with screen sharing.



// async joinChannel (){
    // const uid = await this.rtc.client.join(this.join_stream.appId, this.join_stream.channel, this.join_stream.token);
    // console.log(uid);
    // this.rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // this.rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
    //   encoderConfig: "120p",
    // });
    // await this.rtc.client.publish([this.rtc.localAudioTrack, this.rtc.localVideoTrack]);
    // this.rtc.localVideoTrack.play("local_stream");
    // console.log("publish success!");
    // this.isJoined = true;
    // this.listenRemoteEvents();
// }

// public listenRemoteEvents() {
  //   this.rtc.client.on("user-published", async (user, mediaType) => {
  //     // Subscribe to a remote user.
  //     await this.rtc.client.subscribe(user, mediaType);
  //     console.log("subscribe success");

  //     if (mediaType === "video") {
  //       const remoteVideoTrack = user.videoTrack;
  //       const playerContainer = document.createElement("div");

  //       playerContainer.id = user.uid.toString();
  //       playerContainer.style.width = "640px";
  //       playerContainer.style.height = "480px";
  //       document.getElementById('remote_stream')?.appendChild(playerContainer);
  //       remoteVideoTrack?.play("playerContainer.id");
  //     }

  //     if (mediaType === "audio") {
  //       const remoteAudioTrack = user.audioTrack;
  //       remoteAudioTrack?.play();
  //     }
  //   });

  //   this.rtc.client.on("user-unpublished", (user: { uid: string; }) => {
  //     const playerContainer = document.getElementById("remote_stream");
  //     playerContainer?.remove();
  //   });

  //   this.rtc.client.on("user-joined" ,async  (user : IAgoraRTCRemoteUser)  =>{
  //     let id = user.uid;
  //     this.remote_rtc.push({
  //       'uid': +id,
  //       hasAudio: true,
  //       hasVideo: true
  //     });

  //   })
  //   this.rtc.client.on('user-left', (user: IAgoraRTCRemoteUser, reason: string) => {

  //   })

  // }