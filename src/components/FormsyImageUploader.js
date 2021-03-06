import React, { Component } from 'react'
import { File } from 'formsy-react-components'
import ImageTools from './../lib/ImageResizer'

/**
 * Image uploader with preview. Returns base64 image
 *
 *  @props
 *    setImage (func):  
 *      Callback function that is called every time the image changes
 *    
 *  @returns
 *    base64 image
 */

class FormsyImageUploader extends Component {
  constructor(){
    super()

    this.state = {
      image: ''
    }
  }

  componentWillMount(){
    this.setState({ image: this.props.previewImage || '' })
  }

  loadAndPreviewImage() {
    const reader = new FileReader()  
    reader.onload = (e) => {
      this.setState({ image: e.target.result })
      this.props.setImage(e.target.result)
    }

    ImageTools.resize(this.refs.imagePreview.element.files[0], {
      width: 800,
      height: 600
    }, (blob, didItResize) => 
      reader.readAsDataURL(didItResize ? blob : this.refs.imagePreview.element.files[0]) )
  }

  render(){
    return(
      <div>
        <div id="image-preview">
          <img src={this.state.image} width="500px" alt=""/>
        </div>

        <div className="form-group">
          <label>Add a picture</label>
          <File
            name="picture"
            onChange={()=>this.loadAndPreviewImage()}
            ref="imagePreview"
            required
          />
        </div> 
      </div>     
    )
  }
}

export default FormsyImageUploader
