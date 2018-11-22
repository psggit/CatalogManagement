export function getHasuraRole(data) {
  const hasuraRoles = data.hasura_roles
  // const hasuraRoles = ["user", "support_person", "excise", "support_admin"]
  const rolesMap = {
    admin: 8,
    opadmin: 8,
    dataadmin: 7,
    opdataadmin: 7,
    dataentry: 6,
    opdataentry: 6,
    support_admin: 5,
    support_master: 4,
    support_person: 3,
    business_team: 9,
    product_team: 5,
    delivery_support_person: 3,
    user: 1
  }
  let maxRole = rolesMap["user"]
  let xHasuraRole = "user"
  for(let i=0; i<hasuraRoles.length; i++) {
    if (maxRole <= rolesMap[hasuraRoles[i]]) {
      maxRole = rolesMap[hasuraRoles[i]]
      xHasuraRole = hasuraRoles[i]
    }
  }
  return xHasuraRole
}

// export function getAuthToken(data) {
//   const token = data.auth_token
//   return token
// }

export function getHasuraId(data) {
  const hasuraId = data.hasura_id
  return hasuraId
}

export function createSession(data) {
  localStorage.setItem('x-hasura-role', getHasuraRole(data))
  localStorage.setItem('hasura-id', getHasuraId(data))
}
