import React from 'react';
import ReactDom from 'react-dom';

import Button from '../src/index';

function Demo() {
  
  return (
    <Button buttonWord={'abc'}></Button>
  );
}

ReactDom.render(<Demo />, document.getElementById('root'));
