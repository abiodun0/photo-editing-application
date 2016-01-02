import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

class ImageDiv extends React.Component{

    
    handleChange(e){
        e.preventDefault();

        this.props.changeKey(this.props.getKey, this.props.image);
    }
    render(){
        var activeUpload = classNames({
                'uploaded': true,
                'active': this.props.getKey == this.props.activeKey
            });
        return(
                <div className={activeUpload} onClick={this.handleChange.bind(this)}>
                <div className="media">
                    <a className="media-left" href="#" >
                    <img className="media-object" src={`/media/${this.props.image.picture}`} alt="Generic placeholder image" width="150" height="150"/>
                    </a>
                    <div className="media-body">
                        <p className="media-heading">{this.props.image.title}
                            <br/>
                            <small> Modified {moment(this.props.image.date_modified).fromNow()}</small>
                        </p>
                    </div>
                </div>
            </div>)


    }
}
ImageDiv.propTypes = {

    image: React.PropTypes.object.isRequired,

    getKey: React.PropTypes.number.isRequired,
    activeKey: React.PropTypes.number.isRequired,

    changeKey: React.PropTypes.func.isRequired
};

export default ImageDiv;