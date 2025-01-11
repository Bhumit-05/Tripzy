import React from 'react'
import Checkbox from '../../../Extra Components/Checkbox';

const ActivityCard = (Activity) => {

    Activity = Activity?.Activity;
    const date = new Date(Activity?.date);

    const formattedDate = date.toLocaleDateString("en-GB")

    return (
        <div className='w-[450px] h-20 border border-black text-xl flex items-center px-4 justify-between mb-10 rounded-lg hover:scale-105 hover:shadow-xl duration-300'>
            <p className='ml-4 font-normal'>{Activity?.activity}</p>
            <div className='mr-4'>{formattedDate}</div>
            <div className='mr-6'>
                <Checkbox />
            </div>
        </div>
    )
}

export default ActivityCard;