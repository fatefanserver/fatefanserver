import firebase from '../../firebase/clientApp.js'
const db = firebase.database();
import Head from 'next/head'
import styles from '../../styles/Home.module.css'


const Home = ({wikidata}) => {

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
        {wikidata['truename']}
        </h1>
        <h2 >
        {wikidata['class']}
        </h2>
        <img src={wikidata['icon']} width="200" height="200"></img>
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
          {wikidata['description']}
        </p>
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

const getWikiServantData = async (name) => {
    var newinfo = {};
    const data = await db.ref(`wiki/${name.servantid}/0`).get()
    newinfo = data.val();
    return newinfo;
      
  }

export const getStaticPaths = async() => {
    var wikidata = await getWikidata();
    //TODO: change to use servant list instead to speed up
    var paths = []
    Object.keys(wikidata).forEach(name => {
        if(Array.isArray(wikidata[name])){
          if(!wikidata[name][0]['isRef']){
            paths.push({params:{servantid:wikidata[name][0]['name']}})
          }
        } 
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
      revalidate: 5
      }
  
}

export default Home;
