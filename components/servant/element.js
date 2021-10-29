import styles from './servant.module.css'
import SpecialText from './specialtext';
import Voicebox from './voicebox';
import VoiceDisplay from './voiceDisplay';
import ImageGallery from './imggallery';

const Transposable = ({data, bgColour, sColour}) => {
    const items = [];
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
                items.push(<div key={counter+'i'} style={{display:"flex"}}>
                               <img className={styles.iconImg} src={i.icon}/>
                               <SpecialText data={i.text}/>
                           </div>);
                items.push(<hr key={counter+'b'}/>);
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
                items.push(<Voicebox key={counter} colour={bgColour} data={i.text} title={i.title}/>);
                items.push(<p key={counter+'p'}/>)

                items.push(<div key={counter+'b'}/>);
                break;
            case 'voiceBox':
                items.push(<VoiceDisplay key={counter+'vb'} sColour={sColour} colour={bgColour} expSheet={i.expressionsheet} voiceItems={i.voicelines}/>);
                items.push(<div key={counter+'b'}/>);
                break;
            case 'gallery':
                items.push(<ImageGallery key={counter} imgdata={i.img}/>);
                items.push(<div key={counter+'b'}/>);
                break;
        }
        counter++;

        
    })
    items.pop();  //removes last break
    return(
    <div className={styles.gallery}>
        {items}
    </div>
    )
};
//{Object.keys().length}
export default Transposable;