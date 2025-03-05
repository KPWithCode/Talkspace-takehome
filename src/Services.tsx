import { AvatarOptions, OverrideOption, CustomizationOptions } from './Types'


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
export const getAllAvatarsFromStorage = () => {
  try {
    const avatars = []
    const prefix = STORAGE_PREFIX
    
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i)
      if (key && key.startsWith(prefix)) {
        const rawData = window.localStorage.getItem(key)
        if (rawData) {
          const avatar = JSON.parse(rawData)
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

// options for customization: 
export const customizationOptions: CustomizationOptions[] = [
  { label: "Eyes",
    option: "eyes",
    values: [
      "eva",
      "frame1",
      "frame2",
      "glow",
      "happy",
      "hearts",
      "robocop",
      "round",
      "roundFrame01",
      "roundFrame02",
      "sensor",
      "shade01"
    ]
  },
  { label: "Face",
    option: "face",
    values: [
      "round01",
      "round02",
      "square01",
      "square02",
      "square03",
      "square04"
    ]
  },
  { label: "Mouth",
    option: "mouth",
    values: [
      "bite",
      "diagram",
      "grill01",
      "grill02",
      "grill03",
      "smile01",
      "smile02",
      "square01",
      "square02"
    ]
  },
  { label: "Sides",
    option: "sides",
    values: [
      "antenna01",
      "antenna02",
      "cables01",
      "cables02",
      "round",
      "square",
      "squareAssymetric" 
    ]
  },
  // this actually doesn't seem to work from the API
  // { label: "Texture",
  //   option:"texture",
  //   values: [
  //     "camo01",
  //     "camo02",
  //     "circuits",
  //     "dirty01",
  //     "dirty02",
  //     "dots",
  //     "grunge01",
  //     "grunge02" 
  //   ]
  // },
  { label: "Top",
    option:"top",
    values: [
      "antenna",
      "antennaCrooked",
      "bulb01",
      "glowingBulb01",
      "glowingBulb02",
      "horns",
      "lights",
      "pyramid",
      "radar"
    ]
  }
]

// color palette
export const COLOR_PALETTE = [
  "FFFFFF",
  "C4C4C4",
  "888888",
  "555555",
  /*"#222222",*/
  "000000",
  "006600",
  /*"#22B14C",*/
  "02BE01",
  "51E119",
  "94E044",
  "FBFF5B",
  "E5D900",
  "E6BE0C",
  "E59500",
  "A06A42",
  "99530D",
  "633C1F",
  "6B0000",
  "9F0000",
  "E50000",
  "BB4F00",
  "FF755F",
  "FFC49F",
  "FFDFCC",
  "FFA7D1",
  "CF6EE4",
  "EC08EC",
  "820080",
  "FF3904",
  "020763",
  "0000EA",
  /*"#044BFF",*/
  "6583CF",
  "36BAFF",
  "0083C7",
  "00D3DD",
  "45FFC8",
  "5100FF",
]