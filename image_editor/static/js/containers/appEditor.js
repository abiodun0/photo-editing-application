import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {isLoading} from '../reducers/reducers'
import ImageApi from '../api/imageApi';
import ImagesPanel from '../components/imagespanel/index.jsx';
import EditableDiv from '../components/editpanel';

const AppEditor  = (props) => {
      let loadingDiv = null;
      if (props.isLoading) {
        loadingDiv = (<img src="https://raw.githubusercontent.com/BenBBear/ionic-cache-src/master/img/loader.gif"
            width="50" height="50"
            style={{transform: 'translate(' - 50 + '%, ' + 50 + '%)',
            position: 'absolute', top: -15 + 'px', left: 50 + '%'}}/>);
      }
      return (
             <div className="row">
             <div className="col-sm-3">
             <ImagesPanel/>
             </div>
            <div className="col-sm-9">
                <div className="edit-div">
                    {loadingDiv}
                    <EditableDiv/>
                </div>
            </div>
            </div>
      );
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  }
}
export default connect(mapStateToProps)(AppEditor)


