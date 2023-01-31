import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useUserActivateQuery } from '@/store/api/user.api'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import Layout from '@/components/Layout'
import { useAppDispatch } from '@/hooks/useTypedSelector'
import { activateProfile } from '@/store/auth/auth.slice'

const ActivationPage: FC = () => {
	const { t } = useTranslation('user-activate')
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { isSuccess, isError, data } = useUserActivateQuery(location.search)
	useEffect(() => {
		if (isSuccess) {
			toast.success(t('succ_activate'))
			dispatch(activateProfile())
		} else if (isError) {
			toast.error(t('err_activate'))
		}
		navigate('/user/profile')
	}, [data])
	return (<Layout></Layout>)
}

export default ActivationPage
