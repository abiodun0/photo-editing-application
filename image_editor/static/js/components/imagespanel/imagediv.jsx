import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import {changeActiveImage} from '../../actions';
import {connect} from 'react-redux'


const ImageDiv =  (props) => {
  let activeKey = props.activeImage ? props.activeImage.id: 0
  let activeUpload = classNames({
        uploaded: true,
        active: Number(props.image.id) === Number(activeKey)
    });
  return (
    <div className={activeUpload} onClick={props.changeActiveKey.bind(null, props.image)}>
      <div className="media">
        <div className="media-left" href="#" style={{backgroundImage: 'url(/media/' +
            props.image.picture + ')', width: 50 + '%',
            backgroundSize: 'cover', backgroundPosition: 50 + '% ' + 50 + '%',
            height: 180 + 'px'
          }}>
      </div>
        <div className="media-body">
          <p className="media-heading">{props.image.title}
            <br/>
            <small> Modified {moment(props.image.date_modified).fromNow()}</small>
          </p>
        </div>
      </div>
    </div>
    );

}
const mapStateToProps = (state) => {
  return {
    activeImage : state.activeImage
  }
}
const changeActiveKey = (image) => (dispatch) => {
   return dispatch(changeActiveImage(image))
}
export default connect(mapStateToProps, {changeActiveKey})(ImageDiv);


