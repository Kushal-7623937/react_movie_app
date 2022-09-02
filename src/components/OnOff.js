import React from 'react';
import { Offline, Online } from "react-detect-offline";

function App(){

return(
<div>
    <Online>You are online</Online>
    <Offline>please check your network connection</Offline>
  </div>


  );
}
export default App;