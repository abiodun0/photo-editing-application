import React from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';


export default class SearchableImage extends React.Component{
    constructor(){
        super();

        this.state = {filterText : ''};
    }
    handleUserInput(filterText){
        this.setState({filterText: filterText});
    }

    render(){
        return (
            <div className="upload-div">

                <SearchBar filterText={this.state.filterText}
                onUserInput={this.handleUserInput.bind(this)} 
                />

                <UploadDiv data={this.props.data}
                filterText={this.state.filterText} onChange={this.props.onChange}
                />
            </div>

            );
    }
}
class SearchBar extends React.Component{
    testDiv(){
        console.log("test")
    }

    handleChange(){
            this.props.onUserInput(
            this.refs.filter.value
        )

    }
    render(){
        return (
            <form className="form">
              <div className="form-group">
                <div className="input-group">
                
                  <input type="text" className="form-control" placeholder="Search"
                    placeholder="Search your pictures..." 
                    ref="filter"
                    value= {this.props.filterText}
                    onChange= {this.handleChange.bind(this)} onClick={this.testDiv}
                    />
                  <div className="input-group-addon"><i className="mdi mdi-magnify"></i></div>
                </div>
              </div>
            </form>
            );
    }
}

class UploadDiv extends React.Component{
    constructor(){
        super();

        this.state = {activeKey:'default'};
    }
    changeActiveKey(key,image){
        this.setState({activeKey: key});
        this.props.onChange(image);
    }
    onDrop(files) {
      console.log("files", files);
    }

    onOpenClick() {
      this.refs.dropzone.open();
    }
    render(){
        let sections = [];
        let data = this.props.data;
        if(data.length<1){
            return(
                <div className="upload-img"> <div className="uploaded"> 
                <h5> You dont have any images yet </h5></div>
                <button className="btn btn-primary">
                <i className="mdi mdi-upload"></i> Upload 
                </button>
                </div>
                );
        }
        data.forEach(function(image,i){
            if(image.title.toLowerCase().indexOf(this.props.filterText.toLowerCase()) == -1) return;

            sections.push(
                <SectionDiv key={i} getKey={i} image={image} activeKey={this.state.activeKey} 
                changeKey={this.changeActiveKey.bind(this)} />);
        }.bind(this));
        if(sections.length < 1){
        return(
          
            <div className="upload-img"> <div className="uploaded"> <h5> No Images matches your criteria </h5></div>
            <button className="btn btn-primary"><i className="mdi mdi-upload"></i><p> Upload</p> </button>
            </div>

            
            )
           }
           else {
            return (
            <div className="upload-img">{sections}
            <div className="dropzone text-center">
            <Dropzone ref="dropzone" className="drop" onDrop={this.onDrop}>
                    <h5>Click or drop your images here</h5>
            </Dropzone>
            </div>
            
            </div>);
        }

        
    }
}

class SectionDiv extends React.Component{

    
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
                    <img className="media-object" src={this.props.image.thumbail} alt="Generic placeholder image" width="150" height="150"/>
                    </a>
                    <div className="media-body">
                        <p className="media-heading">{this.props.image.title}
                            <br/>
                            <small> Uploaded on {this.props.image.registered}</small>
                        </p>
                    </div>
                </div>
            </div>)


    }
}