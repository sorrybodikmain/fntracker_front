import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useUserActivateQuery } from '@/store/api/user.api'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/hooks/useTypedSelector'
import { activateProfile } from '@/store/auth/auth.slice'

const ActivationPage: FC = () => {
	const { t } = useTranslation('user-activate')
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { data } = useUserActivateQuery(location.search)
	useEffect(() => {
		dispatch(activateProfile())
		toast.success(t('succ_activate'))
		navigate('/user/profile')
	}, [data])
	return (<div></div>)
}

export default ActivationPage
