import styles from './servant.module.css'
import SpecialText from './specialtext';
import Voicebox from './voicebox';
import VoiceDisplay from './voiceDisplay';

const Transposable = ({data}) => {
    var currentMode = "default";
    const items = [];
    const voiceItems = [];
    var expSheet;
    data.forEach((i) => {
        //TODO: remove all the inserted line breaks
        const checkdash = /^-/;  // to check for dashes and not make them into bullet lists

        switch (i.type){
            case 'setting':
                // check the setting entry
                if(i.isVNBox){
                    currentMode = "voice";
                    expSheet = i.expressionsheet;
                }
                break;
            case 'text':
                items.push(<SpecialText data={i.text}/>);
                items.push(<hr/>);
                break;
            case 'skill':
                items.push(<h3>{<SpecialText data={i.name}/>} {<SpecialText data={i.rank.replace(checkdash,'–')}/>}</h3>);
                items.push(<div className={styles.skillLeft}>
                               <img className={styles.iconImg} src={i.icon}/>
                           </div>);
                items.push(<div className={styles.skillRight}>
                               {<SpecialText data={i.text}/>}
                           </div>);
                items.push(<hr className={styles.resetSkill}/>);
                break;
            case 'np':
                items.push(<h3>{<SpecialText data={i.name}/>}</h3>);
                items.push(<p className={styles.indent}>Rank: {<SpecialText data={i.rank.replace(checkdash,'–')}/>}</p>);
                items.push(<p className={styles.indent}>Maximum Targets: {<SpecialText data={i.targets.replace(checkdash,'–')}/>}</p>);
                items.push(<p className={styles.indent}>Range: {<SpecialText data={i.range.replace(checkdash,'–')}/>}</p>);
                items.push(<p className={styles.indent}>Classification: {<SpecialText data={i.classification.replace(checkdash,'–')}/>}</p>);
                items.push(<SpecialText data={i.text}/>);
                items.push(<hr/>);
                break;
            case 'voice':
                // TODO: MAKE BG VARIABLE INSTEAD OF BEING HARDCODED
                if(currentMode == "voice"){
                    voiceItems.push(i.text);
                }
                else{
                    items.push(<Voicebox colour="#ff4488" data={i.text}/>);
                    items.push(<p/>)
                }
                items.push(<div/>);
                break;
        }

        
    })
    if(currentMode == "voice"){
        items.unshift(<VoiceDisplay colour="#ff4488" expSheet={expSheet} voiceItems={voiceItems}/>);
    }
    items.pop();  //removes last break
    return(
    <div className={styles.gallery}>
        {items}
    </div>
    )
};
//{Object.keys().length}
export default Transposable;