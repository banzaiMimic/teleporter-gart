import React from 'react'

export default function ErrorMessage(props) {
  return (
    <div className='warning-txt'>
      <p>Please correct input using the following formats: <br />
      <span>CITYX</span> - <span>CITYZ</span><br />
      cities from <span>CITYX</span> in <span>#</span> jumps<br />
      can I teleport from <span>CITYX</span> to <span>CITYZ</span><br />
      loop possible from <span>CITYX</span><br /><br />
      error line was [{props.errorLine}]
      </p>
    </div>
  )
}