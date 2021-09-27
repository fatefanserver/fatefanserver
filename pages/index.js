import firebase from '../firebase/clientApp.js'
const db = firebase.database();
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}


const Home = ({wikidata}) => {
  const rows = [];
  rows.push(<tr>
    <th>Name</th>
    <th>Class</th>
  </tr>)
  Object.keys(wikidata).forEach(name => {
    if(Array.isArray(wikidata[name])){
      if(!wikidata[name][0]['isRef']){
        rows.push(
          <tr>
            <td><a href={`/servants/${encodeURIComponent(wikidata[name][0]['name'])}`}>{wikidata[name][0]['truename']}</a></td>
            <td>{wikidata[name][0]['class']}</td>
          </tr>
        )
      }
    }
  })
  return(
    <>
    <div className={styles.container}>
      <Head>
        <title>Fate/Fanservant Server</title>
        <meta name="description" content="Fate/Fanservant Server" />
        <link rel="icon" href="/favicon.ico" />
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
const getWikidata = async () => {
  var newinfo = {};
  const data = await db.ref('wiki').get()
  newinfo = data.val();
      //console.log(newinfo);
  return newinfo;
    
}

export const getStaticProps = async() => {
  var wikidata = await getWikidata();
  wikidata =JSON.parse(JSON.stringify(wikidata));
  return {
    props: {wikidata},
      revalidate:1
      }
  
}

export default Home;
