import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { TEXT_ERR, TEXT_FIRST } from '../constants/dataConst'
import { OpenAIService, socket } from '../service/config'
import Typewriter from 'typewriter-effect';

function timeout(delay: number) {
     return new Promise( res => setTimeout(res, delay) );
 }

export default function BoxchatWebApp() {
     const [disInput, setDisInput] = useState(false)

     const [count, setCount] = useState(0)
     let valueFinal = ''

     const [sId, setsId] = useState(String)
     const [final, setFinal] = useState(String)
     const myRef = useRef<null | HTMLDivElement>(null)
     const [click, setClick] = useState(true)
     const [prompt, setPrompt] = useState('')
     const [streamToken, setstreamToken] = useState(String)
     let [mess, setMess] = useState('')
     let [data1, setData] = useState('')
     const [aiCount, setAICount] = useState(2)

     let [statusLogchat, setStatus] = useState(0)
     // const [streamToken, setstreamToken] = useState(String)
     const [logChat, setLogChat] = useState([
          { type: 'AI', mess: TEXT_FIRST }
     ])

     // set day
     const [day, setDay] = useState('')

     const [typing, setTyping] = useState(false)

     let img1 = require('../asset/images/chatbot.png')
     let avatar = require('../asset/images/player.png')
     let logoMKM = require('../asset/images/mekomedLogo.png')
     let location = require('../asset/images/location.png')
     let phone = require('../asset/images/phone.png')
     let mail = require('../asset/images/mail.png')
     let Fb = require('../asset/images/Fb.png')
     let Zl = require('../asset/images/Zl.png')
     let Website = require('../asset/images/Website.png')

     
     const executeScroll = () => {
          if (myRef) {
               myRef.current?.scroll({ top: myRef.current?.scrollHeight, behavior: 'smooth' })
          }
     }

     const xuly = async () => {

          let value = final + valueFinal

          if (count <= 1) {
               callApi(value)
          } else {
               await console.log('local data', localStorage.getItem('data'))
               await callApi(`${prompt}`)
          }



     }
     const callApi = OpenAIService.callApi()

     const handleDay = () => {

          switch (moment(Date.now()).format('dddd')) {
               case 'Sunday':
                    setDay('Chủ nhật')
                    break;
               case 'Monday':
                    setDay('Thứ 2')
                    break;
               case 'Tuesday':
                    setDay('Thứ 3')
                    break;
               case 'Wednesday':
                    setDay('Thứ 4')
                    break;
               case 'Thursday':
                    setDay('Thứ 5')
                    break;
               case 'Friday':
                    setDay('Thứ 6')
                    break;
               case 'Saturday':
                    setDay('Thứ 7')
                    break;

          }


     }

     const submitData = async (e: any) => {
          await e.preventDefault()
          // alert('submit')
          await setDisInput(!disInput)
          await setTyping(true)

          let arr = await logChat

          let checkSpam = await prompt.includes(' ')
          if (checkSpam) {
               // cũ
               await setCount(count + 1)
               await arr.push({ type: 'Human', mess: prompt })

               await setLogChat(arr)
               let promptValue = `${prompt}`
               await console.log('prom', promptValue)

               // await setQAinit(promptValue)
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
     }

     useEffect(() => {
          socket.on("connect", () => {
               setsId(socket.id);
          });
     }, [sId]);

     const [letter, setLetter] = useState('');
     useEffect(() => {
          socket.on(`chat/${sId}`, async (data) => {
               switch (data.type) {
                    case "start":
                         setStatus(1);
                         break
                    case "stream":
                         setLetter(data.message);
                         if (statusLogchat !== 2) {
                              setStatus(2);
                         }
                         break
                    case "end":
                         setStatus(0);
                         setDisInput(false)
                         break;
               }
          });
     }, [sId])

     useEffect(() => {
          switch (statusLogchat) {
               case 0:
                    break;
               case 1:
                    setLogChat(previousChat => [...previousChat, {type: 'AI', mess: ""}]);
                    setTyping(false)
                    break;
               case 2:
                    logChat[logChat.length - 1].mess += letter;
                    setLogChat(logChat);
                    executeScroll();
                    break;
          }
     }, [statusLogchat, letter]);

     useEffect(() => {
          console.log(logChat);
     }, [logChat]);

     useEffect(() => {
          /* socket.on(`chat/${sId}`, async (data) => {
               console.log(data);
               setLogChat([...logChat, { type: 'AI', mess: data.message }])
               
               // const obj = JSON.parse(data);
               switch (data.type) {
                    case "start":
                         
                         // console.log(logChat);
                         
                         
                         break
                    case "stream":
                         // console.log('data' ,data.message);
                        const final = async ()=>{
                          
                         //  await setstreamToken(data.message)
                          // console.log('dât',streamToken);
                          await setData(data.message)
 
                          await setMess(mess += data1)

                         //  await console.log('data1', data1);

                          
                         //  count > 1 ==>
                         /// logchat ['ai', 'human', 'ai', 'human', 'ai']
                         let temp = ''
                         //  logChat[aiCount] = await {
                         //      type: 'AI',
                         //      mess: mess,
                         // }
                         // // await console.log(logChat[aiCount]);
                         
                         // await setLogChat(logChat)
                         // await setLogChat([...logChat, { type: 'AI', mess: mess }])
                         // await statusLogchat >= 1 ? setLogChat([...logChat, { type: 'AI1', mess: mess }]) : temp= 'asd';
                         
                        }

                    //     final()
                         
                         break
                    case "end":
                         // setStatus(statusLogchat+=1)
                         // console.log('end');
                         // setAICount(aiCount + 2);
                         // count + 1
                         setTyping(false)
                         setDisInput(false)
                         break;
               }
               
               
          }); */

          executeScroll()
          handleDay()
     }, [sId, logChat]);

     return (
          <div>
               <div className='parent webVer'>

                    <div className='row row_cus'>
                         <div className="col-9 col7_Cus">
                              <div className="chat-Box--Web" style={{ width: !click ? '225px' : '300px' }}>
                                   {/* --header-- */}
                                   <div className='header'>
                                        <div className="header_chat-Box">
                                             <div className="header_chat-Box-left" style={{ justifyContent: click ? 'unset' : 'center' }} >
                                                  <img alt='img1' className="content_chat-BoxImg" src={img1} />
                                                  <div className="header_chat-BoxText">
                                                       <p className='header_nameBot'>Mekomed Chatbot</p>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                                   {/* --content-- */}
                                   <div style={{ display: click ? 'block' : 'none' }} ref={myRef} className="content_chat-Box">
                                        <p className='dateTime'>{day}{moment(Date.now()).format(`, hh:mm A`)}</p>
                                        {logChat?.map((value, index) => {
                                             /* if (value.mess === "") {
                                                  return 
                                             } */
                                             if (value.type === 'Human') {
                                                  return (<div key={index} className="content_chat-BoxItem-right">

                                                       <div className="content_chat-BoxMini d-flex">
                                                            <div className="info d-flex">
                                                                 <p className='bot_name pe-3'>Tôi</p>
                                                                 <div className='border_img'>
                                                                      <img alt='img1' className="content_chat-BoxImg" src={avatar} />
                                                                 </div>

                                                            </div>

                                                            <div className="content_chat-BoxText-right">{value.mess}</div>
                                                       </div>
                                                  </div>)
                                             }
                                             if (value.type === 'AI') {
                                                  return (<div key={index} className="content_chat-BoxItem-left">

                                                       <div className="content_chat-BoxMini d-flex">
                                                            <div className="info d-flex">
                                                                 <div className='border_img'>
                                                                      <img alt='img1' className="content_chat-BoxImg" src={img1} />
                                                                 </div>
                                                                 <p className='bot_name ps-3'>Mekomed Chatbot</p>
                                                            </div>

                                                            <div className="content_chat-BoxText-left">
                                                                 {value.mess}
                                                                 {
                                                                      (index === logChat.length - 1 && statusLogchat !== 0) && <span className="blinking-cursor">|</span>
                                                                 }
                                                            </div>
                                                       </div>
                                                  </div>)
                                             }
                                        })}

                                        {typing ? <div className='typing_load'><div className='border_img'><img alt='img1' className="chatbox" src={img1} /></div><img src='https://raw.githubusercontent.com/reachtokish/typing-animation/master/giphy.gif' alt='typing gif' className='typing_chat' /></div> : null}
                                   </div>
                                   {/* --footer-- */}
                                   <div className='ft' style={{ display: click ? 'block' : 'none' }}>
                                        <div className='ft_bot'>
                                             <div className="footer_chat-Box">
                                                  <form onSubmit={async function (e) {
                                                       // await e.preventDefault()
                                                       // // alert('submit')
                                                       // await setDisInput(!disInput)
                                                       // await setTyping(true)

                                                       // let arr = await logChat

                                                       // let checkSpam = await prompt.includes(' ')
                                                       // if (checkSpam) {
                                                       //      // cũ
                                                       //      await setCount(count + 1)
                                                       //      await arr.push({ type: 'Human', mess: prompt })

                                                       //      await setLogChat(arr)
                                                       //      let promptValue = `${prompt}`
                                                       //      await console.log('prom', promptValue)

                                                       //      // await setQAinit(promptValue)
                                                       //      valueFinal = valueFinal + promptValue
                                                       //      await setFinal(valueFinal + final)
                                                       //      await xuly()
                                                       //      await setPrompt('')

                                                       // } else {
                                                       //      alert(TEXT_ERR)
                                                       //      await setTyping(false)
                                                       //      await setPrompt('')
                                                       //      setDisInput(false)
                                                       // }

                                                       submitData(e)


                                                  }} className="footer_chat-Box-input">
                                                       <input disabled={disInput} id='inputChat' value={prompt} type="text" placeholder="Nhập tin nhắn..." className="footer-text" onChange={(e) => {
                                                            setPrompt(e.target.value)
                                                       }} />
                                                  </form>
                                                  <div className="footer_chat-Box-hover" onClick={(e)=>{
                                                       submitData(e)
                                                  }}>
                                                       <svg className="fill" fill='#44A080' viewBox="0 0 24 24" width="20px"><path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z" /></svg>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="col-3 col3_Cus">

                              <div className='right_content'>
                                   <div className="row flex-column">
                                        <div className="col-6 col-up">
                                             <div className="content">
                                                  <img className='logoMKM' src={logoMKM} alt="" />
                                                  <div className='text'>
                                                       <p className='name'>Nhà Thuốc Mekomed - Cửu Long</p>
                                                       <div className='top-bot'>
                                                            <p className='address'><img className='icon' src={location} alt="" /> 75 Phạm Thái Bường, Phường 4, Tp. Vĩnh Long</p>
                                                            <p className='phone'><img className='icon' src={phone} alt="" />  0270-3838-911</p>
                                                            <p><img className='icon' src={mail} alt="" /> info@mekomed.vn</p>

                                                       </div>

                                                  </div>

                                                  {/* social */}
                                                  <div className='social'>
                                                       <img alt='face' src={Website} />
                                                       <img alt='face' src={Fb} />
                                                       <img alt='zalo' src={Zl} />

                                                  </div>


                                             </div>
                                             <div className='infoZ09'>
                                                  <img width={70} src="http://zfood.zeroninehis.vn/ZeroNine_Logo.4fe8cb6ef7496b9259c0.svg" alt="" /> <span>Copyright 2023 ZeroNine &copy; JSC</span>
                                             </div>


                                        </div>

                                   </div>
                              </div>

                         </div>
                    </div>


               </div>
          </div>
     )
}