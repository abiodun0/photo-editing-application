/* eslint no-alert: 0*/
import React from 'react';
import TopButtons from './topbuttons.jsx';


const ImageDiv = (props) => {
  let picture = props.activeImage.filtered ?
                props.activeImage.filter_path : props.activeImage.picture;
      return (
            <div>
              <TopButtons activeImage={props.activeImage}/>
                <div className="edit text-center">
                  <img src={props.activeImage.picture?
                  `/media/${picture}` : '/static/img/no_image_selected.gif'} />
                </div>
            </div>
        );
    }

export default ImageDiv;


