import { FC } from 'react'
import Layout from '@/components/Layout'
import RegisterForm from '@/components/user/RegisterForm'

const RegisterPage: FC = () => {

	return (
		<Layout>
			<div className={'min-h-screen'}>
				<RegisterForm />
			</div>
		</Layout>
	)
}

export default RegisterPage
