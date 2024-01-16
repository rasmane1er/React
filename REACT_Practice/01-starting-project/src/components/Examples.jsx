import { useState } from "react";
import { EXAMPLES } from "../data";
import TabButton from "./TabButton";
import Section from "./Section";
import { Tabs } from "./Tabs";

export function Examples(){

    const [selectedTopic,setSelectedTopic]=useState();

    function handleSelect(selectedButton){
      setSelectedTopic(selectedButton);
      
    }
  
   let content="please select a Topic"
   if (selectedTopic){
    content=(<div id="tab-content">
    <h3>{EXAMPLES[selectedTopic].title}</h3>
    <p>{EXAMPLES[selectedTopic].description}</p>
    <pre>
      <code>
      {EXAMPLES[selectedTopic].code}
      </code>
    </pre>
    </div>);
   }
    return(
        <Section title="Examples" id="examples">
            <Tabs buttons={<>
          <TabButton isSelected={selectedTopic==="components"} onClick={()=>handleSelect("components")}>Components</TabButton>
          <TabButton isSelected={selectedTopic==="jsx"}        onClick={()=>handleSelect("jsx")}>JSX</TabButton>
          <TabButton isSelected={selectedTopic==="props"}      onClick={()=>handleSelect("props")}>Props</TabButton>
          <TabButton isSelected={selectedTopic==="state"}      onClick={()=>handleSelect("state")}>State</TabButton>
       
            </>}> 
            {content}
            </Tabs>
      </Section>
    );
}