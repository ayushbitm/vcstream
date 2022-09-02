import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, ILocalAudioTrack, ILocalVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";


export class sstream{

    public screenvideoTrack !: ILocalVideoTrack;
    public screenAudioTrack !: ILocalAudioTrack;
    public client!: IAgoraRTCClient;
    public screen_uid :any;
    public screen_share_track !: [ILocalVideoTrack,ILocalAudioTrack] | ILocalVideoTrack;

    constructor(){
        this.client =  AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
    }

    async screenShare(appId : any, channel : any, token :any ){
            const uid = await this.client.join(appId,channel,token);
            console.log("hello screen uid",uid);
            this.screen_uid=uid;
            // let localScreenAudioTrack: any,localScreenVideoTrack: any;
            const screenTrack = await AgoraRTC.createScreenVideoTrack({
              encoderConfig: "480p",
            },"auto");
            this.screen_share_track=screenTrack;
            // console.log("hello screen" , screenTrack);
            // screenTrack[0].play("screen_stream");
            if(screenTrack instanceof Array)
            {   this.screenvideoTrack=screenTrack[0];
                this.screenAudioTrack = screenTrack[1];
            }
            else{
                this.screenvideoTrack=screenTrack;
            }
            // console.log("hello",this.screenvideoTrack);
            this.screenvideoTrack.play("screen_streaming");
            // .play("screen_stream");
            if(this.screenAudioTrack && this.screenvideoTrack)
            await this.client.publish([ this.screenvideoTrack, this.screenAudioTrack]);
            else
            await this.client.publish(this.screenvideoTrack);
    }

}



// public screentrack!: [ILocalVideoTrack, ILocalAudioTrack] | ILocalVideoTrack;

// constructor(){
//     this.client =  AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
// }

// async screenShare(appId : any, channel : any, token :any ){
//         const uid = await this.client.join(appId,channel,token);
//         console.log("hello screen uid",uid);
//         this.screen_uid=uid;
//         this.screentrack = await AgoraRTC.createScreenVideoTrack({
//           encoderConfig: "480p",
//         },"enable");
//         // console.log("hello ther",this.screentrack);
//         this.screenvideoTrack=this.screentrack[0];
//         this.screenAudioTrack = this.screentrack[1];
//         // console.log("hello",this.screenvideoTrack);
//         this.screenvideoTrack.play("screen_stream_");
//         // .play("screen_stream");
//         // if(this.screentrack[0])
//         // await this.client.publish([this.screenvideoTrack,this.screenAudioTrack]);
// }