export function validateNumType(keyCode) {
  let allowed = [ 8, 46, 37, 39, 9, 189 ]
  return allowed.indexOf(keyCode) > -1 || (keyCode >=48 && keyCode <=57)
}

export function checkCtrlA(e) {
  if (e.ctrlKey) {
    if (e.keyCode == 65 || e.keyCode == 97) {
      return true
    }
  }
  return false
}