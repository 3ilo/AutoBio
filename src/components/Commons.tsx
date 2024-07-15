import './styles/Commons.css'
import { ReactNode, HTMLInputTypeAttribute, ChangeEventHandler } from 'react'

enum AlignmentType {
    LEFT = "Left",
    RIGHT = "Right",
    CENTER = "Center"
}

interface CommonComponentProps { 
    className?: string,
    alignment?: AlignmentType
}

interface SectionHeaderProps extends CommonComponentProps {
    text: string
}

interface SubHeaderProps extends CommonComponentProps {
    text: string
}

interface TextFieldProps extends CommonComponentProps {
    text: string
}

interface InputFieldProps extends CommonComponentProps {
    type: HTMLInputTypeAttribute;
    value: string;
    name?: string | undefined;
    placeholder?: string | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    required?: boolean | undefined;
}

interface CustomButtonProps extends CommonComponentProps {
    onClick: () => void;
    text: string;
    name?: string;
}

interface GenericWrapperProps extends CommonComponentProps {
    component: ReactNode
}

const SectionHeader = (props: SectionHeaderProps) => {
    return (
        <h1 className={`${ props.className } header alignment${props.alignment}`}>
            {props.text}
        </h1>
    );
}

const SubHeader = (props: SubHeaderProps) => {
    return (
        <h3 className={`${ props.className } subheader alignment${props.alignment}`}>
            {props.text}
        </h3>
    );
}

const TextField = (props: TextFieldProps) => {
    return (
        <p className={`${ props.className } text alignment${props.alignment}`}> 
            {props.text}
        </p>
    )
}

const InputField = (props: InputFieldProps) => {
    return (
        <input 
            className={`${ props.className } text alignment${props.alignment}`}
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            required={props.required}
        />
    )
}

const CustomButton = (props: CustomButtonProps) => {
    return (
        <button 
            className={`${ props.className } text alignment${props.alignment}`}
            name={props.name}    
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

const GenericWrapper = (props: GenericWrapperProps) => {
    return (
        <p className={`${ props.className } generic alignment${props.alignment}`}> 
            {props.component}
        </p>
    )
}

export { SectionHeader, SubHeader, TextField, InputField, GenericWrapper, AlignmentType, CustomButton };
export type { SectionHeaderProps, SubHeaderProps, TextFieldProps, InputFieldProps, GenericWrapperProps, CustomButtonProps }