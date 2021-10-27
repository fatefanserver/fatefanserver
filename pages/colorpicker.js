import React from 'react';
import { ChromePicker } from 'react-color';

class ColourPicker extends React.Component {
    state = {isShow: false}
    toggleShow = () => {this.setState({isShow: this.state.isShow ? false : true})}
    getShow = () => this.state.isShow;
  render() {
    const isShow = this.getShow();
    return (<>
    <button onClick={() => this.toggleShow()}>Colour picker</button>
    {isShow ? <ChromePicker color={"#ffffff"} /> : null}
    </>);
  }
}

export default ColourPicker;