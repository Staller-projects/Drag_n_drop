import React, { useMemo, useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import {
  editItemToStroage,
  nullFunction,
  deleteStateType,
  findDiffOfGivenDateAndToday,
} from "../utils/LocalStorage";
import RightIcon from "../icons/RightIcon";
import ClockIcon from "../icons/ClockIcon";
import ClockRedIcon from "../icons/ClockRedIcon";
import { Tooltip } from "@mui/material";

interface CardProps {
  id: string;
  title: string;
  cardItem: string;
  className: string;
  completeState: boolean;
  setDeleteCard(deleteCardOpsData: deleteStateType): void;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const [editState, setEditState] = useState(false);
  const [editedValue, setEditedValue] = useState(props.title);
  // eslint-disable-next-line
  // const [color, setColor] = useState(
  //   findDiffOfGivenDateAndToday(JSON.parse(props.cardItem).completeTill) >= 1
  //     ? "green"
  //     : "red"
  // );

  // const { completeTill } = JSON.parse(props.cardItem);
  // const color =
  //   findDiffOfGivenDateAndToday(completeTill) >= 1 ? "green" : "red";

  const color = useMemo(() => {
    return findDiffOfGivenDateAndToday(
      JSON.parse(props.cardItem).completeTill
    ) >= 1
      ? "green"
      : "red";
  }, [props.cardItem]);

  const handleDragStart = (e: React.DragEvent, cardItem: string) => {
    e.dataTransfer.setData("cardDataToBeTransferred", `${cardItem}`);
  };

  const handleOnDoubleClick = (e: React.MouseEvent<HTMLInputElement>) =>
    setEditState(true);

  const handleDeleteCarditem = (cardId: string) => {
    props.setDeleteCard({ state: true, cardId: cardId });
  };

  const handleEditCarditem = (cardId: string) => {
    editItemToStroage(cardId, editedValue);
    setEditState(false);
  };

  return (
    <div
      id={`itemCard${props.id}`}
      draggable
      role={"none"}
      onDragStart={(e) => handleDragStart(e, props.cardItem)}
      className={` p-2 my-3 flex flex-col justify-start  hover:border-[1px] hover:border-slate-500 border border-gray-200 rounded-lg shadow-lg dark:shadow-slate-900 shadow-slate-300 bg-lighter dark:border-gray-700`}
    >
      <div className="flex justify-between">
        <Tooltip title="Double click to edit this" placement="bottom">
          <div
            className="w-full mr-1"
            role="none"
            onDoubleClick={
              props.completeState ? nullFunction : handleOnDoubleClick
            }
          >
            <input
              type="text"
              disabled={!editState ? true : false}
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className={`${
                props.className
              } py-2 px-2 block w-full text-lg hover:cursor-text font-medium font-kalam !opacity-[1] outline-none rounded-lg dark:text-primary  disabled:opacity-50 disabled:pointer-events-none ${
                !editState
                  ? ""
                  : "dark:bg-primary/40 backdrop-blur-lg dark:text-white"
              }`}
            />
          </div>
        </Tooltip>

        <div className="flex justify-between gap-2">
          {editState ? (
            <RightIcon cardId={props.id} onItemEdit={handleEditCarditem} />
          ) : null}

          <DeleteIcon cardId={props.id} onItemDelete={handleDeleteCarditem} />
        </div>
      </div>

      <span
        className={`text-${color === "green" ? "green" : "red"}-500 bg-${
          color === "green" ? "green" : "red"
        }-500/15 font-bold text-xs flex justify-start w-fit  py-1 px-2 rounded-md`}
        // style={{ color: `${color}-500`, backgroundColor: `${color}-500/15` }}
      >
        {color === "green" ? <ClockIcon /> : <ClockRedIcon />}
        {JSON.parse(props.cardItem).completeTill}
      </span>
    </div>
  );
};

export default Card;
