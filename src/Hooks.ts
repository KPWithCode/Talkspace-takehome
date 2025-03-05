import { AvatarList, AvatarListItem } from './Types'
import { useState, useEffect } from 'react'
import { getAllAvatarsFromStorage, STORAGE_PREFIX } from './Services'

export const useAvatarList = () => {
  const [avatarList, setAvatarList] = useState<AvatarList>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAvatars()
  }, [])

// loading avatars from localstorage
  const loadAvatars = () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const avatars = getAllAvatarsFromStorage()
      setAvatarList(avatars)
    } catch (err) {
      setError('Failed to load avatars')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // Add a new avatar to the list
  const addAvatar = (key: string, url: string, name: string) => {
    const newAvatar: AvatarListItem = { key, URL: url, name }
    setAvatarList((prev) => [...prev, newAvatar])
  }

  // Remove an avatar from the list
  const removeAvatar = (key: string) => {
    setAvatarList((prev) => prev.filter(avatar => avatar.key !== key))
  }

  // storage event listener for multi-tab support
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === null || e.key.startsWith(STORAGE_PREFIX)) {
        // If the storage was cleared or any robot avatar was modified update list
        loadAvatars()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return {
    avatarList,
    isLoading,
    error,
    loadAvatars,
    addAvatar,
    removeAvatar
  }
}