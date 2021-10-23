import styles from './servant.module.css'
import SpecialText from './specialtext';
import Voicebox from './voicebox';
import VoiceDisplay from './voiceDisplay';
import ImageGallery from './imggallery';

const Transposable = ({data, bgColour, sColour}) => {
    var currentMode = "default";
    const items = [];
    const voiceItems = [];
    var expSheet;
    var counter = 0;
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
                items.push(<SpecialText data={i.text} key={counter}/>);
                items.push(<hr key={counter+'b'}/>);
                break;
            case 'skill':
                items.push(<h3 key={counter}>{<SpecialText data={i.name}/>} {<SpecialText data={i.rank.replace(checkdash,'–')}/>}</h3>);
                items.push(<div key={counter+'i'} className={styles.skillLeft}>
                               <img className={styles.iconImg} src={i.icon}/>
                           </div>);
                items.push(<div key={counter+'d'} className={styles.skillRight}>
                               {<SpecialText data={i.text}/>}
                           </div>);
                items.push(<hr key={counter+'b'} className={styles.resetSkill}/>);
                break;
            case 'np':
                items.push(<h3 key={counter}>{<SpecialText data={i.name}/>}</h3>);
                items.push(<p key={counter+'nr'} className={styles.indent}>Rank: {<SpecialText data={i.rank.replace(checkdash,'–')}/>}</p>);
                items.push(<p key={counter+'nm'} className={styles.indent}>Maximum Targets: {<SpecialText data={i.targets.replace(checkdash,'–')}/>}</p>);
                items.push(<p key={counter+'nra'} className={styles.indent}>Range: {<SpecialText data={i.range.replace(checkdash,'–')}/>}</p>);
                items.push(<p key={counter+'nc'} className={styles.indent}>Classification: {<SpecialText data={i.classification.replace(checkdash,'–')}/>}</p>);
                items.push(<SpecialText key={i+'st'} data={i.text}/>);
                items.push(<hr key={counter+'b'}/>);
                break;
            case 'voice':
                // TODO: MAKE BG VARIABLE INSTEAD OF BEING HARDCODED
                if(currentMode == "voice"){
                    voiceItems.push(i.text);
                }
                else{
                    items.push(<Voicebox key={counter} colour={bgColour} data={i.text}/>);
                    items.push(<p key={counter+'p'}/>)
                }
                items.push(<div key={counter+'b'}/>);
                break;
            case 'gallery':
                items.push(<ImageGallery key={counter} imgdata={i.img}/>);
                items.push(<div key={counter+'b'}/>);
                break;
        }

        counter++;

        
    })
    if(currentMode == "voice"){
        items.unshift(<VoiceDisplay key={'v'} sColour={sColour} colour={bgColour} expSheet={expSheet} voiceItems={voiceItems}/>);
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