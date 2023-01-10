import { FC, useState } from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'

const ScrollButton: FC = () => {
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop
		if (scrolled > 300) {
			setVisible(true)
		} else if (scrolled <= 300) {
			setVisible(false)
		}
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	window.addEventListener('scroll', toggleVisible)
	return (
		<>
			{
				visible ?
					<button className='fixed bottom-20 z-10 right-0 pr-5 text-white text-4xl hover:text-primary transition-all'>
						<FaArrowCircleUp onClick={scrollToTop} />
					</button>
					: null
			}
		</>

	)
}

export default ScrollButton
