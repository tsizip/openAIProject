
// import Chatbox from './component/Chatbox';
import { Route, Routes } from "react-router-dom";
import Boxchat from './component/Boxchat';
import BoxchatWebApp from './component/BoxchatWebApp';

function App() {

  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }
  
  return (
    <>
    {/* <button onClick={()=> setIsON(isOn => !isOn) }>is active {`${isOn}`}</button> */}
    <Routes>
      <Route path='/' element={inIframe() ? <Boxchat /> : <BoxchatWebApp />} />

      <Route path='/iframe' element={<Boxchat />} />
    </Routes>
        </>
  );
}

export default App;
