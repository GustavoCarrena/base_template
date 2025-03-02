export function setAuthToLocalStorage(auth) {
  localStorage.setItem('auth', JSON.stringify(auth))
}

export function getAuthFromLocalStorage() {
  const auth = localStorage.getItem('auth')
  if (!auth) return null
  return JSON.parse(auth)
}

export function deleteAuthFromLocalStorage() {
  localStorage.removeItem('auth')
}