import styles from './servant.module.css'
import { Component } from 'react';


class Gallery extends Component{
    state = {
        num: 0,
    }
    toggleImageF = () => {
        this.setState(state => ({ num: this.state.num + 1 }));
        
      }
    toggleImageB = () => {
        this.setState(state => ({ num: this.state.num - 1 }));
    }
    showWarn = () => {

    }
    getImage = () => this.state.num;
    render(){
        const curImage = this.getImage();
        const trynum =  Object.keys(this.props.imgdata).length - 1;
        return(
        <div className={styles.gallery}>
    <button onClick={this.state.num > 0 ? this.toggleImageB : this.showWarn}>&lt;</button>
    <button onClick={this.state.num < trynum ? this.toggleImageF : this.showWarn}>&gt;</button>
    <img id="test"  src={this.props.imgdata[curImage].url} className={styles.galleryImg}/>
    <p >
        {this.props.imgdata[curImage].description}
    </p>
    </div>)
    }

}
//{Object.keys(imgdata).length}
export default Gallery;