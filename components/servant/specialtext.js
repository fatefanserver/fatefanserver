import styles from './servant.module.css';
import ReactMarkdown from 'react-markdown';

const CustomRenderers = {
    p: ({children, mode}) => {
        const checkregexTags = /#\w/;
        // checks for a pattern of [text]{#tag tag text} and returns them in capture groups.
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
                                    // furigana
                                    return <span key={i} className={styles[tag]} t={furigana[(i-1)/2][3]}>{v}</span>
                                case 'c':
                                    // colour text
                                    return <span key={i} style={{color: furigana[(i-1)/2][3]}}>{v}</span>
                                case 'tp':
                                    // tooltip
                                        return <div key={i} className={styles[tag]}>{v}<span className={styles.tooltiptext}>{furigana[(i-1)/2][3]}</span></div>
                                    
                                    
                                default:
                                    return v;
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

const CustomRenderersScroll = {
    p: ({children, mode}) => {
        const checkregexTags = /#\w/;
        const regexMood = /\|\s*|\|*\s*\[m: *\w+\]/g;
        // checks for a pattern of [text]{#tag tag text} and returns them in capture groups.
        const regexFg = /\[([\S ][^\]]+)\]\{#(\w+) ([\S ][^\}]+)\}/g;
        for(var i = 0; i < children.length; i++){
            if(typeof(children[i]) === 'string'){
                children[i] =children[i].replace(regexMood,'');
                if(checkregexTags.test(children[i])){
                    const furigana = [...children[i].matchAll(regexFg)];
                    children[i] = children[i].split(/\[([\S ][^\]]+)\]\{#\w+ [\S ][^\}]+\}/g).map((v,i) => {
                        if(i % 2){
                            var tag = furigana[(i-1)/2][2];
                            switch(tag){
                                case 'fg':
                                    // furigana
                                    return <span key={i} className={styles[tag]} t={furigana[(i-1)/2][3]}>{v}</span>
                                case 'c':
                                    // colour text
                                    return <span key={i} style={{color: furigana[(i-1)/2][3]}}>{v}</span>
                                case 'tp':
                                    // tooltip
                                    //return <div key={i} className={styles.tpd}>{v}<span className={styles.tooltiptext}>{'`'+ furigana[(i-1)/2][3] + '`'}</span></div>
                                    return <div key={i} className={styles.tpd} title={furigana[(i-1)/2][3]}>{v}</div>
                                default:
                                    return v;
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

const SpecialText = ({data, mode}) => {
    return(<ReactMarkdown components={ mode == "scroll"? CustomRenderersScroll : CustomRenderers}>{data}</ReactMarkdown>)
};
export default SpecialText;