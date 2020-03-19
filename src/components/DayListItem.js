import React from "react";
import classnames from 'classnames';
import "components/DayListItem.scss";
export default function DayListItem(props) {
    const DayClass = classnames("day-list__item", {
      "day-list__item--selected": props.selected,
      "day-list__item--full": props.spots === 0
    });
    let formatSpots = "";
    if (props.spots > 1) {
        formatSpots = `${props.spots} spots remaining`
    } else if (props.spots === 1) {
        formatSpots = `1 spot remaining`
    } else if (props.spots < 1) {
        formatSpots = `no spots remaining`
    }
    return (
      <li
        name={props.name}
        className={DayClass}
        spots={props.spots}
        onClick={() => props.setDay(props.name)}
      >
        <h2>{props.name}</h2>
       <h3>{formatSpots}</h3>
      </li>
    );
  }