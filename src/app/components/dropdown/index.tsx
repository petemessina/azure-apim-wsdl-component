import { FunctionComponent, ChangeEventHandler } from 'react'

export type DropDownOption = {
    label: string
    value: string
}

type DropDownProps = {
    label: string
    value: string
    options: Array<DropDownOption>
    onChange: ChangeEventHandler
}
  
const Dropdown: FunctionComponent<DropDownProps> = (props: DropDownProps) => {
    return (
      <span>
        <label>     
          {props.label}
        </label>
        <select className="form-control" value={props.value} onChange={props.onChange}>
          {props.options.map((option) => (     
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}     
        </select>
      </span> 
    );
}

export default Dropdown