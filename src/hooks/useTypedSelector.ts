import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'

import { AppDispatch, TypeRootState } from '@/store'
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
