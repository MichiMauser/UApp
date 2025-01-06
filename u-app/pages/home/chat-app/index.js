import React from 'react'
import Sidebar from '../../../components/sidebar'
import Chat from '../../../components/chat'
import classes from '../../../styles/ChatApp.module.css'
import Layout from '../../../components/layout'

const ChatApp = () => {
  return (
    <div className={classes.home}>
      <div className={classes.container}>
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

ChatApp.getLayout = function getLayout(page){
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default ChatApp