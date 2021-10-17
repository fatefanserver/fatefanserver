import styles from './servant.module.css'
import { Component } from 'react';


class Gallery extends Component{
    //num is for the current costume
    //curExp is for the current expression
    state = {
        num: 0,
        curExp: ''
    }
    toggleImageF = () => {
        this.setState(state => ({ num: this.state.num + 1, curExp: '' }));
        
      }
    toggleImageB = () => {
        this.setState(state => ({ num: this.state.num - 1, curExp: ''}));
    }
    changeExp = (exp) => {
        this.setState(state => ({ curExp: exp}))
    }
    showWarn = () => {}
    getImage = () => this.state.num;
    getExp = () => this.state.curExp;
    render(){
        const curImage = this.getImage();
        const curExp = this.getExp();
        const trynum =  Object.keys(this.props.imgdata).length - 1;
        return(
        <div className={styles.gallery}>
    <button onClick={this.state.num > 0 ? this.toggleImageB : this.showWarn} disabled={this.state.num == 0 ? true : false}>&lt;</button>
    <button onClick={this.state.num < trynum ? this.toggleImageF : this.showWarn} disabled={this.state.num == trynum ? true : false}>&gt;</button>
    <div className={styles.galleryHolder}>
        <img src={this.props.imgdata[curImage].url} className={styles.galleryBase}/>
        <img src={curExp} className={styles.galleryOverlay}/>
        <p >
            {this.props.imgdata[curImage].description}
        </p>
    </div>
    <div className={styles.moodButton}>
        {this.props.imgdata[curImage].expressions ? <button onClick={() => this.changeExp('')}>basic</button> : <div/>}
        {this.props.imgdata[curImage].expressions ? Object.keys(this.props.imgdata[curImage].expressions).map((i) => <button key={i} onClick={() => this.changeExp(this.props.imgdata[curImage].expressions[i])}>{i}</button>) : this.showWarn}
    </div>
    </div>)
    }

}
//{Object.keys(imgdata).length}
export default Gallery;