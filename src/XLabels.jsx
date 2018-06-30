import React from 'react';
import PropTypes from 'prop-types';
import FixedBox from './FixedBox'

function XLabels({labels, width}) {
  return (
    <div className="heat-x-label" style={{display: 'flex'}}>
      <FixedBox width={width} />
      {labels.map(x => (
        <div className="angle-label" key={x.line1} style={{flex: 1, textAlign: 'center'}}>
          {x.line1}
          {x.line2 && <div>{x.line2}</div> }
        </div>
      ))}
    </div>
  );
}

export default XLabels;
