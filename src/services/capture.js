import React from 'react';
import Peer from 'peerjs';
import './webRTC.css'
export class Capture extends React.Component {
    state = {
        videoElements:{
            width:400, 
            height:300,
        },
        peer: new Peer({key: 'lwjd5qra8257b9'})
    }
    componentDidMount(){
        this.setState({stream: this.refs.stream})
    }
    
    componentDidUpdate() {
        const {id, peer, stream} = this.state
        console.log(this.state)
        if(id){
            peer.connect(id);
            peer.call()
        }
        peer.on('call', function(call) {
            call.answer();
            call.on('stream', function(remoteStream) {
                console.log(remoteStream)
                stream.srcObject = remoteStream
            });
        })
    }

    render() {
      return <React.Fragment>
            <video ref="stream" width="400" height="300" autoPlay/>
            <h1>Streaming</h1>
            <form onSubmit={(e)=>{
                e.preventDefault()
                this.setState(
                    {id:this.refs.to.value}
                )
            }}>
                <input ref="to" defaultValue="" />
                <button type="submit">Connect</button>
            </form>
      </React.Fragment>
    }
  
  }
  
  export default Capture;