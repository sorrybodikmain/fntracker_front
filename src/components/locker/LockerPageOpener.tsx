'use client'

import { useEffect } from 'react'
import { useCosmeticModalStore } from '@/stores/use-cosmetic-modal-store'

interface LockerPageOpenerProps {
	id: string
}

export function LockerPageOpener({ id }: LockerPageOpenerProps) {
	const open = useCosmeticModalStore(s => s.open)

	useEffect(() => {
		open(id)
	}, [id, open])

	return null
}
