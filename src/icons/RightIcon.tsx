import React from 'react'


interface RightIconProps {
  cardId: string,
  onItemEdit(cardId: string): void
}

const RightIcon: React.FC<RightIconProps> = (props: RightIconProps) => {


  const handleOnClick = () => {
    props.onItemEdit(props.cardId);
  }


  return ( 
    <div className="my-auto" id={props.cardId} onClick={handleOnClick}>
      <svg height="16"  className="my-auto"  fill="#00bfff" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 335.765 335.765" xmlSpace="preserve" stroke="#00bfff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="311.757,41.803 107.573,245.96 23.986,162.364 0,186.393 107.573,293.962 335.765,65.795 "></polygon> </g> </g> </g></svg>
    </div>
  )
}

export default RightIcon
