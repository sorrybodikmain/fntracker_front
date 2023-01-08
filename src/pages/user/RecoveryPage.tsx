import { FC } from 'react'
import Layout from '@/components/Layout'
import RecoveryForms from '@/components/user/recovery/RecoveryForms'

const RecoveryPage: FC = () => {

	return (
		<Layout>
			<div className={'min-h-screen'}>
				<RecoveryForms />
			</div>
		</Layout>
	)
}

export default RecoveryPage
