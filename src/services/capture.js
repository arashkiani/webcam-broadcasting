import React from 'react';
import Peer from 'peerjs';
import "./capture.css"
export class Capture extends React.Component {
    state = {
        videoElements:{
            width:1680, 
            height:1080,
        },
        peer: new Peer({key: 'lwjd5qra8257b9'})
    }
    componentDidMount(){
        this.setState({
            stream: this.refs.stream
        })
    }
    
    componentDidUpdate() {
        const {id, peer, stream} = this.state
        if(id){
            peer.connect(id);
            console.log('connect', id)
            peer.call()
        }
        peer.on('call', function(call) {
            call.answer();
            call.on('stream', function(remoteStream) {
                stream.srcObject = remoteStream
            });
        })
    }

    render() {
    const {width, height} = this.state.videoElements
    console.log(width, height)
      return <div className="wrapper-capture">
            <video ref="stream" width={width} height={height} autoPlay/>
            <form onSubmit={(e)=>{
                e.preventDefault()
                this.setState(
                    {id:this.refs.to.value}
                )
            }}>
                <input placeholder="Enter Code here" ref="to" />
                <button type="submit">Connect</button>
            </form>
      </div>
    }
  
  }
  
  export default Capture;