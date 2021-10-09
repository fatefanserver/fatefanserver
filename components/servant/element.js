import styles from './servant.module.css'
import ReactMarkdown from 'react-markdown';
import SpecialText from './specialtext';


const Transposable = ({data}) => {
    const items = [];
    data.forEach((i) => {
        //var parseMarkdown = <ReactMarkdown children={i.text} components={renderers}/>;
        var parseMarkdown = <SpecialText data={i.text}/>;
        items.push(parseMarkdown);
    })
    return(
    <div className={styles.gallery}>
        {items}
    </div>
    )
};
//{Object.keys().length}
export default Transposable;