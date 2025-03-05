import { createContext} from "react"
import { AvatarOptions, AvatarList } from "./Types"
import { defaultRobot } from "./Services"


// Specific interface for the avatar context
interface AvatarContextType {
    avatarOptions: AvatarOptions
    setAvatarOptions:  React.Dispatch<React.SetStateAction<AvatarOptions>>;
}

// Created a specific interface for the avatar list context
// Includes additional properties for better state management
interface AvatarListContextType {
    avatarList: AvatarList;
    setAvatarList: React.Dispatch<React.SetStateAction<AvatarList>>;
    refreshList: () => void;
    isLoading?: boolean;
    error?: string | null;
  }

  // Context for the current avatar options
  export const AvatarContext = createContext<AvatarContextType>({
    avatarOptions: defaultRobot,
    setAvatarOptions: () => {}
  })
  

 // Context for the current avatar URL
  export const AvatarURLContext = createContext<string>("")
  
// context for avatar list
// includes loading state and error handling for better UX
  export const AvatarListContext = createContext<AvatarListContextType>({
    avatarList: [],
    setAvatarList: () => {},
    refreshList: () => {},
    isLoading: false,
    error: null
  })