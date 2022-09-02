import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import { sstream } from "./sstream";


export class gstream {

    public client!: IAgoraRTCClient;
    public localAudioTrack!: IMicrophoneAudioTrack;
    public localVideoTrack!: ICameraVideoTrack;
    public isJoined!: boolean;
    public remote_rtc  : any[] = [];
    public screen_stream !: sstream;

    constructor() {
        this.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
        this.listenRemoteEvents();
    }

    async joinChannel(appId : any, channel : any, token :any ) {
        const uid = await this.client.join(appId, channel, token);
        console.log("hello",uid);
        this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        this.localVideoTrack = await AgoraRTC.createCameraVideoTrack({
          encoderConfig: "720p",
        });
        await this.client.publish([this.localAudioTrack, this.localVideoTrack]);
        this.localVideoTrack.play("local_stream");
        console.log("publish success!");
        this.isJoined = true;
        // this.listenRemoteEvents();
      }

    public listenRemoteEvents() {
        this.client.on("user-published", async (user, mediaType) => {
          await this.client.subscribe(user, mediaType);
          console.log("hello userp user ",user.uid);
          // console.log("hello userp sc" , this.screen_stream.screen_uid);
          if(!this.screen_stream || user.uid !== this.screen_stream.screen_uid){
             // Subscribe to a remote user.
          console.log("hello subscribe success");
     
          if (mediaType === "video") {
            const remoteVideoTrack = user.videoTrack;
            console.log("hello there");
            // const playerContainer = document.createElement("div");    
            // playerContainer.id = user.uid.toString();
            // document.getElementById('remote_stream')?.appendChild(playerContainer);
            remoteVideoTrack?.play("remote_stream_" + user.uid);
          }
    
          if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack?.play();
          }
          }
         
        });
    
        this.client.on("user-unpublished", (user) => {
          console.log("hello user unpublished ",user);
          const playerContainer = document.getElementById("remote_stream_"+user.uid);
          playerContainer?.remove();
        });
    
        this.client.on("user-joined" ,async  (user : IAgoraRTCRemoteUser)  =>{
          console.log("hello userp user ",user.uid);
          console.log("hello userp sc" , this.screen_stream);
          if(!this.screen_stream ||user.uid !== this.screen_stream.screen_uid){
            console.log("hello join user ayush" , user);
            this.remote_rtc.push(user.uid);
            console.log("hello rtc" , this.remote_rtc);
          }
    
        })
        this.client.on('user-left', (user: IAgoraRTCRemoteUser, reason: string) => {
    
        })
    
      }

}

 // public join_stream = {
    //     appId: "b0b58b051ab648d8898deb5cb66a1ac0",
    //     channel: "test",
    //     token: "007eJxTYBDrWSxQmHHk4jP90rx//C6bv/i6nCrd/CCtf/nB2X539sxTYEgySDK1SDIwNUxMMjOxSLGwsLRISU0yTU4yM0s0TEw28L7Nknxahy3ZXfYTIyMDBIL4LAwlqcUlDAwA6lciWQ==",
    //     uid: 123456,
    // };
    // public remote_stream !: IAgoraRTCClient;
    // public uid !: UID;