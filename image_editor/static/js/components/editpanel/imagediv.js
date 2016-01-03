import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
const fbId = document.querySelector("meta[name='fb-id']").getAttribute('content');

class ImageDiv extends React.Component{
    
    componentWillMount() {
        this.setState({editMode: false});
        window.fbAsyncInit = function() {
                FB.init({
                  appId      : fbId,
                  xfbml      : true,
                  version    : 'v2.5'
                    });
            };
            (function(d, s, id){
                 var js, fjs = d.getElementsByTagName(s)[0];
                 if (d.getElementById(id)) {return;}
                 js = d.createElement(s); js.id = id;
                 js.src = "//connect.facebook.net/en_US/sdk.js";
                 fjs.parentNode.insertBefore(js, fjs);
               }(document, 'script', 'facebook-jssdk'));
          }
    componentWillUpdate(nextProps, nextState) {
        if(this.props.image.picture !== nextProps.image.picture){
            if(this.state.editMode) this.props.updateImage(this.props.image);
            this.setState({editMode: false}); 
        }
          
    }
    toggleEdit(e){
        e.preventDefault();
        if(this.state.editMode) this.props.updateImage(this.props.image);
        this.setState({editMode: !this.state.editMode});
    }
    changeTitle(e){
        e.preventDefault();
        let image_copy = _.clone(this.props.image);
        image_copy.title = e.target.value;
        this.props.editImage(image_copy);
    }
    deleteImage(e){
        e.preventDefault();
        if(!confirm("are you sure you want to delete this image")) return; 
        this.props.deleteImage(this.props.image);
    }
    resetImage(){
        if(!confirm("are you sure you want to reset the filters")) return;
        let image_copy = _.clone(this.props.image);
        image_copy['filtered'] = false;
        console.log(image_copy)
        this.props.updateImage(image_copy);
    }
    shareImage(){

        FB.ui({
          method: 'feed',
          name: 'I just edited ' + this.props.image.title +  ' on image editor',
          display: 'popup',
          link: window.location.protocol + '//' + window.location.host,
          caption: 'Image editor is your instagram on web',
          picture: this.refs.filtedimage.src,
          description: "I just updated my image",
        }, (res) =>{
            console.log(res);
        });

    }


    render(){
        let buttonClass = classNames({
                'btn':true,
                'disabled': !_.isObject(this.props.image)
            });
        let picture = this.props.image.filtered? this.props.image.filter_path: this.props.image.picture
        return(
            <div>
            <div className="card text-xs-center">
                <blockquote className="card-blockquote card-text">
                    <form className={`${!this.state.editMode ? 'hide':''} form-inline`} action="#" onSubmit={this.toggleEdit.bind(this)}>
                      <div className="form-group">
                        <div className="input-group">
                          <input type="text" ref="title"  className="form-control" value={this.props.image.title} onChange={this.changeTitle.bind(this)}
                          />
                          </div>
                        </div>
                      <button type="submit" className="btn btn-default">Save</button>
                    </form>
                  <h6 className={`${this.state.editMode ? 'hide':''} text-uppercase`}>{_.isObject(this.props.image)?  (this.props.image.title || 'No Name'): 'No Image Selected'} </h6>
                  <h6 className="text-uppercase">{_.isObject(this.props.image)?  (this.props.image.current_filter || 'No Filter Applied'): ''} </h6>
                </blockquote>

            </div>
            <div className="edit-buttons">
            <button className={buttonClass} onClick={_.isObject(this.props.image)? this.toggleEdit.bind(this):''}><span className="mdi mdi-pencil"></span></button>
            <button className={buttonClass} onClick={_.isObject(this.props.image)? this.deleteImage.bind(this): ''}><span className="mdi mdi-delete"></span></button>
            <button className={buttonClass} onClick={_.isObject(this.props.image)? this.resetImage.bind(this): ''}><span className="mdi mdi-backup-restore"></span></button>

            <button className={`${buttonClass} pull-sm-right`} onClick={_.isObject(this.props.image)? this.shareImage.bind(this): ''}><span className="mdi mdi-share-variant"></span></button>
            <button className={`${buttonClass} pull-sm-right`}><span className="mdi mdi-download"></span></button></div>
            <div className="edit text-center">
            <img ref="filtedimage" src={this.props.image.picture? `/media/${picture}`:'/static/img/no_image_selected.gif'} />
            </div>
            </div>
            );
    }
}
ImageDiv.propTypes = {

    image: React.PropTypes.oneOfType([React.PropTypes.object,React.PropTypes.string]).isRequired,

    updateImage: React.PropTypes.func.isRequired,
    deleteImage: React.PropTypes.func.isRequired,
    editImage: React.PropTypes.func.isRequired

};

export default ImageDiv;