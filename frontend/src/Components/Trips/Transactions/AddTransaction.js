import React from 'react'

const AddTransaction = () => {
  return (
    <div>
        <form 
        onSubmit={(e) => e.preventDefault()}
        className='w-80 h-60 border-2 border-gray-500 rounded-xl'>
            <input type='text' placeholder=''></input>
      </form>
    </div>
  )
}

export default AddTransaction;