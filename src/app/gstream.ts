import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";


export class gstream {

    public client!: IAgoraRTCClient;
    public localAudioTrack!: IMicrophoneAudioTrack;
    public localVideoTrack!: ICameraVideoTrack;
    public isJoined!: boolean;
    public remote_rtc  : IAgoraRTCRemoteUser[] = [];
    private appId : string ;
    private channel : string;

    constructor(appId: string, channel: string) {
        this.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
        
        this.listenRemoteEvents();
        this.appId = appId;
        this.channel = channel;
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
        this.listenRemoteEvents();
      }

    public listenRemoteEvents() {
        this.client.on("user-published", async (user, mediaType) => {
          // Subscribe to a remote user.
          await this.client.subscribe(user, mediaType);
          console.log("subscribe success");
          console.log("hello",user);
          console.log("hello",mediaType);
    
          if (mediaType === "video") {
            const remoteVideoTrack = user.videoTrack;
            // const playerContainer = document.createElement("div");
    
            // playerContainer.id = user.uid.toString();
            // document.getElementById('remote_stream')?.appendChild(playerContainer);
            remoteVideoTrack?.play("remote_stream");
          }
    
          if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack?.play();
          }
        });
    
        this.client.on("user-unpublished", (user) => {
          console.log("hello user unpublished ",user);
          // const playerContainer = document.getElementById("remote_stream");
          // playerContainer?.remove();
        });
    
        this.client.on("user-joined" ,async  (user : IAgoraRTCRemoteUser)  =>{
          let id = user.uid;
        //   this.remote_rtc.push({
        //     'uid': +id,
        //     hasAudio: true,
        //     hasVideo: true
        //   });
    
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