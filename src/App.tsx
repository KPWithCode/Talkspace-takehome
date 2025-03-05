import "./styles/App.css";
import AvatarPreview from "./components/AvatarPreview";
import OptionsPicker from "./components/OptionsPicker";
import ColorPicker from "./components/UI/ColorPicker";
import TextInput from "./components/UI/TextInput";
import { useCallback, useState } from "react";
import { useAvatarList } from "./Hooks";
import { AvatarContext, AvatarURLContext, AvatarListContext } from "./context";
import {
  buildURL,
  defaultRobot,
  saveAvatarToStorage,
  deleteAvatarFromStorage,
} from "./Services";
import RobotListItem from "./components/RobotListItem";
import SaveButton from "./components/UI/SaveButton";
import { AvatarOptions } from "./Types";

function App() {
  const [avatarOptions, setAvatarOptions] = useState(defaultRobot);
  const [isEditing, setIsEditing] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const { avatarList, isLoading, error, loadAvatars, addAvatar, removeAvatar } =
    useAvatarList();

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _O = { ...avatarOptions };
    _O.name = e.target.value;
    setAvatarOptions(_O);
  };

  const deleteAvatar = useCallback(
    (key: string, name: string) => {
      try {
        const success = deleteAvatarFromStorage(key);

        if (success) {
          removeAvatar(key);
          console.log(`${name} has been deleted`);
        } else {
          console.error("Failed to delete robot");
        }
      } catch (error) {
        console.error("An unexpected error occurred", error);
      }
    },
    [removeAvatar]
  );


  const saveAvatar = useCallback(() => {
    try {
      const name = avatarOptions.name.trim();

      if (name === "") {
        console.error("Please provide a name for your robot");
        return;
      }

      const url = buildURL(avatarOptions);

      if (isEditing && editingKey) {
        // We're updating an existing avatar
        const success = deleteAvatarFromStorage(editingKey); // Remove old version

        if (success) {
          const newKey = saveAvatarToStorage(name, url); // Save updated version

          if (newKey) {
            // Update list
            removeAvatar(editingKey);
            addAvatar(newKey, url, name);

            // Reset editing state
            setIsEditing(false);
            setEditingKey(null);
            setAvatarOptions(defaultRobot);

            console.log(`${name} has been updated!`);
          } else {
            console.error("Failed to update robot");
          }
        } else {
          console.error("Failed to delete old version of robot");
        }
      } else {
        // Creating a new avatar
        const key = saveAvatarToStorage(name, url);

        if (key) {
          addAvatar(key, url, name);
          setAvatarOptions(defaultRobot); // Reset to default
          console.log(`${name} has been saved!`);
        } else {
          console.error("Failed to save robot");
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred", error);
    }
  }, [avatarOptions, addAvatar, removeAvatar, isEditing, editingKey]);

  const editAvatar = useCallback((key: string, url: string, name: string) => {
    try {
      // Parse URL to extract parameters
      const parseUrlParams = (url: string): Partial<AvatarOptions> => {
        try {
          // Extract query string part
          const queryString = url.split("?")[1];
          if (!queryString) return {};
  
          // Parse parameters
          const params = new URLSearchParams(queryString);
          const options: Partial<AvatarOptions> = {};
  
          // Map recognized parameters to our options structure
          if (params.get("baseColor"))
            options.baseColor = params.get("baseColor") || "";
          if (params.get("backgroundColor"))
            options.backgroundColor = params.get("backgroundColor") || "";
          if (params.get("eyes")) options.eyes = params.get("eyes") || "";
          if (params.get("face")) options.face = params.get("face") || "";
          if (params.get("mouth")) options.mouth = params.get("mouth") || "";
          if (params.get("sides")) options.sides = params.get("sides") || "";
          if (params.get("texture"))
            options.texture = params.get("texture") || "";
          if (params.get("top")) options.top = params.get("top") || "";
  
          return options;
        } catch (error) {
          console.error("Error parsing URL parameters:", error);
          return {};
        }
      };
  
      const options = parseUrlParams(url);
  
      if (Object.keys(options).length > 0) {
        // Create a complete avatar options object
        const editedOptions: AvatarOptions = {
          ...defaultRobot, // Use defaults for any missing properties
          ...options,
          name, // Set the name from the saved avatar
        };
  
        setAvatarOptions(editedOptions);
        setIsEditing(true); // Set editing mode
        setEditingKey(key); // Store the key of the avatar being edited
        console.log(`Editing ${name}`);
      } else {
        console.error(`Could not parse options for ${name}`);
      }
    } catch (error) {
      console.error("Error editing avatar:", error);
    }
  }, []);

  return (
    <div className="app_container">
      <AvatarContext.Provider value = {{avatarOptions, setAvatarOptions}}>
        <AvatarURLContext.Provider value = {buildURL(avatarOptions)}>
          <AvatarListContext.Provider value={{
              avatarList,
              setAvatarList: () => loadAvatars(),
              refreshList: loadAvatars,
              isLoading,
              error,
            }}>
            <div className="main">
              <div className="avatar_creator">
                <SaveButton
                  disabled={!avatarOptions.name.trim()}
                  handleOnClick={saveAvatar}
                >
                  {isEditing ? "✓" : "+"}
                </SaveButton>

                {isEditing && (
                  <button
                    className="cancel-edit-button"
                    onClick={() => {
                      setIsEditing(false);
                      setEditingKey(null);
                      setAvatarOptions(defaultRobot);
                    }}
                  >
                    Cancel
                  </button>
                )}
                <AvatarPreview />

                <div className="row">
                  <TextInput
                    label=""
                    value={avatarOptions.name}
                    name="avatar_name"
                    placeholder="Name Me!"
                    handleOnChange={updateName}
                    avatarName={""}
                  />
                </div>

                <div className="row">
                  <ColorPicker
                    label="Color"
                    defaultColor={`#${avatarOptions.baseColor}`}
                    optionKey="baseColor"
                  />
                  <ColorPicker
                    label="Background"
                    defaultColor={`#${avatarOptions.backgroundColor}`}
                    optionKey="backgroundColor"
                  />
                </div>

                <OptionsPicker />
              </div>

              <div className="avatar_list">
                <h2>Your Robots</h2>
                {isLoading ? (
                  <p>Loading your robots...</p>
                ) : error ? (
                  <p className="error">Error: {error}</p>
                ) : avatarList.length === 0 ? (
                  <p>No robots saved yet. Create your first one!</p>
                ) : (
                  <ul>
                    {avatarList.map((avatar) => (
                      <RobotListItem
                        key={avatar.key}
                        keyName={avatar.key}
                        name={avatar.name}
                        url={avatar.URL}
                        onDelete={() => deleteAvatar(avatar.key, avatar.name)}
                        onEdit={() =>
                          editAvatar(avatar.key, avatar.URL, avatar.name)
                        }
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </AvatarListContext.Provider>  
        </AvatarURLContext.Provider>
      </AvatarContext.Provider>
    </div>
  )
}

export default App
