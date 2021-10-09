import styles from './servant.module.css'

const Gallery = ({imgdata}) => (
    <div className={styles.gallery}>
    <img src={imgdata[0].url} className={styles.galleryImg}/>
    <p >
        {imgdata[0].description}
        
    </p>
    </div>
    
);
//{Object.keys(imgdata).length}
export default Gallery;