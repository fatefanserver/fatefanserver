import styles from './servant.module.css';
import ReactMarkdown from 'react-markdown';

const CustomRenderers = {
    p: ({children}) => {
        const checkregexTags = /#fg/;
        const regexFg = /\[([\S ][^\]]+)\]\{#(\w+) ([\S ][^\}]+)\}/g;
        for(var i = 0; i < children.length; i++){
            if(typeof(children[i]) === 'string'){
                if(checkregexTags.test(children[i])){
                    const furigana = [...children[i].matchAll(regexFg)];
                    children[i] = children[i].split(/\[([\S ][^\]]+)\]\{#\w+ [\S ][^\}]+\}/g).map((v,i) => {
                        if(i % 2){
                            var tag = furigana[(i-1)/2][2];
                            switch(tag){
                                case 'fg':
                                    return <span className={styles[tag]} t={furigana[(i-1)/2][3]}>{v}</span>
                                case 'c':
                                    return <span style={{color: furigana[(i-1)/2][3]}}>{v}</span>
                                    
                                case 'tp':
                                    return <div className={styles[tag]}>{v}<span className={styles.tooltiptext}>{furigana[(i-1)/2][3]}</span></div>
                            }
                        }
                        else{
                            return v
                        }
                    });
                }
            }
        }
        return children
    }
}

const SpecialText = ({data}) => {
    return(
        <ReactMarkdown components={CustomRenderers}>{data}</ReactMarkdown>
    )
};
export default SpecialText;