import styles from './servant.module.css'
import SpecialText from './specialtext';
import DialogText from './dialogtext';
import Typed from 'react-typed';
import ReactDOMServer from 'react-dom/server'

const Voicebox = ({colour,data}) => {
    var voicetext = <DialogText data={data}/>;
    return(<p style={{
        display: "flex",
        backgroundColor: colour,
      }} className={styles.voiceLine}>{[<i className={"bi bi-play-circle-fill" + ' ' + styles.playIcon} ></i>,
                                        <Typed
                    strings={[ReactDOMServer.renderToString(voicetext)]}
                    typeSpeed={8}
                    showCursor={false}
                />]}</p>);
};

export default Voicebox;