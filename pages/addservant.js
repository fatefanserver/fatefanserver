import firebase from '../firebase/clientApp.js'
const db = firebase.firestore();
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { Formik, Form, useField } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import ImgInput from '../components/imginput.js';
import FormSubmit from '../components/formsubmit.js';
import TutorialButton from '../components/tutorialbutton.js';
import ColourPicker from '../components/colorpicker.js';

const Home = ({wikidata}) => {

  return(
    <>
    <div className={styles.container}>
      <Head>
        <title>Add Servant</title>
        <meta name="description" content="Fate/Fanservant Server" />
        <link rel="icon" href="/ffs.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css"/>
      </Head>

      <main >
      <div>
        <br/>
        <h1 className={styles.title} style={{marginBottom:"5px"}}>
          Add Servant
        </h1>
        <p>As we are currently testing, only basic class icons are available. Visual effects are basic for testing purposes.</p>
        <TutorialButton buttonname={"Show markdown tips"}></TutorialButton>
        <ColourPicker/>
        <hr/>
        </div><div>
        <FormSubmit wikidata={wikidata}/>
        <hr style={{marginBottom:"50px"}}/>
        <Link  href="/">
        <a style={{fontSize:"50px"}}>FFS Home</a>
      </Link>
        
    </div>
      </main>
    </div>
    
    </>
  )
}
const getWikiServantData = async () => {
  var newinfo = [];
  const data = await db.collection("wiki").where("isPublic","==",true).get()
  data.forEach((i) =>{
    newinfo.push(i.data().name);
  });
  return newinfo;   
}

export const getStaticProps = async() => {
  var wikidata = await getWikiServantData();
  wikidata =JSON.parse(JSON.stringify(wikidata));
  return {
    props: {wikidata},
      revalidate: 1
      }
  
}

export default Home;
