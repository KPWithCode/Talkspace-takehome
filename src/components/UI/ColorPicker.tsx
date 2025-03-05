import { useState } from 'react'
import { useContext } from 'react'
import { AvatarContext } from '../../context'
import { COLOR_PALETTE } from '../../config/avatarOptions'
import '../../styles/UI/colorPicker.css'

interface Props {
  label: string;
  defaultColor: string; 
  optionKey: string;
}

const ColorPicker = (props: Props) => {
  const {label, defaultColor, optionKey} = props; 
  const {avatarOptions, setAvatarOptions} = useContext(AvatarContext)
  const [showPicker, setShowPicker] = useState(false)
  const palette = COLOR_PALETTE
  
  const handleOnClick = (optionKey:string, color: string) => {
    const _O = {...avatarOptions}
    _O[optionKey] = color
    setAvatarOptions(_O)
  }
  
  return (
    <>
      <div className="color_picker_container">
        <div 
          className="current_selection" 
          style={{ backgroundColor: defaultColor }}
          onClick={() => setShowPicker(true)}
          ></div>
        { showPicker &&
          <div 
            className="color_palette"
            onMouseLeave={() => setShowPicker(false)}
          >
            { 
              palette.map((color:string, i: number) => {
                return (
                  <div 
                    key={`color_${i}`} style={{backgroundColor: `#${color}`}}
                    onClick = {() => {handleOnClick(optionKey, color)}}
                    >
                  </div>
                )
              })
            }
          </div>
        }
        <div className="color_picker_label">{label}</div>
      </div>
    
    </>
  ) 
}

export default ColorPicker