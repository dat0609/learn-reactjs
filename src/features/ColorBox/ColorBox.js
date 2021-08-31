import React, { useState } from 'react';

ColorBox.propTypes = {
   
};

function ColorBox(props) {

   const [color,setColor] = useState('white');

   return (
      <div>
         {color} 

         <button onClick={() => setColor('black')}>Black</button>
         <button onClick={() => setColor('green')}>Green</button>
      </div>
   );
}

export default ColorBox;