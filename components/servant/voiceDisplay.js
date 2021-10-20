import styles from './servant.module.css'
import SpecialText from './specialtext';
import Typed from 'typed.js';
import { Component } from 'react';
import Voicebox from './voicebox';
class VoiceDisplay extends Component{
    state = {
        colour: this.props.colour,
        selectColour: "#ff88aa",
        curLine: -1,
        curLineText: '',
    }
    setLine = (line,i) => {
        this.setState(state => ({ curLine: i, curLineText: line}));
    }
    resetLine = () => {
        this.setState(state => ({ curLine: -1, curLineText: ''}));
    }
    getCurLine = () => this.state.curLine;
    getCurText = () => this.state.curLineText;
    render(){
        const curText = this.getCurText();
        const curLine = this.getCurLine();
        return(<div style={{
            display: "flex",
            }}>
                <div>{this.props.voiceItems.map((v,i) => 
                    <div onClick={() => curLine == i ? this.resetLine() : this.setLine(v,i)}><Voicebox 
                          colour={curLine == i ? this.state.selectColour : this.state.colour} 
                          key={i} data={v}/></div>
                )}</div>
                <div className={styles.galleryHolderVoice}>
                    <img className={styles.galleryBase} src={this.props.expSheet.base}/>
                    <div className={styles.galleryOverlay + ' ' + styles.voiceTestBox} 
                         style={{top: "450px", left: "0px"}}
                    >{curText}</div>
                </div>
            </div>);
    }
}

export default VoiceDisplay;