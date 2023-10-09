import transformerCompileClass from '@unocss/transformer-compile-class'
import { defineConfig } from 'unocss'

export default defineConfig({
	transformers: [transformerCompileClass({ classPrefix: 'fntracker-' })],
	theme: {
		colors: {
			primary: '#4F75FB',
			gray: {
				400: '#9898ad',
				500: '#a1a1a1',
				600: '#3C3C3C',
				700: '#575757',
				800: '#353340',
				900: '#151515'
			}
		},
		fontSize: {
			xs: '.9rem',
			sm: '1rem',
			tiny: '1.2rem',
			base: '1.4rem',
			lg: '1.5rem',
			xl: '1.6rem',
			'2xl': '1.75rem',
			'3xl': '1.9rem',
			'4xl': '2.4rem',
			'5xl': '3.5rem',
			'6xl': '4.5rem',
			'7xl': '5.5rem'
		}
	}
})