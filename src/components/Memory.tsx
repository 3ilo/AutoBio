import { SubHeader, GenericWrapper, TextField, AlignmentType } from '../components/Commons';

import './styles/Memory.css';

export interface MemoryProps {
    title: string;
    content: string;
    date: Date;
    images?: Array<string>;
}

export default function Memory(props: MemoryProps) {
    return (
        <div className="memory"> 
            <SubHeader text={props.title} alignment={AlignmentType.CENTER} />
            <TextField text={props.date.toString()} alignment={AlignmentType.CENTER} />
            <GenericWrapper component={<>{props.content}</>} alignment={AlignmentType.CENTER}/>
            {props.images && <img src={props.images[0]}/>}
        </div>
    )
}