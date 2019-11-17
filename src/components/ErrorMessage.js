import React from 'react'

export default function ErrorMessage(props) {
  return (
    <div className='warning-txt'>
      <p>Please correct input using the following formats: <br />
      <span>CITYNAME</span> - <span>OTHERCITYNAME</span><br />
      cities from <span>CITYNAME</span> in <span>#</span> jumps<br />
      can I teleport from <span>CITYNAME</span> to <span>OTHERCITYNAME</span><br />
      loop possible from <span>CITYNAME</span><br /><br />
      error line was [{props.errorLine}]
      </p>
    </div>
  )
}