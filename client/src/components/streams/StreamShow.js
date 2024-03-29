import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../actions';
import flv from 'flv.js';

class StreamShow extends Component {
 constructor(props) {
  super(props);
  this.videoRef = React.createRef();
 }

 componentDidMount() {
  const id = this.props.match.params.id;
  this.props.fetchStream(id);
  this.buildPlayer();
 }

 componentDidUpdate() {
  this.buildPlayer();
 }

 componentWillUnmount() {
  this.player.destroy();
 }

 buildPlayer() {
  if (this.player || !this.props.stream) return;

  const id = this.props.match.params.id;

  this.player = flv.createPlayer({
   type: 'flv',
   url: `http://192.168.193.60:8000/live/${id}.flv`,
  });
  this.player.attachMediaElement(this.videoRef.current);
  this.player.load();
 }

 render() {
  if (!this.props.stream) {
   return <div>Loading...</div>;
  }

  return (
   <div style={{ backgroundColor: 'black' }}>
    <video
     ref={this.videoRef}
     style={{ width: '100%', height: 'auto' }}
     controls={true}
     autoPlay={true}
    />
    <div
     style={{
      backgroundImage: `url('https://i.pinimg.com/originals/94/9a/89/949a8992f9829eedcb60b7f7c0b2faf6.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '150px',
      width: 'auto',
     }}
    >
     <h1 className='globalHeaderL' style={{ color: 'red' }}>
      {this.props.stream.title}
     </h1>
     <h4 className='globalHeaderL' style={{ color: 'red' }}>
      {this.props.stream.description}
     </h4>
    </div>
   </div>
  );
 }
}

const mapStateToProps = (state, ownProps) => {
 return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
