import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Datepicker from './components/Datepicker'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {  
  return (
    <main className={styles.main}>
      <Datepicker />
    </main>
  )
}
