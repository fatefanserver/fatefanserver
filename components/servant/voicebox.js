import styles from './servant.module.css'
import DialogText from './dialogtext';
import SpecialText from './specialtext';
import Typed from 'react-typed';
import ReactDOMServer from 'react-dom/server'

const Voicebox = ({colour,data}) => {
    var voicetext = <SpecialText data={data}/>;
    return(<p style={{
        display: "flex",
        backgroundColor: colour,
        maxHeight: "100px",
        position: "relative",
      }} className={styles.voiceLine}>{[<i key="icon" className={"bi bi-play-circle-fill" + ' ' + styles.playIcon} ></i>,
                                        <i className={styles.voiceText}><Typed key="para"
                    strings={[ReactDOMServer.renderToString(voicetext)]}
                    typeSpeed={8}
                    showCursor={false}
                /></i>]}</p>);
};

export default Voicebox;