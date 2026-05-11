import { Icon } from '@tabler/icons-react';

type Props = {
    role: string;
    description: string;
    icon: Icon
}

export default function RoleCardEduSchool({role, description, icon: Icon}: Props) {
    return (
        <div className=' w-full flex items-center gap-x-2 bg-gray-300 p-4 rounded-lg hover:bg-gray-300/80'>
            <div>
                <span className='p-4 flex items-center bg-blue-300 rounded-lg text-white'>
                    <Icon />
                </span>
            </div>
            <div>
                <p className='text-white text-lg font-semibold'>{role}</p>
                <span className='text-gray-600'>{description}</span>
            </div>
        </div>
    )
}
