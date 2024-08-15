import './styles/Memories.css';
import Memory, { MemoryProps } from '../components/Memory'
import { AlignmentType, SectionHeader, CustomButton } from '../components/Commons';
import { useState, useEffect } from "react";
import { getMemories } from '../services/memoriesService'

export default function Memories() {

    const [savedMemories, setSavedMemories] = useState<MemoryProps[]>([])

    useEffect(() => {
      getMemories().then(res => { 
        if (res.status === 200) {
          res.json().then((data) => {
            try{
                setSavedMemories(data.map((memPayload: any) => {return {title: memPayload.title, content: memPayload.contents, date: memPayload.date, images: memPayload.images}}))
            } catch(err) {
              console.error(err)
              const error = new Error(res.statusText);
              throw error;
            }
          })
        } else if (res.status == 401) {
            window.location.href = "/login";
        } else {
          const error = new Error(res.statusText);
          throw error;
        }
      }).catch(err => {
        console.error(err);
        window.location.href = "/";
        return <></>
      });
    }, []);
  
    const [page, setPage] = useState(0);

    const onNextPageClick = () => {
        if (page + 1 >= savedMemories.length) {
            setPage(0)
        }
        else {
            setPage(page+1)
        }
    }
    const onPrevPageClick = () => {
        if (page - 1 < 0) {
            setPage(savedMemories.length - 1)
        }
        else {
            setPage(page-1)
        }
    }

    const tOverview = "Your memories"

    const memoriesList = savedMemories.map((memoryProps) => 
        <Memory 
            title={memoryProps.title} 
            content={memoryProps.content} 
            date={memoryProps.date}
            images={memoryProps.images}/>
        )

    return (
      <div className="memories">
        <SectionHeader className={"description"} text={tOverview} 
            alignment={AlignmentType.CENTER}/>
        {memoriesList[page]}
        <div className={"row"}>
            <CustomButton className={"goBackButton"} text={"Go back"} alignment={AlignmentType.LEFT} onClick={onPrevPageClick}/>
            <CustomButton className={"goForwardButton"} text={"Next"} alignment={AlignmentType.RIGHT} onClick={onNextPageClick}/>
        </div>
      </div>
    );
}
  