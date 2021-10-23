import firebase from '../firebase/clientApp.js'
const db = firebase.firestore();
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home = ({wikidata}) => {
  const rows = [];
  rows.push(<tr>
    <th>Name</th>
    <th>Class</th>
  </tr>)
    wikidata.forEach((i) => {
      rows.push(
        <tr>
              <td><a href={`/servants/${encodeURIComponent(i.name)}`}>{i.truename}</a></td>
              <td>{i.class}</td>
            </tr>
      )
    })
  return(
    <>
    <div className={styles.container}>
      <Head>
        <title>Fate/Fanservant Server</title>
        <meta name="description" content="Fate/Fanservant Server" />
        <link rel="icon" href="/ffs.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Fate/Fanservant Server
        </h1>
        <style jsx>
        {`
        .main__container{
        height:100px;
        width:50%;
        margin:0 auto;
        }`
        }
        </style>
        <p className={styles.description}>
          News and wiki
        </p>
        <table>
        {rows}
        </table>
      </main>
    </div>

    </>
  )
}
const getWikiServantData = async () => {
  var newinfo = [];
  const data = await db.collection("wiki").where("isPublic","==",true).get()
  data.forEach((i) =>{
    newinfo.push(i.data());
  });
  return newinfo;   
}

export const getStaticProps = async() => {
  var wikidata = await getWikiServantData();
  wikidata =JSON.parse(JSON.stringify(wikidata));
  //console.log(wikidata);
  return {
    props: {wikidata},
      revalidate: 1
      }
  
}

export default Home;
