import { AvatarOptions, OverrideOption, AvatarList, AvatarListItem } from './Types'


export const buildURL = (avatarOptions: AvatarOptions | undefined, overrideOption?: OverrideOption) => {
  if (!avatarOptions) return "https://api.dicebear.com/9.x/bottts/svg"

  const _O = { ...avatarOptions }
  
  if (overrideOption) _O[overrideOption.name] = overrideOption.value
  
  const baseURL = "https://api.dicebear.com/9.x/bottts/svg"
  const params = new URLSearchParams()
  
  if (_O.baseColor) params.append('baseColor', _O.baseColor)
  if (_O.backgroundColor) params.append('backgroundColor', _O.backgroundColor)
  if (_O.eyes) params.append('eyes', _O.eyes)
  if (_O.face) params.append('face', _O.face)
  if (_O.mouth) params.append('mouth', _O.mouth)
  if (_O.sides) params.append('sides', _O.sides)
  if (_O.texture) params.append('texture', _O.texture)
  if (_O.top) params.append('top', _O.top)
  
  const queryString = params.toString()
  return queryString ? `${baseURL}?${queryString}` : baseURL
}

// namespace to isolates app and prevent key collision
export const STORAGE_PREFIX = 'robot_avatar_'

// consistency in key naming across the application
export const getStorageKey = (key: string) => {
  return `${STORAGE_PREFIX}${key}`
}

const generateKey = (name: string) => {
  return `${name}${Math.floor(Math.random()*1000000)}`
}

// consistent interface for storing avatars
export const saveAvatarToStorage = (name: string, url: string) => {
  if (!name) return false
  
  try {
    const key = generateKey(name)
    window.localStorage.setItem(
      getStorageKey(key), 
      JSON.stringify({URL: url, name: name})
    )
    return key
  } catch(error) {
    console.error("Error saving avatar:", error)
    return false
  }
}

// Centralizes deletion logic in a dedicated function
export const deleteAvatarFromStorage = (key: string) => {
  try {
    window.localStorage.removeItem(getStorageKey(key))
    return true
  } catch(error) {
    console.error("Error deleting avatar:", error)
    return false
  }
}

// Only retrieves items that belong to our application (with our prefix)
export const getAllAvatarsFromStorage = ():AvatarList => {
  try {
    const avatars:AvatarList = []
    const prefix = STORAGE_PREFIX
    
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (key && key.startsWith(prefix)) {
        const rawData = window.localStorage.getItem(key)
        if (rawData) {
          const avatar = JSON.parse(rawData) as AvatarListItem
          avatar.key = key.replace(prefix, '') // Remove prefix before returning. Helps to reduce coupling
          avatars.push(avatar)
        }
      }
    }
    
    return avatars
  } catch(error) {
    console.error("Error retrieving avatars:", error)
    return []
  }
}


export const defaultRobot: AvatarOptions = {
  name: "",
  baseColor: "94E044",
  backgroundColor:"00D3DD",  
  eyes: "round",
  face: "square01",
  mouth: "grill02",
  sides: "square",
  texture: "dots",
  top: "lights"
}