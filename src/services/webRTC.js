import React from 'react';
import Peer from 'peerjs';
import './webRTC.css'
export class WebRTC extends React.Component {
    state = {
        id:false,
        videoElements:{
            width:400, 
            height:300,
        },
        peer: new Peer({key: 'lwjd5qra8257b9'}),
        peer2: new Peer({key: 'lwjd5qra8257b9'})
    }
    constructor(){
        super()
        this.state.peer.on('open', (id)=>{
            this.setState({me: id})
        })
    }
    componentDidMount(){
        const videoElements = {...this.state.videoElements,
            canvas:this.refs.canvas, 
            ctx:this.refs.canvas.getContext('2d'),
            stream:this.refs.canvas.captureStream(25),
            video:this.refs.video, 
            streamVideo: this.refs.stream,
        }
        this.setState({videoElements})        
    }
    
    componentDidUpdate() {
        const {id, videoElements, peer, peer2} = this.state
        const {getUserMedia, webkitGetUserMedia, mozGetUserMedia, msGetUserMedia} = navigator
        navigator.getMedia = getUserMedia || webkitGetUserMedia || mozGetUserMedia || msGetUserMedia
        navigator.getMedia({video:true, audio:false}, (stream)=>{
            videoElements.video.srcObject = stream
        },(err)=>{
            console.log(err)
        })

        videoElements.video.addEventListener('play', ()=>{
            this.draw(videoElements)
            if(id){
                console.log(id)
                const {stream} = videoElements
                peer2.call(id, stream);
            }
        }, false)

        peer.on('call', (call)=>{
            call.answer();
            console.log(call)
            call.on('stream', (remoteStream)=> {
                videoElements.streamVideo.srcObject = remoteStream
            });
        })
    }
    
    
    draw(videoElements){
        const {ctx, video, width, height} = videoElements
        ctx.drawImage(video, 0, 0, width, height);
        setTimeout(this.draw, 25, videoElements)
    }

    answer(peer){

    }

    streamExample(videoElements){
        const {stream} = videoElements
        const peer1 = new Peer({key: 'lwjd5qra8257b9'});
        const peer2 = new Peer({key: 'lwjd5qra8257b9'});
        console.log(peer1)
        peer2.on('open', (id)=>{
            peer1.call(id, stream);
        })
        peer2.on('call', function(call) {
            console.log('peer 2 is called now')
            call.answer();
            call.on('stream', function(remoteStream) {
                // Show stream in some video/canvas element.
                console.log(remoteStream)
                videoElements.streamVideo.srcObject = remoteStream
            });
        })
    }


    render() {
        const {me} = this.state
      return <React.Fragment>
        <div>
            <canvas ref="canvas" width="400" height="300"/>
            <video ref="video" className="hide" width="400" height="300" autoPlay/>
            <h1>Webcam: {me}</h1>
        </div>
        <div>
            <video ref="stream" width="400" height="300" autoPlay/>
            <h1>Streaming</h1>
            <form onSubmit={(e)=>{
                e.preventDefault()
                this.setState(
                    {id:this.refs.to.value}
                )
            }}>
                <input ref="to" defaultValue={me} />
                <button type="submit">Connect</button>
            </form>
        </div>
      </React.Fragment>
    }
  
  }
  
  export default WebRTC;