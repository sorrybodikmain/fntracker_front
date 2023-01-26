import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useUserActivateQuery } from '@/store/api/user.api'
import { toast } from 'react-toastify'

const ActivationPage: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { isSuccess, isError } = useUserActivateQuery(location.search)
	useEffect(() => {
		if (isSuccess) {
			toast.success('Successfully activated! Please login!')
			navigate('/user/profile')
		} else if (isError) {
			toast.error('Fail activated')
			navigate('/user/profile')
		}

	}, [])
	return (<></>)
}

export default ActivationPage
