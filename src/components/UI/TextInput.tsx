import '../../styles/UI/textinput.css'

interface Props {
  name: string;
  label: string;
  avatarName: string
  placeholder?: string; 
  className?: string;
  value: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

const TextInput = (props: Props) => {
  const { 
    name,
    label,
    placeholder,
    className,
    value,
    handleOnChange } = props

  return (
    <>
      <label>
        {label}
        <input 
          name={name}
          value={value}
          className={className ? className: ""}
          type="Text"
          placeholder={placeholder ? placeholder : ""}
          onChange={handleOnChange}
          maxLength={25}
        />
      </label>
    </>
  )
}

export default TextInput