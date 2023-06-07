// tsrfc

import React, { useEffect, useRef, useState } from 'react'
import { OpenAIService } from '../service/config'
import moment from 'moment'
import { TEXT_ERR, TEXT_FIRST } from '../constants/dataConst'
import { NavLink, useParams } from 'react-router-dom'

import { FiMaximize2 } from 'react-icons/fi';


type Props = {}

export default function Boxchat({ }: Props) {

     // check version
     // true = phone
     const [ver, setVer] = useState(true)

     const [disInput, setDisInput] = useState(false)

     let regex = /(.{5,}?)\1+$/
     const [count, setCount] = useState(0)
     let valueFinal = ''
     let valueTrainer = ''
     const [final, setFinal] = useState(String)
     const myRef = useRef<null | HTMLDivElement>(null)
     const [click, setClick] = useState(true)
     const [prompt, setPrompt] = useState('')
     const [logChat, setLogChat] = useState([
          { type: 'AI', mess: TEXT_FIRST },
     ])

     let [err, setErr] = useState(0)
     const [logChatOld, setLogChatOld] = useState([
          { type: 'AI', mess: TEXT_FIRST },
     ])

     // value submit
     const [valueSubmit, setValueSubmit] = useState('')


     const [typing, setTyping] = useState(false)
     const [QAinit, setQAinit] = useState(String)

     let img1 = require('../asset/images/chatbot.png')

     const hiddenBox = async () => {
          await setClick(!click)
          setVer(!ver)
     }
     const executeScroll = () => {
          if (myRef) {
               myRef.current?.scroll({ top: myRef.current?.scrollHeight, behavior: 'smooth' })
          }
     }

     const xuly = async () => {
          // model old
          // let value = valueFinal + final
          let value = final + valueFinal

          if (count <= 1) {
               callApi(value)
          } else {
               await console.log('local data', localStorage.getItem('data'))
               await callApi(`${prompt}-->`)
               // callApi(value)
          }


     }
     const callApi = OpenAIService.callApi()
    

     useEffect(() => {
          executeScroll()
          localStorage.setItem('data', final)
     }, [final, logChat])


     return (
          <div>
               <div className='parent'>

                    <div className="chat-Box" style={{ width: !click ? '225px' : '300px' }}>
                         {/* --header-- */}
                         <div className='header'>
                              <div className="header_chat-Box">
                                   <div className="header_chat-Box-left" style={{ justifyContent: click ? 'unset' : 'center' }} onClick={hiddenBox}>
                                        <img alt='img1' className="content_chat-BoxImg" src={img1} />
                                        <div className="header_chat-BoxText">
                                             <p className='header_nameBot'>Mekomed Chatbot</p>
                                             <p className='header_statusBot'><i className="fa fa-dot-circle"></i> Online now</p>
                                        </div>
                                        {/* <iframe src="https://embed.lottiefiles.com/animation/12966"></iframe> */}

                                   </div>

                                   <NavLink to='/' className="header_chat-Box-right footer_chat-Box-hover" onClick={hiddenBox}>
                                        {click ? <i className="fas fa-minus" /> : <i className="fas fa-plus" />}
                                   </NavLink>

                                   <a href='http://localhost:3000/' target='_blank' style={{ display: click ? 'block' : 'none' }} className="header_chat-Box-right footer_chat-Box-hover" onClick={hiddenBox}>
                                        {/* <i className="fa fa-expand-arrows-alt"></i> */}
                                        <FiMaximize2/>
                                   </a>
                              </div>
                         </div>
                         {/* --content-- */}
                         <div style={{ display: click ? 'block' : 'none' }} ref={myRef} className="content_chat-Box">

                              <p className='dateTime'>{moment(Date.now()).format('hh:mm A')}</p>
                              {logChat?.map((value, index) => {
                                   if (value.type === 'Human') {
                                        return (<div key={index} className="content_chat-BoxItem-right">
                                             <div className="content_chat-BoxMini">
                                                  <div className="content_chat-BoxText-right">{value.mess}</div>
                                             </div>
                                        </div>)
                                   }
                                   if (value.type === 'AI') {
                                        return (<div key={index} className="content_chat-BoxItem-left">

                                             <img alt='img1' className="content_chat-BoxImg" src={img1} />
                                             <div className="content_chat-BoxMini d-flex">
                                                  <p className='bot_name'>MekomedBot</p>
                                                  <div className="content_chat-BoxText-left">{value.mess}</div>
                                             </div>
                                        </div>)
                                   }
                              })}

                         </div>
                         {/* --footer-- */}
                         <div className='ft' style={{ display: click ? 'block' : 'none' }}>
                              {typing ? <img src='https://raw.githubusercontent.com/reachtokish/typing-animation/master/giphy.gif' alt='typing gif' className='typing_load' /> : null}
                              <div className='ft_bot'>
                                   <div className="footer_chat-Box">

                                        <form onSubmit={async function (e) {
                                             await e.preventDefault()
                                             // alert('submit')
                                             await setDisInput(!disInput)
                                             await setTyping(true)

                                             let arr = await logChat

                                             let checkSpam = await prompt.includes(' ')
                                             if (checkSpam) {
                                                  // await setCount(count + 1)
                                                  await arr.push({ type: 'Human', mess: prompt })

                                                  await setLogChat(arr)
                                                  let promptValue = `${prompt} -->`
                                                  await localStorage.setItem('valuebackup', promptValue)

                                                  await setQAinit(promptValue)
                                                  valueFinal = valueFinal + promptValue
                                                  await setFinal(valueFinal + final)



                                                  await xuly()
                                                  await setPrompt('')

                                             } else {
                                                  alert(TEXT_ERR)
                                                  await setTyping(false)
                                                  await setPrompt('')
                                                  setDisInput(false)
                                             }


                                        }} className="footer_chat-Box-input">
                                             <input disabled={disInput} id='inputChat' value={prompt} type="text" placeholder="Type a Message..." className="footer-text" onChange={(e) => {
                                                  setPrompt(e.target.value)
                                             }} />
                                        </form>
                                        <div className="footer_chat-Box-hover" onClick={async function () {
                                             await setDisInput(!disInput)
                                             await setTyping(true)

                                             let arr = await logChat

                                             let checkSpam = await prompt.includes(' ')
                                             if (checkSpam) {
                                                  // await setCount(count + 1)
                                                  await arr.push({ type: 'Human', mess: prompt })

                                                  await setLogChat(arr)
                                                  let promptValue = `${prompt} -->`
                                                  await localStorage.setItem('valuebackup', promptValue)

                                                  await setQAinit(promptValue)
                                                  valueFinal = valueFinal + promptValue
                                                  await setFinal(valueFinal + final)



                                                  await xuly()
                                                  await setPrompt('')

                                             } else {
                                                  alert(TEXT_ERR)
                                                  await setTyping(false)
                                                  await setPrompt('')
                                                  setDisInput(false)
                                             }

                                        }}>
                                             <svg className="fill" fill='#008000' viewBox="0 0 24 24" width="20px"><path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" /></svg>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     )
}