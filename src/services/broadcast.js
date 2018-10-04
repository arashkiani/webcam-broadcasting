import React from 'react';
import Peer from 'peerjs';
import './broadcast.css'
export class broadcast extends React.Component {
    state = {
        videoElements:{
            width:1920, 
            height:1080,
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
        setTimeout(this.draw, 15, videoElements)
    }


    render() {
        const {me, videoElements} = this.state
        const {width, height} = videoElements
        return <div className="broadcast">
            <canvas ref="canvas" width={width} height={height} />
            <video ref="video" autoPlay/>
            <p>Your Code: {me}</p>
        </div>
    }
  
  }
  
  export default broadcast;