import styles from './servant.module.css'
import { Component } from 'react';
import SpecialText from './specialtext';


class ImageGallery extends Component{
    //num is the current gallery component zoomed in on
    //curExp is for the current expression
    state = {
        num: 0,
    }
    toggleImageF = () => {
        this.setState(state => ({ num: this.state.num + 1, curExp: '' }));
        
      }
    toggleImageB = () => {
        this.setState(state => ({ num: this.state.num - 1, curExp: ''}));
    }
    setImage = (i) => {
        this.setState(state => ({num: i}));
    }
    showWarn = () => {}
    getImage = () => this.state.num;
    render(){
        const curImage = this.getImage();
        const trynum =  this.props.imgdata.length - 1;
        return(
            <div className={styles.gallery}>
                <button onClick={this.state.num > 0 ? this.toggleImageB : this.showWarn} disabled={this.state.num == 0 ? true : false}>&lt;</button>
                <button onClick={this.state.num < trynum ? this.toggleImageF : this.showWarn} disabled={this.state.num == trynum ? true : false}>&gt;</button>
                <div className={styles.galleryHolderThumb}>
                    {this.props.imgdata.map((v,i) => {
                        return (<div className={styles.galleryThumbnail} key={i}>
                            <img style={{maxWidth:"100%"}} 
                                 src={v.url} alt={v.description} 
                                 onClick={() => this.setImage(i)}
                                 />
                        </div>)
                    })}
                </div>
                    {this.props.imgdata.map((v,i) => {
                        return (
                            <div key={i+'imghold'}
                                style={{display: this.state.num == i ? "block" : "none"}}>
                                <div className={styles.galleryImgWrapper}>
                                    <img className={styles.galleryHolderImg + ' ' + styles.fade} 
                                        src={v.url}
                                        key={i+'img'}
                                        />
                                </div>
                                <p key={i+'desc'}>
                                    {v.description}
                                </p>
                            </div>    
                        ); 
                    
                    })
                    }
        </div>
        )
    }

}

export default ImageGallery;