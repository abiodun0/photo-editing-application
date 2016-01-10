import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

class ImageDiv extends React.Component {
    /**
    * Sends the acitve image object to the parent component.
    * @param {object} e event object
    */
    handleChange(e) {
        // Function that handles seleciton of image and trigger the active class
      e.preventDefault();
      this.props.changeKey(this.props.getKey, this.props.image);
    }
    /**
    * render the ImageDiv component
    *@return {string} div component
    */
    render() {
        // Sets dynamic class variables
      var activeUpload = classNames({
        uploaded: true,
        active: this.props.getKey === this.props.activeKey
      });
      return (
                <div className={activeUpload}
                onClick={this.handleChange.bind(this)}>
                <div className="media">
                    <div className="media-left" href="#"
                    style={{backgroundImage: 'url(/media/' +
                        this.props.image.picture + ')', width: 50 + '%',
      backgroundSize: 'cover', backgroundPosition: 50 + '% ' + 50 + '%',
      height: 180 + 'px'
  }}>
                    </div>
                    <div className="media-body">
                        <p className="media-heading">{this.props.image.title}
                            <br/>
                            <small> Modified {
                                moment(this.props.image.date_modified).fromNow()
                            }</small>
                        </p>
                    </div>
                </div>
            </div>);
    }
}
// Sets the required propTypes from the parent and give warnings if ts not present
ImageDiv.propTypes = {
  image: React.PropTypes.object.isRequired,
  getKey: React.PropTypes.number.isRequired,
  activeKey: React.PropTypes.number.isRequired,
  changeKey: React.PropTypes.func.isRequired
};

export default ImageDiv;
