import React from 'react';
import _ from 'lodash';
import SearchableImage from './searchableimage';
import EditableDiv from './editableDiv';
import {data} from './data';
import request from 'superagent';


export default class AppEditor extends React.Component{
    constructor(props){
        super(props);
        this.url = document.querySelector("meta[name='image_url']").getAttribute('content');

        this.state = {image:''};
    }
    componentWillMount() {
            this.setState({data:''});
            request.get(this.url)
            .set('Accept', 'application/json')
            .end((err, res) => {
                console.log(err);
                console.log(res.body);
                this.setState({data:res.body});
                
            });
        }

    changeImage(image){
        this.setState({image: image});
        this.editImage(image);
      
    }
    editImage(image){
        let index = _.findIndex(this.state.data, (img) => {
            return img.id == image.id;
        });
        this.state.data[index] = image;
    }

    deleteImage(image){
        request.del(this.url)
        .send(image)
        .end((err, res) => {
            if(!err){
            _.remove(this.state.data,(m)=>{
            return image.id == m.id;
        });
            this.setState({image: ''});

            }
        });

    }
    addImage(image){
        this.state.data.unshift(image);
        this.forceUpdate();
    }
    render(){
        return(
             <div className="row">
             <div className="col-sm-3">
             <SearchableImage data={this.state.data} addImage={this.addImage.bind(this)} changeImage={this.changeImage.bind(this)}/>
             </div>
            <div className="col-sm-9">
                <div className="edit-div">
                    <EditableDiv image={this.state.image} editImage={this.changeImage.bind(this)} deleteImage={this.deleteImage.bind(this)}/>
                </div>
            </div>
            </div>
            );


    }
}

