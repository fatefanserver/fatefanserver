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
        selectColour: this.props.sColour,  // TODO: change to variable
        curLine: -1,  //index of the current line (out of all lines in the segment)
        curLinePos: -1,  // the subsection of the line currently on
        curMood: this.props.expSheet.base,  // current mood
        curLineText: '',  // current text of the line in case user skips
        isDone: true,
        isLast: false,
        isAnim: null,
        expSheet: {base: ''}
    }
    regEx = /^\s*\[m: *(\w+)\]/g;  // find pattern of [mood]line
    //{Object.keys(imgdata)
    setAllLineStrings() {
        this.allLineStrings = this.props.voiceItems.map((v,i) => {
            // split by pipes for separate parts to click through within line
            return v.text.split('|').map((w) => {
                return w;
            })
        });
    }
    componentDidMount() {
        this.setExpSheet(this.props.expSheet);
        this.typed = new Typed(this.el, {strings: [''], showCursor:false});
    }
    componentWillUnmount() {
        this.typed.destroy();
    }
    setLine = (line) => {

        // destroy current instance of typed, remove static text
        this.typed.destroy();
        this.setBaseMood();
        var voiceLine;
        var LinePos = this.state.curLinePos + 1;
        var iscurLast = this.state.isLast;
        // check if previous line is same, if not, reset position to 0
        if(this.state.curLine == line){
            this.setState(state => ({curLinePos: LinePos}));
        }
        else{
            this.setState(state => ({curLinePos: 0,curMood:this.expSheet.base,isLast:false}));
            LinePos = 0;
            iscurLast = false;
        }
        
        if(!iscurLast){
            const getvoicestring = this.allLineStrings[line][LinePos];
            const checkmood = this.regEx.exec(getvoicestring);
            if(checkmood){
                this.setState(state => ({curMood: this.expSheet[checkmood[1]]}));  // set new mood
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
        this.typed.destroy();
        this.setState(state => ({ curLine: -1, curLinePos: -1, curMood: this.expSheet.base, isDone: true, isLast: false, isAnim: null}));
    }
    setBaseMood = ( ) => {
        this.setState({curMood:this.expSheet.base});
    }
    setExpSheet = (expsheet) => {
        var newObj = {base: ''}
        expsheet.map((v) => {
            newObj[v.name]=v.url;
        });
        this.expSheet = newObj;
    }
    getCurLine = () => this.state.curLine;
    getCurMood = () => this.state.curMood;
    getCurText = () => this.state.curLineText;
    getDone = () => this.state.isDone;
    getLast = () => this.state.isLast;
    render(){
        this.setAllLineStrings();
        this.setExpSheet(this.props.expSheet);
        const curLine = this.getCurLine();
        const curMood = this.getCurMood();
        const curText = this.getCurText();
        const isDone = this.getDone();
        const isLast = this.getLast();
        return(<div style={{
            display: "flex",
            position:"relative",
            height:"30em"
            }}>
                <div key="d1" style={{width:"40%",overflow:"auto"}}>{this.props.voiceItems.map((v,i) => 
                    <div key={i} onClick={() => curLine  == i ? this.resetLine() : this.setLine(i)}><Voicebox 
                           colour={curLine == i ? this.props.sColour : this.props.colour} 
                          key={i+"voice"} data={v.text} title={v.title}/></div>
                )}</div>
                <div key="d2" className={styles.galleryHolderVoice}>
                    <div key={"gallerybox"} className={styles.galleryBase}/>
                    <img key="gallerybase" className={styles.galleryOverlay} 
                                           src={curMood ? curMood : this.expSheet.base}
                                           style={{animation: this.state.isAnim ? styles[this.state.isAnim]+" 0.5s 1 normal" : ""}}
                                           />
                    <div key="graident" className={styles.galleryOverlay + " " + styles.gradientBox}/ >
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
                        <SpecialText  data={isDone && curLine >= 0 ? curText : ''} mode={"scroll"}/>
                    </div>
                    <div className={isDone && curLine >= 0 && !isLast ? styles.galleryOverlay+' '+styles["arrow-down"]+" bi bi-caret-down-fill" : ''} 
                         style={{top:"85%",left:"94%"}}></div>
                </div>
            </div>);
    }
}

export default VoiceDisplay;