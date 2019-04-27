import React, { Fragment } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import '@sass/components/_form.scss'
import { POST } from '@utils/fetch'
import { Api } from '@utils/config'
import {getIcon} from '@utils/icon-utils'
import { validateTextField } from './../../../utils/validators'
import RaisedButton from 'material-ui/RaisedButton'

class BrandForm extends React.Component {
  constructor(props) {
    super(props)
    //this.uploadedImageUrl = ''
    this.intitialState = {
      shouldTrim: true,
      brandName: props.brandInfo ? props.brandInfo.brand_name : '',
      alcoholPercentage: props.brandInfo ? this.props.brandInfo.alcohol_per : '',
      temperature: props.brandInfo ? this.props.brandInfo.temperature : '',
      caloriesPercentage: props.brandInfo ? this.props.brandInfo.cal_per : '',
      caloriesTotal: props.brandInfo ? props.brandInfo.cal_total : '',
      // isImageUploaded: props.brandInfo ? true : false,
      // isImageUploading: false,
      // isImageSelected: false,
      // uploadedImageUrl: props.brandInfo ? 'https://api2.amebae21.hasura-app.io/get?fs_url=4304@public:///admin/158343/raw/846603e5-7c57-4116-a767-0a425f5131d4-UB_Group_Logo_White' : '',
      // image_url: props.brandInfo ? props.brandInfo.image : '',
      tag: props.brandInfo ? props.brandInfo.tag : '',
      high_res_image: props.brandInfo ? props.brandInfo.high_res_image : '',
      low_res_image: props.brandInfo ? props.brandInfo.low_res_image : '',
      high_res_brand_logo: props.brandInfo ? props.brandInfo.brand_logo_high_res_image : '',
      low_res_brand_logo: props.brandInfo ? props.brandInfo.brand_logo_low_res_image : '',
      typeIdx: props.brandInfo ? parseInt(props.brandInfo.type)  : '',
      genreIdx: props.brandInfo ? parseInt(props.brandInfo.genre_id) : "",
      genreName: "",
      description: props.brandInfo ? props.brandInfo.description : '',
      high_res_image_err: false,
      low_res_image_err: false,
      brandIdx: props.brandInfo ? parseInt(props.brandInfo.id) : '',

      brandNameErr: {
        value: '',
        status: false
      },

      highResBrandLogoErr: {
        value: '',
        status: false
      },

      tagNameErr: {
        value: '',
        status: false
      },

      lowResBrandLogoErr: {
        value: '',
        status: false
      }
    }
    this.inputNameMap = {
      'brandName': 'Brand name',
      'lowResBrandLogo': 'Low res brand logo',
      'highResBrandLogo': 'High res brand logo',
      'tagName': 'Tag'
    }

    this.state = Object.assign({}, this.intitialState)
    this.handleTextFields = this.handleTextFields.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleBrandChange = this.handleBrandChange.bind(this)
    // this.resetUploadImage = this.resetUploadImage.bind(this)
    // this.submitUploadedImage = this.submitUploadedImage.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
    this.handleGenreChange = this.handleGenreChange.bind(this)
  }
 
  componentDidUpdate (prevProps) {
    if((this.props.brandTypeList !== prevProps.brandTypeList)) {
      if(this.state.typeIdx.toString().length === 0) {
        this.setState({
          typeIdx: parseInt(this.props.brandTypeList[0].id)
        })
      }
    } 
    if(this.props.genreList !== prevProps.genreList) {
      if(this.state.genreIdx.toString().length === 0) {
        this.setState({
          genreIdx: parseInt(this.props.genreList[0].id)
        })
      }
    }
    if(this.props.brandList !== prevProps.brandList) {
      if(this.state.brandIdx.toString().length === 0) {
        this.setState({
          brandIdx: parseInt(this.props.brandList[0].id)
        })
      }
    }
  }

  handleTypeChange(e, k) {
    //const typeIdx = k + 1
    this.setState({
      typeIdx: parseInt(this.props.brandTypeList[k].id)
      //brandType: this.props.brandTypeList[k].name
    })
  }

  handleBrandChange(e, k) {
    //const brandIdx = k + 1
    this.setState({
      brandIdx: parseInt(this.props.brandList[k].id),
      brandName: this.props.brandList[k].brand_name
    })
  }

  handleGenreChange(e, k) {
    this.setState({
      genreIdx: parseInt(this.props.genreList[k].id),
      genreName: this.props.genreList[k].genre_name
    })
  }

  handleTextFields(e) {
    const errName = `${e.target.name}Err`
    this.setState({
        [e.target.name]: e.target.value,
        [errName]: validateTextField(this.inputNameMap[e.target.name], e.target.value),
    })
  }

  // handleChange(e) {
  //   const errName = `${e.target.name}Err`
  //   if(validateNumType(e.keyCode) || checkCtrlA(e) || checkCtrlV(e)) {
  //     this.setState({ 
  //         [e.target.name]: e.target.value,
  //         [errName]: validateNumberField(this.inputNameMap[e.target.name], e.target.value)
  //     })
  //   } else {
  //       e.preventDefault()
  //   }   
  // }

