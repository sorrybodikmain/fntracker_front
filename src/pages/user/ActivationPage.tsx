import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useUserActivateQuery } from '@/store/api/user.api'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ActivationPage: FC = () => {
	const {t} = useTranslation('user-activate')
	const location = useLocation()
	const navigate = useNavigate()
	const { isSuccess, isError } = useUserActivateQuery(location.search)
	useEffect(() => {
		if (isSuccess) {
			toast.success(t('succ_activate'))
			navigate('/user/profile')
		} else if (isError) {
			toast.error(t('err_activate'))
			navigate('/user/login')
		}

	}, [])
	return (<></>)
}

export default ActivationPage
