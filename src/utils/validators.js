import { emailRegex } from './regex'

export function validateTextField(fieldName, fieldValue) {
  let textValue = ""
  if(fieldValue >= 0 || fieldValue) {
    textValue = fieldValue.toString()
  }
  if(textValue.toString().trim().length === 0) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  }
  return {
    status: false,
    value: ''
  }
}

export function validateEmail(fieldName, fieldValue) {
  if (!fieldValue.length) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  } else if (!emailRegex.test(fieldValue)) {
    return {
      status: true,
      value: `${fieldName} is invalid`
    }
  }
  
  return {
    status: false,
    value: ''
  }
}

export function validateNumberField(fieldName, fieldValue) {
 if ((isNaN(fieldValue))) {
    return {
      status: true,
      value: `${fieldName} is invalid`
    }
  } else if(!(fieldValue)){
    return {
      status: true,
      value: `${fieldName} is required`
    }
  }
  
  return {
    status: false,
    value: ''
  }
}


