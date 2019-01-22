// export function validateNumType(keyCode) {
//   let allowed = [ 8, 46, 37, 39, 9, 189 ]
//   return allowed.indexOf(keyCode) > -1 || (keyCode >=48 && keyCode <=57)
// }

// export function checkCtrlA(e) {
//   if (e.ctrlKey) {
//     if (e.keyCode == 65 || e.keyCode == 97) {
//       return true
//     }
//   }
//   return false
// }

// export function validateNumType(keyCode) {
//     let allowed = [ 8, 46, 37, 39, 9, 189, 13 ]
//     //console.log("allowed", allowed.indexOf(keyCode))
//     return allowed.indexOf(keyCode) > -1 || (keyCode >=48 && keyCode <=57)
//   }

export function validateNumType(keyCode) {
  let allowed = [ 8, 46, 37, 39, 9, 189 ]
  const res = allowed.indexOf(keyCode) > -1 || (keyCode == 190) || (keyCode >=48 && keyCode <=57) || (keyCode >=96 && keyCode <= 105)
  //console.log(res)
  return res
}

export function checkCtrlA(e) {
  if (e.ctrlKey) {
    if (e.keyCode == 65 || e.keyCode == 97) {
      return true
    }
  }
  return false
}

export function checkCtrlV(e) {
  if (e.ctrlKey) {
    if (e.keyCode == 86 || e.keyCode == 118) {
      return true
    }
  }
  return false
}