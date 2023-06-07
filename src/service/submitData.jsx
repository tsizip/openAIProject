// import { TEXT_ERR } from "../constants/dataConst"


// export const submitData = {
//      submit: (setTyping, setCount,count,logChat,setLogChat,setQAinit, valueFinal,setFinal,final,setPrompt,xuly) => {
//           return async () => {
//                await setTyping(true)
//                await setCount(count + 1)
//                let arr = await logChat

//                let checkSpam = await prompt.includes(' ')
//                if (checkSpam) {
//                     await arr.push({ type: 'Human', mess: prompt })

//                     await setLogChat(arr)
//                     let promptValue = `${prompt}\\n`
//                     console.log('submit', promptValue)
//                     await setQAinit(promptValue)
//                     valueFinal = valueFinal + promptValue
//                     await setFinal(valueFinal + final)
//                     await xuly()
//                     await setPrompt('')
//                } else {
//                     alert(TEXT_ERR)
//                     await setTyping(false)
//                     await setPrompt('')
//                }
//           }
//      }
// }
