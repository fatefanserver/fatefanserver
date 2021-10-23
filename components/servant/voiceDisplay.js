import styles from './servant.module.css'
import SpecialText from './specialtext';
import Typed from 'typed.js';
import { Component } from 'react';
import ReactDOMServer from 'react-dom/server'
import Voicebox from './voicebox';
class VoiceDisplay extends Component{
    //** format like this:
    /*   [m:mood]Line1|[m:mood]Line2|[m:mood]Line3
    /*   automatically scroll down
    /*   \|\s*|\|*\s*(?:\[[man]: *\w+\]\s*)+ <-- use this later when including name and animation
    **/
    state = {
        colour: this.props.colour,  // colour of the boxes
        selectColour: "#ff88aa",  // TODO: change to variable
        curLine: -1,  //index of the current line (out of all lines in the segment)
        curLinePos: -1,  // the subsection of the line currently on
        curMood: this.props.expSheet.base,  // current mood
        curLineText: '',  // current text of the line in case user skips
        isDone: true,
        isLast: false,
        isAnim: null,
    }
    regEx = /^\s*\[m: *(\w+)\]/g;  // find pattern of [mood]line
    allLineStrings = this.props.voiceItems.map((v) => {
            // split by pipes for separate parts to click through within line
            return v.split('|').map((w) => {
                return w;
            })
        });
    componentDidMount() {
        this.typed = new Typed(this.el, {strings: [''], showCursor:false});
    }
    componentWillUnmount() {
        this.typed.destroy();
    }
    setLine = (line) => {

        // destroy current instance of typed, remove static text
        this.typed.destroy();
        var voiceLine;
        var LinePos = this.state.curLinePos + 1;
        var iscurLast = this.state.isLast;
        // check if previous line is same, if not, reset position to 0
        if(this.state.curLine == line){
            this.setState(state => ({curLinePos: LinePos}));
        }
        else{
            this.setState(state => ({curLinePos: 0,curMood:this.props.expSheet.base,isLast:false}));
            LinePos = 0;
            iscurLast = false;
        }
        
        if(!iscurLast){
            const getvoicestring = this.allLineStrings[line][LinePos];
            const checkmood = this.regEx.exec(getvoicestring);
            if(checkmood){
                this.setState(state => ({curMood: this.props.expSheet[checkmood[1]]}));  // set new mood
            }
            // replace mood indicator if exists
            const voiceText = getvoicestring.replace(this.regEx,'');
            voiceLine = ReactDOMServer.renderToString(<SpecialText key={"typed"} mode={"scroll"} data={voiceText}/>);
            this.setState(state => ({ curLine: line, curLineText: voiceText}));
            const options = {
                strings: [voiceLine],
                typeSpeed: 16,
                showCursor: false,
                onComplete: () => this.onDone(),
            };
            this.typed = new Typed(this.el, options);
        }
        //update values
        this.setState(state => ({isDone: false, isLast: LinePos == this.allLineStrings[line].length - 1}));
    }
    onDone = () => {
        this.setState(state => ({ isDone: true}));
        this.typed.destroy();
    }
    resetLine = () => {
        this.setState(state => ({ curLine: -1, curLinePos: -1, curMood: this.props.expSheet.base, isDone: true, isLast: false, isAnim: null}));
    }
    getCurLine = () => this.state.curLine;
    getCurMood = () => this.state.curMood;
    getCurText = () => this.state.curLineText;
    getDone = () => this.state.isDone;
    getLast = () => this.state.isLast;
    render(){
        const curLine = this.getCurLine();
        const curMood = this.getCurMood();
        const curText = this.getCurText();
        const isDone = this.getDone();
        const isLast = this.getLast();
        return(<div style={{
            display: "flex",
            }}>
                <div key="d1">{this.props.voiceItems.map((v,i) => 
                    <div key={i} onClick={() => curLine  == i ? null : this.setLine(i)}><Voicebox 
                          colour={curLine == i ? this.state.selectColour : this.state.colour} 
                          key={i+"voice"} data={v}/></div>
                )}</div>
                <div key="d2" className={styles.galleryHolderVoice}>
                    <img key="gallerybase" className={styles.galleryBase} 
                                           src={curMood ? curMood : this.props.expSheet.base}
                                           style={{animation: this.state.isAnim ? styles[this.state.isAnim]+" 0.5s 1 normal" : ""}}
                                           />
                    <div key="voicetest" className={styles.galleryOverlay + ' ' + styles.voiceTestBox} 
                         style={{top: "75%", left: "0px"}}
                         onClick={() => {
                             if(!isDone){
                                 this.onDone();
                             }
                             else if(isDone && curLine >= 0 && !isLast){
                                 // go to next line
                                this.setLine(this.state.curLine);
                             }
                        }}>
                        <div ref={(el) => { this.el = el; }}/>
                        <SpecialText data={isDone && curLine >= 0 ? curText : ''} mode={"scroll"}/>
                    </div>
                    <div className={isDone && curLine >= 0 && !isLast ? styles.galleryOverlay+' '+styles["arrow-down"]+" bi bi-caret-down-fill" : ''} 
                         style={{top:"85%",left:"94%"}}></div>
                </div>
            </div>);
    }
}

export default VoiceDisplay;