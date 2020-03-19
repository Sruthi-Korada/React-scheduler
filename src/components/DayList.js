import React from "react";
import DayListItem from "components/DayListItem"
export default function DayList(props) {
    let ListItems = props.days.map((day) => 
    <DayListItem 
      key={day.id} 
      selected={day.name === props.day} 
      setDay={props.setDay} 
      name={day.name} 
      spots={day.spots}/>)
    return (<ul>{ListItems}</ul>);
  }