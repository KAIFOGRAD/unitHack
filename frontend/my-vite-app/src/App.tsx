import { useState } from 'react'
import styles from './App.module.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className={styles.root}>
              <div className={styles.container}>
                <h1 className={styles.title}>Vite + React</h1>
                <div>
                  <button className={styles.button} onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                  </button>
                </div>
              </div>
      </div>
    </>
  )
}

export default App
