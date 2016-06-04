import React from 'react'
import classNames from 'classnames';
import {connect} from 'react-redux';
import _ from 'lodash';
import {deleteImagefromApi, changeImageName, updateTitleFromImageArray} from '../../actions'


class TopButtons extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editMode: false,
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    }

    toggleEdit(){
      this.setState({editMode: !this.state.editMode});
    }
    onChange(e){
      let tempImage = _.clone(this.props.activeImage)
      tempImage.title = e.target.value;
      this.props.changeImageTitle(tempImage)
    }
    render() {
      let buttonClass = classNames({
        btn: true,
        disabled: !this.props.activeImage.picture
      });
      let formCalss = classNames({
        'form-inline': true,
        'hide': !this.state.editMode
      })
      console.log(this.props.activeImage.title);
      return (
        <div className="edit-buttons">
            <button className={buttonClass} onClick={this.toggleEdit}>
                <span className="mdi mdi-pencil"></span></button>
            <button className={buttonClass} onClick={this.props.deleteImagefromApi.bind(null, this.props.activeImage)}>
                <span className="mdi mdi-delete"></span></button>
            <button className={buttonClass}>
                <span className="mdi mdi-backup-restore">
                </span></button>

            <div className="card text-xs-center">
                <blockquote className="card-blockquote card-text">
                    <form
                    className={formCalss}
                    action="#">
                      <div className="form-group">
                        <div className="input-group">
                          <input type="text"
                          className="form-control"
                          value={this.props.activeImage.title}
                          onChange={this.onChange}
                          />
                          </div>
                        </div>
                      <button type="submit"
                      className="btn btn-default">
                      Save</button>
                    </form>
                  <h6 className='text-uppercase'>
                  {(this.props.activeImage.title || 'No Image Selected')}
                    </h6>
                  <h6 className="text-uppercase">
                  {
                    (this.props.activeImage.currentFilter ||
                     'No Filter Applied')}
                    </h6>
                </blockquote>

            </div>
            <button className={`${buttonClass} pull-sm-right`}>
                <span className="mdi mdi-share-variant">
                </span>
              </button>
            <button className={`${buttonClass} pull-sm-right`}>
            <a href="#"
                download="#">
            <span className="mdi mdi-download">
            </span></a>
            </button>
          </div>
        );
    }
}
const changeImageTitle = (image) => (dispatch) => {
  dispatch(changeImageName(image));
  return dispatch(updateTitleFromImageArray(image));

}

export default connect(null, {deleteImagefromApi, changeImageTitle})(TopButtons);

