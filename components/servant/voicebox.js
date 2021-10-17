import styles from './servant.module.css'
import SpecialText from './specialtext';
import Typed from 'react-typed';

const Voicebox = ({colour,data}) => {
    return(<p style={{
        display: "flex",
        backgroundColor: colour,
      }} className={styles.voiceLine}>{[<i className={"bi bi-play-circle-fill" + ' ' + styles.playIcon} ></i>,
                                        <Typed
                    strings={[data]}
                    typeSpeed={8}
                    showCursor={false}
                />]}</p>);
};

export default Voicebox;