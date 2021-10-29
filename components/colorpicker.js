import React from 'react';
import { ChromePicker } from 'react-color';
import firebase from '../firebase/clientApp';

class ColourPicker extends React.Component {
    state = {isShow: false}
    toggleShow = () => {this.setState({isShow: this.state.isShow ? false : true})}
    getShow = () => this.state.isShow;
    addUser = e => {
      e.preventDefault();
      const db = firebase.firestore();
      console.log('a')
      const userRef = db.collection("wiki").doc("producer")
      userRef.get().then(console.log('b'));
    };
  render() {
    const isShow = this.getShow();
    return (<>
    <button onClick={() => this.toggleShow()}>Show colour picker</button>
    {isShow ? <ChromePicker color={"#ffffff"} /> : null}
    <button onClick={this.addUser}></button>
    </>)
    ;
  }
}


export default ColourPicker;