import styles from './servant.module.css'
import SpecialText from './specialtext';


const Transposable = ({data}) => {
    const items = [];
    data.forEach((i) => {
        //console.log(i.type);
        if(i.type == "text"){
            var parseMarkdown = <SpecialText data={i.text}/>;
            items.push(parseMarkdown);
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