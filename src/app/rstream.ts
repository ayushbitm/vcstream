export class rstream{


    private uid : any;
    private audio : any;
}





// public local_rtc !: {
//   uid :any,
//   client: any,
//   localAudioTrack: any,
//   localVideoTrack: any,
//   isJoined: any
// };

// public remote_rtc !: IAgoraRTCClient;

// async joinChannel() {
//   this.local_rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
//   this.local_rtc.uid = await this.local_rtc.client.join(this.join_stream.appId, this.join_stream.channel, this.join_stream.token);
//   this.local_rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
//   this.local_rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
//   await this.local_rtc.client.publish([this.local_rtc.localAudioTrack, this.local_rtc.localVideoTrack]);

//   console.log("publish success!");

//   this.listenRemoteEvents();
// }

// public listenRemoteEvents(){
//   this.local_rtc.client.on("user-published", async (user: { videoTrack: any; uid: { toString: () => string; }; audioTrack: any; }, mediaType: string) => {
//     // Subscribe to a remote user.
//     await this.local_rtc.client.subscribe(user, mediaType);
//     console.log("subscribe success");
  
//     if (mediaType === "video") {
//       const remoteVideoTrack = user.videoTrack;

//       // const playerContainer = document.createElement("div");
//       // playerContainer.id = user.uid.toString();
//       // playerContainer.style.width = "640px";
//       // playerContainer.style.height = "480px";
//       // document.body.append("local" + this.rtc.uid);

//       remoteVideoTrack.play("local" + this.remote_rtc.uid);
   
//     }
  
//     if (mediaType === "audio") {  
//       const remoteAudioTrack = user.audioTrack;
//       remoteAudioTrack.play();
//     }
//   });
// }
// }
