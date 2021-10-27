import styles from '../styles/Home.module.css'
import Gallery from './servant/gallery'
import Transposable from './servant/element.js'
import SpecialText from './servant/specialtext.js';
import React from 'react'
import Link from 'next/link'
import { Component } from "react";

class CharacterPage extends Component{

    render(){
        var wikidata = this.props.wikidata;
        const servantAttributes = ['author','class','artist','writer','aka','height','weight','gender','region','stats','source','timeperiod','attribute','alignment'];
        const attributes = ['Author','Class','Artist','Writer','AKA','Height','Weight','Gender','Region','Stats','Source','Time Period','Attribute','Alignment'];
        var classIcon = <img/>
        if(wikidata.class){
            classIcon = <img style={{height:"50px",width:"50px",marginRight:"20px"}} src={"/class_"+wikidata.class.toLowerCase()+'.png'}/>;
        }

        
      
        const elements = [];
        if(wikidata.elements.length > 0){
          wikidata.elements[0][0].title.length > 0 ? wikidata.elements.map((i,j) => {
          elements.push(<h3 key={j} id={i[0].title}>{i[0].title}</h3>)
          elements.push(
          <div className={styles.wikiInfo} key={j+"t"}>
            <Transposable data={i} bgColour={wikidata.bgColour} sColour={wikidata.sColour}/>
          </div>)
        }) : null;
        }
        
        return(
            <>
            <div className={styles.wikiInfo} >
        <div className="row">
          <div className={styles.wikiInfoLeft}>
              <h1 className={styles.title}>
                <span >{classIcon}</span><span>{wikidata.truename}</span>
              </h1>
              <hr style={{borderColor:wikidata.bgColour}}/>
              <p>
                <SpecialText data={wikidata.basicDescription}/>
              </p>
              {servantAttributes.map((v,i) => {
                if(wikidata[v]){
                  if(v == 'aka'){
                    //use for traits later
                    if(wikidata[v].length > 0){
                        return(<p key={'aka'}>{'AKA: '+wikidata[v].join(', ')}</p>)
                    }
                  }
                  else if(v == 'stats'){
                    return(<table key={'stats'} style={{border:"1px solid #f1f1f1"}}>
                      <tbody>
                      <tr><td>Stats</td></tr>
                      <tr>
                        <td>STR: </td>
                        <td style={{paddingRight:"20px"}}>{wikidata.stats.STR}</td>
                        <td>AGI: </td>
                        <td style={{paddingRight:"20px"}}>{wikidata.stats.AGI}</td>
                      </tr>
                      <tr>
                        <td>END: </td>
                        <td style={{paddingRight:"20px"}}>{wikidata.stats.END}</td>
                        <td>LUK: </td>
                        <td style={{paddingRight:"20px"}}>{wikidata.stats.LUK}</td>
                      </tr>
                      <tr>
                        <td>MP: </td>
                        <td style={{paddingRight:"20px"}}>{wikidata.stats.MP}</td>
                        <td>NP: </td>
                        <td style={{paddingRight:"20px"}}>{wikidata.stats.NP}</td>
                      </tr>
                      </tbody>
                    </table>)
                  }
                  else{
                    return(<p key={'servattr'+i}>
                      <SpecialText data={attributes[i]+': '+wikidata[v]}/>
                    </p>);
                  }
                  
                }
              })}
            </div>
          <div className={styles.wikiInfoRight}>
          {wikidata.image ? <Gallery sColour={wikidata.sColour} imgdata={wikidata.image}/> : null}
            </div>
        </div>
      </div>
      {elements}
    </>  
    
        )
    }
}
export default CharacterPage;