import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { rootActions } from '@/store/root-actions'

export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(rootActions, dispatch)
}
