/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* React File Base64 - Version@1.0.0
*
* Adapted and Improved by Luis Rojas.
*/

import React from 'react';
import ReactDOM from 'react-dom';

class FileBase64 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      files: []
    };
    console.log(this.refs);
  }

  componentWillMount() {
    if(!this.fileValue)
      return;
    this.fileValue.value = this.props.value || '';
    this.fileValue.addEventListener('change', this.props.handleFormChange);
  }

  componentWillUnmount() {
    this.fileValue.removeEventListener('change', this.props.handleFormChange);
  }

  handleChange(e){

    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = []
    for (var i = 0; i < files.length; i++) {
      let file = files[i]
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000)+' kB',
          base64: reader.result,
          file: file
        }

        // Push it to the state
        allFiles.push(fileInfo)

        // If all files have been proceed
        if(allFiles.length == files.length){
          if(this.fileValue) {
            this.fileValue.value = allFiles[0]['base64'];
            this.fileValue.dispatchEvent(new Event('change'))
          }
          this.props.onDone(allFiles)

        }

      } // reader.onload

    }

  }

  render(){
    return (
      <div>
        <input
          type='hidden'
          ref={(input) => this.fileValue = input }
          name={this.props.name || 'file64'}
          />
        <input
          type="file"
          {...this.props.elementProps }
          onChange={ this.handleChange.bind(this) } />
      </div>
    )
  }

}

export default FileBase64;
