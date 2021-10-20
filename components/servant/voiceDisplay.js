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
                <div key="d1">{this.props.voiceItems.map((v,i) => 
                    <div key={i} onClick={() => curLine == i ? this.resetLine() : this.setLine(v,i)}><Voicebox 
                          colour={curLine == i ? this.state.selectColour : this.state.colour} 
                          key={i+"voice"} data={v}/></div>
                )}</div>
                <div key="d2" className={styles.galleryHolderVoice}>
                    <img key="gallerybase" className={styles.galleryBase} src={this.props.expSheet.base}/>
                    <div key="voicetest" className={styles.galleryOverlay + ' ' + styles.voiceTestBox} 
                         style={{top: "450px", left: "0px"}}
                    >{curText}</div>
                </div>
            </div>);
    }
}

export default VoiceDisplay;