import styles from './servant.module.css'
import SpecialText from './specialtext';


const Transposable = ({data}) => {
    const items = [];
    data.forEach((i) => {
        //console.log(i.type);
        const checkdash = /^-/;
        switch (i.type){
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
                if(i.image){
                    items.push(<img className={styles.floatImage} src={i.image}/>);
                }
                items.push(<h3>{<SpecialText data={i.name}/>}</h3>);
                items.push(<p className={styles.indent}>Rank: {<SpecialText data={i.rank.replace(checkdash,'–')}/>}</p>);
                items.push(<p className={styles.indent}>Maximum Targets: {<SpecialText data={i.targets.replace(checkdash,'–')}/>}</p>);
                items.push(<p className={styles.indent}>Range: {<SpecialText data={i.range.replace(checkdash,'–')}/>}</p>);
                items.push(<p className={styles.indent}>Classification: {<SpecialText data={i.classification.replace(checkdash,'–')}/>}</p>);
                items.push(<SpecialText data={i.text}/>);
                items.push(<hr/>);
        }

        
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