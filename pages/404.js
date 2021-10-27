import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
export default function Custom404() {
    return (
        <>
        <Head>
        <meta name="description" content="Fate/Fanservant Server" />
        <link rel="icon" href="/ffs.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.6.0/font/bootstrap-icons.css"/>
      </Head>
        <div style={{textAlign:"center", margin:"100px"}}>
    <h1>404</h1>
    <h1>Page Not Found</h1>
    <Image src={'/404.png'} width={256} height={256}/>
    
    <p>Consider bothering Grape or Lib (but mostly grape).</p>
    <Link  href="/">
        <a>Home</a>
    </Link>
    </div>
    </>
    )
  }