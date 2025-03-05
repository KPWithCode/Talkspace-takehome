import '../styles/optionsPicker.css'
import TabBar from './UI/TabBar'
import { TabData, OverrideOption } from '../Types'
import { customizationOptions } from '../Services'
import { useMemo, useState } from 'react'
import { buildURL } from '../Services'
import { useContext } from 'react'
import { AvatarContext } from '../context'



const OptionsPicker = () => {
  const {avatarOptions, setAvatarOptions} = useContext(AvatarContext)
  const [activeTab, setActiveTab] = useState<string>(customizationOptions[0].option)
  
  // Create tab data for the TabBar component
  const tabData: TabData[] = useMemo(() => {
    return customizationOptions.map((option) => ({
      label: option.label,
      option: option.option
    }))
  }, [])
  
  // Get the available options for the active tab
  const displayOptions = useMemo(() => {
    const option = customizationOptions.find(opt => opt.option === activeTab)
    return option ? option.values : []
  }, [activeTab])


  const handleTabClick = (option?: string) => {
    if (option) {
      setActiveTab(option)
    }
  }

  // Update avatar with selected option
  const updateAvatar = (optKey: string, value: string) => {
    // Type guard to ensure optKey is a valid AvatarOptionKey
    const isValidKey = (key: string): key is OverrideOption['name'] => {
      return key === 'name' || 
             key === 'backgroundColor' || 
             key === 'baseColor' || 
             key === 'eyes' || 
             key === 'face' || 
             key === 'mouth' || 
             key === 'sides' || 
             key === 'texture' || 
             key === 'top'
    }
    
    if (isValidKey(optKey)) {
      const updatedOptions = {...avatarOptions}
      updatedOptions[optKey] = value
      setAvatarOptions(updatedOptions)
    }
  }

  return (
    <div className="options_picker_container">
      <TabBar
        tabData={tabData}
        handleOnClick={handleTabClick}
      />
      
      <div className="options_examples" role="listbox" aria-label={`${activeTab} options`}>
        {displayOptions.map((opt, i) => (
          <div
            key={`opt_${activeTab}_${i}`}
            className="option_selection"
            role="option"
            aria-selected={avatarOptions[activeTab as keyof typeof avatarOptions] === opt}
            tabIndex={0}
            onClick={() => updateAvatar(activeTab, opt)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                updateAvatar(activeTab, opt)
              }
            }}
          >
            <img
              src={buildURL(avatarOptions, {name: activeTab as OverrideOption['name'], value: opt})}
              alt={`${activeTab} option: ${opt}`}
            />
          </div>
        ))}
      </div>
    </div>  
  )
}

export default OptionsPicker