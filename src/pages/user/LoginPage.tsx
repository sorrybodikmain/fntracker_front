import { FC } from 'react'
import Layout from '@/components/Layout'
import LoginForm from '@/components/user/LoginForm'

const LoginPage: FC = () => {

	return (
		<Layout>
			<div className={'min-h-screen'}>
				<LoginForm />
			</div>
		</Layout>
	)
}

export default LoginPage
