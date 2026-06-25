'use client'

import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence } from 'motion/react'
import { useCosmeticModalStore } from '@/stores/use-cosmetic-modal-store'
import { CosmeticDetailModal } from './CosmeticDetailModal'

export function CosmeticModalHost() {
	const router = useRouter()
	const pathname = usePathname()
	const { cosmeticId, isOpen, close, clear } = useCosmeticModalStore()

	const handleClose = useCallback(() => {
		close()
		if (pathname.includes('/locker/')) {
			router.push('/shop')
		}
	}, [close, pathname, router])

	return (
		<AnimatePresence mode='popLayout' onExitComplete={clear}>
			{isOpen && cosmeticId ? (
				<CosmeticDetailModal
					key={cosmeticId}
					cosmeticId={cosmeticId}
					onClose={handleClose}
				/>
			) : null}
		</AnimatePresence>
	)
}
