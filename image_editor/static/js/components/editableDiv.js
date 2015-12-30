import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import _ from 'lodash';

export default class EditableDiv extends React.Component{
    componentWillMount() {
        this.setState({image: ''})

    }
    componentWillReceiveProps(nextProps) {
        this.setState({image: nextProps.image})
    }
    resetImage(){
        delete this.props.image['filter'];
        this.setState({image: this.props.image});
    }

    render(){
        return(
            <div>
            <ImageDiv image={this.state.image} editImage={this.props.editImage} 
            deleteImage={this.props.deleteImage} resetImage={this.resetImage.bind(this)}/>
            <FilterDiv image={this.state.image} changeFilter={this.props.editImage}/>
            </div>
            );
    }
}


class ImageDiv extends React.Component{
    
    componentWillMount() {
        this.setState({editMode: false});  
          
    }
    toggleEdit(e){
        e.preventDefault();
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
        this.props.resetImage()
    }
    render(){
        var buttonClass = classNames({
                'btn':true,
                'disabled': !_.isObject(this.props.image)
            });
        return(
            <div>
            <div className="card text-xs-center">
                <blockquote className="card-blockquote card-text">
                    <form className={`${!this.state.editMode ? 'hide':''} form-inline`} action="#" onSubmit={this.toggleEdit.bind(this)}>
                      <div className="form-group">
                        <div className="input-group">
                          <input type="text" ref="title"  className="form-control" value={this.props.image.title} onChange={this.changeTitle.bind(this)}/>
                          </div>
                        </div>
                      <button type="submit" className="btn btn-default">Save</button>
                    </form>
                  <h6 className={`${this.state.editMode ? 'hide':''} text-uppercase`}>{_.isObject(this.props.image)?  (this.props.image.title || 'No Name'): 'No Image Selected'} </h6>
                  <h6 className="text-uppercase">{_.isObject(this.props.image)?  (this.props.image.filter || 'No Filter Applied'): ''} </h6>
                </blockquote>

            </div>
            <div className="edit-buttons">
            <button className={buttonClass} onClick={_.isObject(this.props.image)? this.toggleEdit.bind(this):''}><span className="mdi mdi-pencil"></span></button>
            <button className={buttonClass} onClick={_.isObject(this.props.image)? this.deleteImage.bind(this): ''}><span className="mdi mdi-delete"></span></button>
            <button className={buttonClass} onClick={_.isObject(this.props.image)? this.resetImage.bind(this): ''}><span className="mdi mdi-backup-restore"></span></button>

            <button className={`${buttonClass} pull-sm-right`}><span className="mdi mdi-share-variant"></span></button>
            <button className={`${buttonClass} pull-sm-right`}><span className="mdi mdi-download"></span></button></div>
            <div className="edit text-center">
            <img src={this.props.image.picture? `/media/${this.props.image.picture}`:''} />
            </div>
            </div>
            );
    }
}
class FilterDiv extends React.Component{

    componentWillReceiveProps(nextProps) {
        this.state = {activeFilter: ''};
          
    }
    activateFilter(filter){
        let image = _.clone(this.props.image)
        image['filter'] = filter
        this.setState({activeFilter: filter});
        this.props.changeFilter(image);
    }
    
    createFilterDiv(filter,i){
        var activeFilter = classNames({
                'active': this.props.image.filter == filter
            });
            return (
                <div className={activeFilter} key={i} onClick={this.activateFilter.bind(this,filter)}>
                <img src={`/media/${this.props.image.picture}`} width="100" height="100"/>
                <p className="lead">{filter}</p>
                </div>
                );
        }

    render(){
        let filters = ['gray', 'Hd', 'serpia','black','orange','sunny'];
        var settings = {
            className:'slider',
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows:true
        };
        if (this.props.image){
        return(
            
             <Slider {...settings}>
             {filters.map(this.createFilterDiv.bind(this))}
            </Slider>
            );
    }
    else{
        return(<div />)
    }

    }
}

