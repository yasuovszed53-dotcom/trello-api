/* eslint-disable no-console */
/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
  // eslint-disable-next-line no-console
    console.log(`3. Hello ${env.AUTHOR}, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  //Thực hiện các tác vụ cleanup trước khi dừng app lại
  exitHook(() =>{
    console.log('4. Server is shutting down....')
    CLOSE_DB()
    console.log('5. Disconnected to MongoDB Clould Atlast...')
  })
}

//IIFE
(async () => {
  try {
    console.log('1. Connecting to MongoDB Clould Atlast...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Cloud Atlast!')

//     Khởi động sever back-end sau khi connect database thành công
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()

// // Chỉ khi kết nối tới DB thành công thì mới Start Server Backend lên
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
