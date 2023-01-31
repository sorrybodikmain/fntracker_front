import { FC, PropsWithChildren } from 'react'

const RecoveryMessage: FC<PropsWithChildren<{ message: string, color: string }>> = ({ message, color }) => {

	return (
		<div className={'block w-full my-1 py-1 rounded-2xl duration-500 text-white text-center ' + color}>
			{message}
		</div>
	)
}

export default RecoveryMessage
