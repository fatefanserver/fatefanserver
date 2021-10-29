import React from 'react';
import SpecialText from './servant/specialtext';

class TutorialButton extends React.Component {
    state = {isShow: false}
    toggleShow = () => {this.setState({isShow: this.state.isShow ? false : true})}
    getShow = () => this.state.isShow;
  render() {
    const isShow = this.getShow();
    return (<>
    <button onClick={() => this.toggleShow()}>{this.props.buttonname}</button>
    {isShow ? <div style={{background:"#aaaaaa",padding:"10px 10px 10px 10px"}}><SpecialText data={"\`code\` for `code`, \n\
\*italics\* for *italics*, \n \
\*\*bold\*\* for **bold**, \n \
`[colour]{#c blue}` for [colour]{#c blue}  \n\
(or `[colour]{#c #0000ff}`), \n\
`[big text]{#fg small text}` for [big text]{#fg small text}, \n\
`[text]{#tp tooltip}` for [text]{#tp tooltip}, \n\
`~strikethrough~` for ~strikethrough~, \n\
`-----` for a line \n\
\n\
----- \n\
\n\
\#Heading for \n\
# Heading \n \
`![](insert image url here)` for ![](https://cdn.discordapp.com/attachments/489543528393998346/903499310925226014/producerconfused.png)\n\
(But you should just use the image section type instead, as that also has an option to float to the right.) \
"}></SpecialText></div> : null}
    </>);
  }
}

export default TutorialButton;