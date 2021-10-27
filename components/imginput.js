import { Component } from "react";

class ImgInput extends Component{
    state = {
        inputValue: this.props.value,
        showURL: false,
    }
    handleChange = e => {
        var newval = e.target.value;
        this.setState({ inputValue: newval, showURL: newval.length < 5 || this.props.meta.error ? false : true });
    };
    
    getURL = () => this.state.inputValue;
    getShow = () => this.state.showURL;
    render(){
        const inputURL = this.getURL();
        const show = this.getShow();
        return(<>
        <label key={"label"} htmlFor={this.props.id || this.props.name}>{this.props.label}</label>
        <input key={"input"} className="text-input" {...this.props.field} {...this.props.newprops}
            onInput={this.handleChange}
        />
        {this.props.meta.touched && this.props.meta.error ? (
            <span className="error" style={{color:"red"}}>{this.props.meta.error}</span>
        ) : null}
        <img src={show ? inputURL : null} alt={show ? "Invalid link." : null} width={"100px"}/>
        </>)
    }
}

export default ImgInput;