  handleChange(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName]: {
        value: "",
        status: false
      }
    })
    const re = /^[0-9\b]*$/;
    if ((re.test(e.target.value))) {
       this.setState({[e.target.name]: e.target.value})
    } else {
      e.preventDefault()
    }
  }

  getData() {
    return this.state
  }

  // handleUploadChange(e) {
  //   const file = e.target.files[0]
  //   this.setState({
  //     data: file,
  //     isImageSelected: true
  //   })
  // }

  // resetUploadImage() {
  //   this.setState({ isImageUploaded: false, isImageSelected: false, isImageUploading: false, image_url: '' })
  // }

  isFormValid() {
    const brandNameErr = validateTextField(this.inputNameMap['brandName'], this.state.brandName)
    this.setState({ brandNameErr: validateTextField(this.inputNameMap['brandName'], this.state.brandName) })

    // const lowResBrandLogoErr = validateTextField(this.inputNameMap['lowResBrandLogo'], this.state.low_res_brand_logo)
    // this.setState({ lowResBrandLogoErr: validateTextField(this.inputNameMap['lowResBrandLogo'], this.state.low_res_brand_logo) })

    // const highResBrandLogoErr = validateTextField(this.inputNameMap['highResBrandLogo'], this.state.high_res_brand_logo)
    // this.setState({ highResBrandLogoErr: validateTextField(this.inputNameMap['highResBrandLogo'], this.state.high_res_brand_logo) })
     
    // const tagNameErr = validateTextField(this.inputNameMap['tagName'], this.state.tag)
    // this.setState({ tagNameErr: validateTextField(this.inputNameMap['tagName'], this.state.tag) })

    if(!brandNameErr.status
      // !highResBrandLogoErr.status && 
      // !lowResBrandLogoErr.status
      // !tagNameErr.status
    ) {
      return true;
    }
    return false
  }

  handleSave() {
    if(this.isFormValid()) {
      this.props.submit()
    }
  }

  // submitUploadedImage() {
  //   const formData = new FormData()
  //   formData.append('file', this.state.data)
  //   this.setState({ isImageUploading: true, isImageSelected: false })
  //   POST({
  //     api: '/upload',
  //     type: 'FormData',
  //     apiBase: 'api2',
  //     data: formData,
  //     handleError: true
  //   })
  //     .then((json) => {
  //       //this.uploadedImageUrl = `${Api.api2}/get?fs_url=${json[0]}`
  //       this.setState({ 
  //         isImageUploaded: true, 
  //         isImageUploading: false, 
  //         //image_url: json[0],
  //         image_url: `${Api.api2}/get?fs_url=${json[0]}`,
  //         uploadedImageUrl: `${Api.api2}/get?fs_url=${json[0]}`
  //       })
  //     })
  // }

  render() {
    const { brandNameErr, highResBrandLogoErr, lowResBrandLogoErr, tagNameErr } = this.state
    console.log("props", this.props)
    return (
      <Fragment>
        
        {/* <div className="form-group">
          <label className="label">Brand name*</label><br />
          <TextField
            disabled={this.props.disableNameField}
            onChange={this.handleTextFields}
            name="brandName"
            value={this.state.brandName}
            style={{ width: '100%' }}
          />
          {
            brandNameErr.status &&
            <p className="error">* {brandNameErr.value}</p>
          }
        </div> */}

        <div className="form-group">
          <label className="label">Brand name*</label><br />
          {
             location.pathname.includes("edit")
             ? <SelectField
               value={this.state.brandIdx}
               onChange={this.handleBrandChange}
               style={{ width: '100%' }}
             >
               {
                 !this.props.loadingBrandList && this.props.brandList.map((item, i) => (
                   <MenuItem
                     value={item.id}
                     key={item.id}
                     primaryText={item.brand_name}
                   />
                 ))
               }
             </SelectField>
             : <TextField
               onChange={this.handleTextFields}
               name="brandName"
               value={this.state.brandName}
               style={{ width: '100%' }}
             />
          }
        </div>

        <div className="form-group">
          <label className="label">Alcohol percentage</label><br />
          <TextField
            name="alcoholPercentage"
            autoComplete='off'
            style={{ width: '100%' }}
            onChange={this.handleChange}
            value={this.state.alcoholPercentage}
          />
        </div>

        <div className="form-group">
          <label className="label">Temperature</label><br />
          <TextField
            name="temperature"
            autoComplete='off'
            style={{ width: '100%' }}
            onChange={this.handleChange}
            value={this.state.temperature}
          />
        </div>

        <div className="form-group">
          <label className="label">Calories percentage</label><br />
          <TextField
            name="caloriesPercentage"
            autoComplete='off'
            style={{ width: '100%' }}
            onChange={this.handleChange}value={this.state.caloriesPercentage}
          />
        </div>

        <div className="form-group">
          <label className="label">Calories total</label><br />
          <TextField
            name="caloriesTotal"
            autoComplete='off'
            style={{ width: '100%' }}
            onChange={this.handleChange}
            value={this.state.caloriesTotal}
          />
        </div>

        <div className="form-group">
          <label className="label">Type</label><br />
          <SelectField
            value={this.state.typeIdx}
            onChange={this.handleTypeChange}
            style={{ width: '100%' }}
          >
            {
              !this.props.loadingBrandTypeList && this.props.brandTypeList.map((item, i) => (
                <MenuItem
                  value={item.id}
                  key={item.id}
                  primaryText={item.name}
                />
              ))
            }
          </SelectField>
        </div>

        <div className="form-group">
          <label className="label">Genre</label><br />
          <SelectField
            value={this.state.genreIdx}
            onChange={this.handleGenreChange}
            style={{ width: '100%' }}
          >
            {
              !this.props.loadingGenreList && this.props.genreList.map((item, i) => (
                <MenuItem
                  value={parseInt(item.id)}
                  key={parseInt(item.id)}
                  primaryText={item.genre_name}
                />
              ))
            }
          </SelectField>
        </div>

        <div className="form-group">
          <label className="label">Tag</label><br />
          <TextField
            defaultValue={this.props.brandInfo ? this.props.brandInfo.tag : ''}
            name="tag"
            autoComplete='off'
            hintText="tag1, tag2, tag3"
            style={{ width: '100%' }}
            onChange={this.handleTextFields}
          />
          {
            tagNameErr.status &&
            <p className="error">* {tagNameErr.value}</p>
          }
        </div>

        {/* <div className="form-group">
          <label className="label">Upload image</label><br />
          {
            !this.state.isImageUploaded &&
            <div>
              <input
                onChange={this.handleUploadChange}
                type="file"
                style={{
                  marginTop: '15px',
                  padding: '0',
                  border: '0'
                }}
              />

              <button
                disabled={!this.state.isImageSelected || this.state.isImageUploading}
                onClick={this.submitUploadedImage}
                style={{      
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  cursor: this.state.isImageUploading ? 'progress' : 'pointer'        
                }}
              >
                Upload
              </button>
            </div>
          }
          {
            this.state.isImageUploaded &&
            <div style={{
              width: '200px',
              marginTop: '15px',
              position: 'relative',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <img src={this.state.uploadedImageUrl} style={{ width: '200px', height: '200px' }} />
              <div
                onClick={this.resetUploadImage}
                style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                zIndex: '1',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#fff',
                cursor: 'pointer'
              }}>
                { getIcon('cross-circle') }
              </div>
            </div>
          }
        </div>

        <div className="form-group">
          <label className="label">Image url</label><br />
          <TextField
            readOnly
            onChange={this.handleTextFields}
            name="high_res_image"
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.image_url}
            style={{ width: '100%' }}
          />
        </div> */}

        <div className="form-group">
          <label className="label">High res bottle image</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="high_res_image"
            autoComplete='off'
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.high_res_image}
            style={{ width: '100%' }}
          />
          {
            this.state.high_res_image_err && 
            <p style={{ color: '#ff3b34'}}> High res bottle image is required </p>
          }
          
        </div>

        <div className="form-group">
          <label className="label">Low res bottle image</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="low_res_image"
            autoComplete='off'
            hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.low_res_image}
            style={{ width: '100%' }}
          />
          {
            this.state.low_res_image_err && 
            <p style={{ color: '#ff3b34'}}> Low res bottle image is required</p>
          }
        </div>

        <div className="form-group">
          <label className="label">High res brand logo</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="high_res_brand_logo"
            autoComplete='off'
            //hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.high_res_brand_logo}
            style={{ width: '100%' }}
          />
          {
            highResBrandLogoErr.status && 
            <p style={{ color: '#ff3b34'}}>* {highResBrandLogoErr.value}</p>
          }
          
        </div>

        <div className="form-group">
          <label className="label">Low res brand logo</label><br />
          <TextField
            disabled={this.props.isDisabled}
            onChange={this.handleTextFields}
            name="low_res_brand_logo"
            autoComplete='off'
            //hintText="https://cloudfront.ads.johnny_walker.jpg"
            value={this.state.low_res_brand_logo}
            style={{ width: '100%' }}
          />
          {
            lowResBrandLogoErr.status && 
            <p style={{ color: '#ff3b34'}}>* {lowResBrandLogoErr.value}</p>
          }
        </div>

        <div className="form-group">
          <label className="label">Description</label>
          <br />
          <div style={{ paddingTop: '10px'}}>
            <textarea
              onChange={this.handleTextFields}
              name="description"
              value={this.state.description}
              style={{ width: '100%', fontSize: '16px' }}
              rows="4" 
            ></textarea>
          </div>
        </div>

        <RaisedButton
          primary
          disabled={brandNameErr.status || this.props.isDisabled}
          label="Save"
          onClick={this.handleSave}
          style={{ marginTop: '40px' }}
        />
      </Fragment>
    )
  }
}

export default BrandForm
