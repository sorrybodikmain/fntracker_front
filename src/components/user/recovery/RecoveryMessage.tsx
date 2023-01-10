import { FC, PropsWithChildren } from 'react'

const RecoveryMessage: FC<PropsWithChildren<{ message: string, color: string }>> = ({ message, color }) => {

	return (
		<div className={'block w-full mt-3 py-1 rounded-2xl duration-500 text-white mb-2 text-center ' + color}>
			{message}
		</div>
	)
}

export default RecoveryMessage
