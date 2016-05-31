import React from 'react';

class ProgressBar extends React.Component {
    /**
    * render the ProgressBar component
    *@return {string} div component
    */
    render() {
      if (this.props.isUploading) {
        return (
            <div className="progresszone">
            <p>Uploading {this.props.filename}...</p>
            <div className="row">
            <div className="col-sm-4">
             <img src={this.props.preview} />
             </div>
             <div className="col-sm-8">
            <progress className="progress progress-striped progress-info"
            value={this.props.percentage} max="100">
            {this.props.perecentage}%</progress>
            </div>
            </div>
            </div>
        );
      }
      return (<div />);
    }
}

// Sets the required propTypes from the parent and give warnings if ts not present
ProgressBar.propTypes = {
  preview: React.PropTypes.string.isRequired,
  isUploading: React.PropTypes.bool.isRequired,
  filename: React.PropTypes.string.isRequired,
  percentage: React.PropTypes.number.isRequired
};

export default ProgressBar;
