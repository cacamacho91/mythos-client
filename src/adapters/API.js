const BASE_URL = 'https://mythos-server.herokuapp.com/api/v1'

const CHAR_URL = BASE_URL + '/characters'
const NEW_CHAR_URL = BASE_URL + '/generate/full_character'
const GENERATE_URL = BASE_URL + '/generate/'
const USER_URL = BASE_URL + '/users'
const CLONE_URL = CHAR_URL + '/clone'

//================ AUTHORISED API CALLS ================//

//Used to control access to authorised endpoint for signed up users only
const authorizedFetch = (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token')
    }
  })
}

const validate = () =>
  authorizedFetch(BASE_URL + '/validate').then(resp => resp.json())

const deleteCharacter = id =>
  authorizedFetch(CHAR_URL + `/${id}`, { method: 'DELETE' }).then(resp =>
    resp.json()
  )

const getMyCharacters = () =>
  authorizedFetch(BASE_URL + '/mycharacters').then(resp => resp.json())

const cloneCharcter = (characterId, userId) => {
  return authorizedFetch(CLONE_URL, {
    method: 'POST',
    body: JSON.stringify({ id: characterId, user: userId })
  }).then(resp => resp.json())
}

const updateCharacter = character =>
  fetch(CHAR_URL + `/${character.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(character)
  }).then(resp => resp.json())

//================ OPEN API CALLS ================//

const getAllCharacters = () => fetch(CHAR_URL).then(resp => resp.json())

const generateNewCharacter = () => fetch(NEW_CHAR_URL).then(resp => resp.json())

const getCharacterById = id =>
  fetch(`${CHAR_URL}/${id}`).then(resp => resp.json())

const login = user => {
  return fetch(BASE_URL + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(resp => resp.json())
}

const createCharacter = characterData => {
  return fetch(CHAR_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ character: characterData })
  }).then(resp => resp.json())
}

const generateAttribute = attribute =>
  fetch(GENERATE_URL + `${attribute}`).then(resp => resp.json())

const signUp = userData => {
  return fetch(USER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: userData })
  }).then(resp => resp.json())
}

export default {
  login,
  validate,
  getMyCharacters,
  getAllCharacters,
  deleteCharacter,
  createCharacter,
  getCharacterById,
  generateNewCharacter,
  updateCharacter,
  generateAttribute,
  cloneCharcter,
  signUp
}
