"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { useState } from 'react'

export default function Home() {
  const [file, setfile] = useState();

  const handleFileChange = (e) => {
    setfile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
          if (!file) return
          //creating a file data
          const data = new FormData()
          data.set("file", file)

          //sending the data to the "backend"
          const res = await fetch('/api/upload', {
            method: 'POST',
            body: data
          })
          const item = await res.json()
          console.log(item)
  }

  return (
    <main className={styles.main}>
      <div className={styles.descripton}>
        <h3>Simple next.js upload file</h3>
      </div>
      <div className={styles.center} style={{backgroundColor:"#403d743c", padding: "10px", borderRadius:"10px"}}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <label>
            <h1 className='text-zinc-100 text-center'>Sube una imagen</h1>
          </label>

          <input className='bg-zinc-900 text-zinc-100 p-2 rounded block m-5' type='file' name='file' onChange={handleFileChange}/>

          {
            file && (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="upload file" src={URL.createObjectURL(file)}
              className='w-64 h-64 object-cover mx-auto mb-5'
              />
            )
          }

          <button className='bg-blue-900 text-zinc-100 p-2 rounded bloc w-full disabled:opacity-50' disabled={!file}>upload</button>
        </form>

        

      </div>
      <div className={styles.grid}>
        <p>Made by Francisco Ferreira</p>
      </div>
    </main>
  )
}
