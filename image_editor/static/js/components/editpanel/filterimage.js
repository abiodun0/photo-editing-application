import React from 'react';

const FilterImage = props => {
  return (
      <div className={props.className} onClick={props.onClick}>
                  <img src={props.image} width="100" height="100"/>
                  <p className="lead">{props.filter}</p>
                  </div>
              );
};
export default FilterImage;
