import React from 'react';

class ProgressBar extends React.Component {
    render() {
        if(this.props.isUploading){
        return(
            <div className="progresszone">
            <p>{this.props.filename}</p>
            <div className="row">
            <div className="col-sm-4">
             <img src={this.props.preview} />
             </div>
             <div className="col-sm-8">
            <progress className="progress progress-striped progress-info" value={this.props.percentage} max="100">{this.props.perecentage}%</progress>
            </div>
            </div>
            </div>
        );
    }
    return(<div />)
    }
}

export default ProgressBar;