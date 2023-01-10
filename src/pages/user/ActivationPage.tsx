import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import UserService from '@/services/UserService'
import { toast } from 'react-toastify'

const ActivationPage: FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	useEffect(() => {
		UserService.activateAccount(location.search)
			.then(() => toast.success('Successfully activated! Please login!'))
			.catch(() => toast.error('Fail activated'))
		navigate('/user/login')
	}, [])
	return (<></>)
}

export default ActivationPage
