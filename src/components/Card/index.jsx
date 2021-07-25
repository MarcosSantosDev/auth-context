import React, { memo } from 'react';

import './styles.css';

const Card = ({ id, title, description }) => (
  <div className="card" key={id}>
    <h3 className="card-title">{title}</h3>
    <p className="card-description">{description}</p>
  </div>
);

export default memo(Card);
