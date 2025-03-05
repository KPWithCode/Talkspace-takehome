import { createContext} from "react"
import { AvatarOptions, AvatarList } from "./Types"
import { defaultRobot } from "./Services"

interface AvatarContextType {
    avatarOptions: AvatarOptions
    setAvatarOptions:  React.Dispatch<React.SetStateAction<AvatarOptions>>;
}

interface AvatarListContextType {
    avatarList: AvatarList;
    setAvatarList: React.Dispatch<React.SetStateAction<AvatarList>>;
    refreshList: () => void;
    isLoading?: boolean;
    error?: string | null;
  }
  
  export const AvatarContext = createContext<AvatarContextType>({
    avatarOptions: defaultRobot,
    setAvatarOptions: () => {}
  })
  
  export const AvatarURLContext = createContext<string>("")
  
  export const AvatarListContext = createContext<AvatarListContextType>({
    avatarList: [],
    setAvatarList: () => {},
    refreshList: () => {},
    isLoading: false,
    error: null
  })