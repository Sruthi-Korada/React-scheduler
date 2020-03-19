import React from "react";
import classnames from "classnames";
import "components/InterviewerListItem.scss";
export default function InterviewerListItem (props) {
    const InterviewerListItemClass = classnames("interviewers__item", {
        "interviewers__item--selected": props.selected
      });
    return (
        <li 
        className= {InterviewerListItemClass}
        key={props.id}
      onClick={props.setInterviewer}
      >
  <img
    className="interviewers__item-image"
    src={props.avatar}
     alt={props.name}
  />
  {props.name}
</li>
    )
}