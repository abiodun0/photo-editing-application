import React from 'react';
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
                filterText={this.state.filterText} onChange={this.props.onChange.bind(this)}
                />
            </div>

            );
    }
}
class SearchBar extends React.Component{

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
                    onChange= {this.handleChange.bind(this)} 
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

    render(){
        let sections = [];
        let data = this.props.data;
        if(data.length<1){
            return(
          
            <div className="upload-img"> <div className="uploaded"> <h5> You dont have any images yet </h5></div>
            <button className="btn btn-primary"><i className="mdi mdi-upload"></i> Upload </button>
            </div>

            
            )
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
            <button className="btn btn-primary"><i className="mdi mdi-upload"></i> Upload </button>
            </div>

            
            )
           }
           else {
            return (
            <div className="upload-img">{sections}
            <button className="btn btn-primary"><i className="mdi mdi-upload"></i> Upload </button>
            </div>);
        }

        
    }
}

class SectionDiv extends React.Component{

    
    handleChange(){
        this.props.changeKey(this.props.getKey, this.props.image);
    }

    render(){
        var activeUpload = classNames({
                'uploaded': true,
                'active': this.props.getKey == this.props.activeKey
            });
        return(
                <div className={activeUpload}>
                <div className="media">
                    <a className="media-left" href="#" onClick={this.handleChange.bind(this)}>
                    <img className="media-object" src={this.props.image.src} alt="Generic placeholder image" />
                    </a>
                    <div className="media-body">
                        <p className="media-heading">{this.props.image.title}
                            <br/>
                            <small> Uploaded on </small>
                        </p>
                    </div>
                </div>
            </div>)


    }
}