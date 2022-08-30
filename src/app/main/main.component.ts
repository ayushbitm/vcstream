import { Component, OnInit } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng"
import { gstream } from '../gstream';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public join_stream = {
    appId: "b0b58b051ab648d8898deb5cb66a1ac0",
    channel: "test",
    token: "007eJxTYJCutOZRFT7dLhSbvoErqV37wJPnr9juvtseNHVL9GuWh7UKDEkGSaYWSQamholJZiYWKRYWlhYpqUmmyUlmZomGickGFtt4k3ew8yeL9OawMDJAIIjPwlCSWlzCwAAACe8fPQ==",
    uid: 123456,
  };

  // public rtc : IAgoraRTCClient= {
  //   client: IAgoraRTCClient,
  //   localAudioTrack: IMicrophoneAudioTrack ,
  //   localVideoTrack: ICameraVideoTrack,
  // };
  public rtc !: gstream ;


  public isJoined =false;
  constructor() {
  }

  ngOnInit(): void {
    this.isJoined = false;
    this.rtc = new gstream(this.join_stream.appId, this.join_stream.channel);
  }

  public remote_rtc  : IAgoraRTCRemoteUser[] = [];
  // public clie : IUser 

  async joinChannel() {
    await this.rtc.joinChannel(this.join_stream.appId, this.join_stream.channel, this.join_stream.token);
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
  }

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