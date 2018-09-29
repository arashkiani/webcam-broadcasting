import React from 'react';
import Peer from 'peerjs';
import './webRTC.css'
export class broadcast extends React.Component {
    state = {
        videoElements:{
            width:400, 
            height:300,
        },
        peer: new Peer({key: 'lwjd5qra8257b9'})
    }
    constructor(){
        super()
        this.draw = this.draw.bind(this)
        this.state.peer.on('open', (id)=>{
            this.setState({me: id})
        })
    }
    componentDidMount(){
        const videoElements = {...this.state.videoElements,
            ctx:this.refs.canvas.getContext('2d'),
            stream:this.refs.canvas.captureStream(25),
            video:this.refs.video
        }
        this.setState({videoElements})
        const {getUserMedia, webkitGetUserMedia, mozGetUserMedia, msGetUserMedia} = navigator
        navigator.getMedia = getUserMedia || webkitGetUserMedia || mozGetUserMedia || msGetUserMedia
        navigator.getMedia({video:true, audio:false}, (stream)=>{
            videoElements.video.srcObject = stream
        },(err)=>{
            console.log(err)
        })
    }
    
    componentDidUpdate() {
        const {videoElements, peer} = this.state
        videoElements.video.addEventListener('play', ()=>{
            this.draw(videoElements)
        }, false)
        peer.on('connection',(caller)=>{
            const {stream} = videoElements
            peer.call(caller.peer, stream)
        })
    }
    
    
    draw(videoElements){
        const {ctx, video, width, height} = videoElements
        ctx.drawImage(video, 0, 0, width, height);
        setTimeout(this.draw, 25, videoElements)
    }


    render() {
        const {me} = this.state
      return <React.Fragment>
        <div>
            <canvas ref="canvas" width="400" height="300"/>
            <video ref="video" className="hide" width="400" height="300" autoPlay/>
            <h1>Webcam: {me}</h1>
        </div>
      </React.Fragment>
    }
  
  }
  
  export default broadcast;