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
        if(!this.props.imgdata[curImage]){
            return(<div/>)
        }
        return(
            <div className={styles.gallery}>
                <button style={{backgroundColor: this.props.sColour}} onClick={this.state.num > 0 ? this.toggleImageB : this.showWarn} disabled={this.state.num == 0 ? true : false}>&lt;</button>
                <button style={{backgroundColor: this.props.sColour}} onClick={this.state.num < trynum ? this.toggleImageF : this.showWarn} disabled={this.state.num == trynum ? true : false}>&gt;</button>
                <div className={styles.galleryHolder}>
                    <img src={curExp == '' ? this.props.imgdata[curImage].url : curExp} className={styles.galleryBase}/>
                </div>
                    <p >
                        {this.props.imgdata[curImage].description}
                    </p>
            <div className={styles.moodButton}>
                {this.props.imgdata[curImage].expression ? <button style={{backgroundColor: this.props.sColour}} onClick={() => this.changeExp('')}>base</button> : <div/>}
                {this.props.imgdata[curImage].expression ? this.props.imgdata[curImage].expression.map((i,j) => <button style={{backgroundColor: this.props.sColour}} key={j+'expg'} onClick={() => this.changeExp(i.url)}>{i.expressionName}</button>) : <div/>}
            </div>
        </div>
        )
    }

}
//{Object.keys(imgdata).length}
export default Gallery;