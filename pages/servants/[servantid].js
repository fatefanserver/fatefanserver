import firebase from '../../firebase/clientApp.js'
const db = firebase.firestore();
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import Gallery from '../../components/servant/gallery'
import Transposable from '../../components/servant/element.js'
import SpecialText from '../../components/servant/specialtext.js';
import React from 'react'
import ReactMarkdown from 'react-markdown';

const Home = ({wikidata}) => {
  const elements = [];
  wikidata.hasElements.forEach((i) => {
    //console.log(wikidata.elements[i]);
    elements.push(<h3 key={i} id={wikidata.elements[i][0].title}>{wikidata.elements[i][0].title}</h3>)
    elements.push(
    <div className={styles.wikiInfo} key={i+"t"}>
      <Transposable data={wikidata.elements[i]}/>
    </div>)
  })
  return(
    <>
    <div className={styles.container} style={{
        backgroundColor: "#faf2f4",
      }}>
      <Head>
        <title>{wikidata.truename}</title>
        <meta name="description" content="Fate/Fanservant Server" />
        <link rel="icon" href="/ffs.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css"/>
      </Head>

      <div className={styles.wikiInfo} >
        <div className="row">
          <div className={styles.wikiInfoLeft}>
              <h1 className={styles.title}>
              {wikidata.truename}
              </h1>
              <h2 >
              {wikidata.class}
              </h2>
              <p>
                {wikidata.basicDescription}
              </p>
              <p>{wikidata.author}</p>
            </div>
          <div className={styles.wikiInfoRight}>
          <Gallery imgdata={wikidata.image}/>
            </div>
        </div>
      </div>
      {elements}
      
    </div>

    </>
  )
}

const getWikiServantData = async (name) => {
    var newinfo = {};
    var docRef = db.collection(`wiki`).doc(name.servantid);
    const data = await docRef.get();
    newinfo = data.data();
    const realtimedb = firebase.database();
    const rtdata = await realtimedb.ref(`wiki/${name.servantid}/elements`).get();
    newinfo.elements = rtdata.val();
    return newinfo;   
  }

export const getStaticPaths = async() => {
    var paths = []
    const wikidata = await db.collection("wiki").where("isPublic","==",true).get();
    wikidata.forEach((doc) =>{
      paths.push({params:{servantid:doc.data().name}})
    })
    //console.log(paths);
    return {
      paths,
      fallback: false
    }
  }

export const getStaticProps = async({params}) => {
  var wikidata = await getWikiServantData(params);
  wikidata =JSON.parse(JSON.stringify(wikidata));
  return {
    props: {wikidata},
      revalidate: 1
      }
  
}

export default Home;
