import React from 'react'
import classNames from 'classnames';
import {connect} from 'react-redux';
import {deleteImageTest} from '../../actions'


class TopButtons extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editMode: false,
      imageTitle: props.activeImage.title
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleEdit(){
      this.setState({editMode: !this.state.editMode});
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
      return (
        <div className="edit-buttons">
            <button className={buttonClass} onClick={this.toggleEdit}>
                <span className="mdi mdi-pencil"></span></button>
            <button className={buttonClass} onClick={()=> this.props.deleteImageTest(this.props.activeImage)}>
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

export default connect(null, {deleteImageTest})(TopButtons);

