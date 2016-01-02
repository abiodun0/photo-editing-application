import React from 'react';
import _ from 'lodash';
import SearchableImage from './imagespanel';
import EditableDiv from './editpanel';
import request from 'superagent';
import toastr from 'toastr';
import 'superagent-django-csrf';
const imageUrl = document.querySelector("meta[name='image_url']").getAttribute('content');


export default class AppEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {image:''};
    }
    componentWillMount() {
            this.setState({data:'',isLoading:true});
            request.get(imageUrl)
            .set('Accept', 'application/json')
            .on('progress',(e)=>{
                console.log("progress", e);
            })
            .end((err, res) => {
                this.setState({isLoading:false})
                if(!err) this.setState({data:res.body});
                
            });
        }
    updateImage(image, filter=null){
        this.setState({isLoading:true})
        request.put(imageUrl)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(image)
            .end((err, res) => {
                this.setState({isLoading:false})
                console.log(res.text);
                if(!err){
                    if(filter){
                         toastr.info("Successfully added " + filter.toLowerCase() + " to " + image.title,'',{closeButton: true})
                     }
                    else{
                         toastr.info("Successfully updated " + image.title,'',{closeButton: true})
                     }
                     this.editImage(res.body);
                 }
             });
        }
    changeImage(image){
        this.setState({image: image});

      
    }
    editImage(image){
        let index = _.findIndex(this.state.data, (img) => {
            return img.id == image.id;
        });
        this.state.data[index] = image;
        this.changeImage(image);
    }

    deleteImage(image){
        this.setState({isLoading:true});
        request.del(imageUrl)
        .send(image)
        .end((err, res) => {
            if(!err){
            _.remove(this.state.data,(m)=>{
            return image.id == m.id;
        });
            this.setState({isLoading:false});
            toastr.info("successfully removed " + image.title,'',{closeButton: true})
            this.setState({image: ''});

            }
        });

    }
    addImage(image){
        this.state.data.unshift(image);
        this.forceUpdate();
    }
    render(){
        let loadingDiv;
        if(this.state.isLoading) {
            loadingDiv = (<img src="https://raw.githubusercontent.com/BenBBear/ionic-cache-src/master/img/loader.gif" width="70" height="70" style={{marginLeft:'auto',marginRight: 'auto',display:'block',position:'absolute',top:-15+'px',left: 45+'%', right: 45 + '%'}}/>);
        }
        return(
             <div className="row">
             <div className="col-sm-3">
             <SearchableImage data={this.state.data} addImage={this.addImage.bind(this)} changeImage={this.changeImage.bind(this)}/>
             </div>
            <div className="col-sm-9">
                <div className="edit-div">
                    {loadingDiv}

                    <EditableDiv image={this.state.image} editImage={this.editImage.bind(this)} deleteImage={this.deleteImage.bind(this)}
                    updateImage={this.updateImage.bind(this)}
                    />
                </div>
            </div>
            </div>
            );


    }
}

