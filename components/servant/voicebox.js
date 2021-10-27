import styles from './servant.module.css'
import SpecialText from './specialtext';
import Typed from 'typed.js';
import ReactDOMServer from 'react-dom/server'
import { Component } from 'react';

class Voicebox extends Component{
    state = {
        buttonState: "play",
        isDone: true,
        minHeight: 50,
        minWidth: "inherit",
        // PUT MAX HEIGHT HERE
        maxHeight: 100,
        firstLoop: true,
    }
    componentDidMount() {
        var voicetext = <SpecialText data={this.props.data} mode={"scroll"}/>;
        var getvoicestring = ReactDOMServer.renderToString(voicetext);
        //function setStateFunction () {this.state.isDone = true};
        const options = {
            strings: [getvoicestring],
            typeSpeed: 8,
            showCursor: false,
            onComplete: () =>this.onDone(),
        };
        this.typed = new Typed(this.el, options);
        this.typed.destroy();
    }
    componentWillUnmount() {
        this.typed.destroy();
    }
    toggleIcon = () => {
        this.setState(state => ({ buttonState: this.state.buttonState == "play" ? "pause" : "play"}));
    }
    onDone = () => {
        this.setState(state => ({ isDone: true}));
        this.toggleIcon();
    }
    pauseIcon = () => {
        this.typed.toggle();
        this.toggleIcon();
    }
    resetIcon = () => {
        if(this.state.firstLoop){
            var curval = this.el.parentElement.parentElement.getBoundingClientRect();
            this.setState(state => ({ firstLoop: false, isDone: false, minHeight: curval.height, minWidth: curval.width}));
            this.typed.reset();
            this.toggleIcon();
        }
        else{
            this.setState(state => ({ isDone: false}));
            this.typed.reset();
            this.toggleIcon();
        }
    }
    stopTyping = () => {
        if(this.state.buttonState == "pause"){
            this.typed.destroy();
            this.setState(state => ({isDone: true, firstLoop: true}));
            this.toggleIcon();
        }
    }
    getButton = () => this.state.buttonState;
    getDone = () => this.state.isDone;
    getLoop = () => this.state.firstLoop;
    render(){
    const curButton = this.getButton();
    const stateDone = this.getDone();
    const loopState = this.getLoop();
    return(<div style={{
        display: "flex",
        backgroundColor: this.props.colour,
        maxHeight: "180px",
        minHeight: this.state.minHeight,
        minWidth: this.state.minWidth,
        position: "relative",
        margin: "0 10px 0 10px",
        borderBottom: "1px solid white",
      }} className={styles.voiceLine}>
      {this.props.title ? <b style={{paddingRight:"20px"}} >{ this.props.title }<br/></b> : null}
      {[<i key="icon" onClick={() => stateDone ? this.resetIcon() : this.pauseIcon()} 
                                        className={"bi bi-"+curButton+"-circle-fill" + ' ' + styles.playIcon}/>,
                <span key="padIcon" style={{paddingRight:"20px"}}></span>,
                <i key="holdText" onClick={loopState ? null : () => this.stopTyping()} className={styles.voiceText}>
                    <span ref={(el) => { this.el = el; }} key="para"/>{
                        <SpecialText data={loopState ? this.props.data : ''} key="para2" mode={"scroll"}/>
                    }
                </i>]}
            </div>);
    }
}

export default Voicebox;