import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

export default class EditableDiv extends React.Component{

    constructor(){
        super()
        this.state = {image: ''}
       
    }
    componentWillReceiveProps(nextProps) {
        this.setState({image: nextProps.image})
    }
    applyFilter(image){
        this.setState({image: image});
    }

    render(){
        return(
            <div>
            <ImageDiv image={this.state.image} editImage={this.props.editImage.bind(this)} deleteImage={this.props.deleteImage}/>
            <FilterDiv image={this.state.image} changeFilter={this.applyFilter.bind(this)}/>
            </div>
            );
    }
}


class ImageDiv extends React.Component{
    constructor(){
        super()

    }
    componentWillMount() {
                this.setState({editMode: false,
            image:''});  
    }

    componentWillReceiveProps(nextProps) {
        this.setState({image: nextProps.image,
            editMode:false});
    }

    toggleEdit(){
        this.setState({editMode: !this.state.editMode});
    }
    changeTitle(e){
        e.preventDefault();
        this.setState({});
        this.state.image.title = e.target.value;
    }

    saveTitle(e){
        e.preventDefault();
        console.log("enter pressed");
        this.state.image.title = this.refs.title.value;
        this.toggleEdit();
        this.props.editImage(this.state.image);
    }
    deleteImage(e){
        e.preventDefault();
        if(!confirm("are you sure you want to delete this image")) return; 
        this.props.deleteImage(this.state.image);
    }


    render(){
        var buttonClass = classNames({
                'btn':true,
                'disabled': !this.props.image.title
            });
        return(
            <div>
            <div className="card text-xs-center">
                <blockquote className="card-blockquote card-text">
                    <form className={`${!this.state.editMode ? 'hide':''} form-inline`} action="#" onSubmit={this.saveTitle.bind(this)}>
                      <div className="form-group">
                        <div className="input-group">
                          <input type="text" ref="title"  className="form-control" value={this.state.image.title} onChange={this.changeTitle.bind(this)}/>
                          </div>
                        </div>
                      <button type="submit" className="btn btn-default">Save</button>
                    </form>
                  <h6 className={`${this.state.editMode ? 'hide':''} text-uppercase`}>{this.props.image.title || 'No image selected'} </h6>

                  <h6 className="text-uppercase">{this.props.image.filter || 'No Filter Applied yet'} </h6>
                </blockquote>

            </div>
            <div className="edit-buttons">
            <button className={buttonClass} onClick={this.toggleEdit.bind(this)}><span className="mdi mdi-pencil"></span></button>
            <button className={buttonClass} onClick={this.deleteImage.bind(this)}><span className="mdi mdi-delete"></span></button>

            <button className={`${buttonClass} pull-sm-right`}><span className="mdi mdi-share-variant"></span></button>
            <button className={`${buttonClass} pull-sm-right`}><span className="mdi mdi-download"></span></button></div>
            <div className="edit text-center">
            <img src={this.props.image.picture || ''} />
            </div>
            </div>
            );
    }
}
class FilterDiv extends React.Component{
    constructor(){
        super();
        this.state = {activeFilter: ''};
    }
    activateFilter(filter){
        let image = this.props.image
        image['filter'] = filter
        this.setState({activeFilter: filter});
        this.props.changeFilter(image);
    }
    
    createFilterDiv(filter,i){
        var activeFilter = classNames({
                'active': this.state.activeFilter == filter
            });
            return (
                <div className={activeFilter} key={i} onClick={this.activateFilter.bind(this,filter)}>
                <img src={this.props.image.thumbail} width="100" height="100"/>
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

