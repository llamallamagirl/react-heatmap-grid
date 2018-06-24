import React from 'react';
import PropTypes from 'prop-types';
import FixedBox from './FixedBox'

function XLabels({labels, width}) {
  return (
    <div className="heat-x-label" style={{display: 'flex'}}>
      <FixedBox width={width} />
      {labels.map(x => (
        <div className="angel-label" key={x} style={{flex: 1, textAlign: 'center'}}>
          {x}
        </div>
      ))}
    </div>
  );
}

export default XLabels;
