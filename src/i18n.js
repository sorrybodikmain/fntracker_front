import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18next
	.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		detection: {
			lookupCookie: 'fntracker-locale',
			caches: ['cookie'],
			cookieOptions: {
				path: '/',
				maxAge: 24 * 60 * 60 * 365
			}
		},
		ns: ['home', 'shop', 'header', 'footer', 'locker',
			'stats', 'cookie-banner', 'user-auth', 'user-recovery',
			'user-profile', 'user-activate'],
		defaultNS: 'home',
		supportedLngs: ['de', 'es', 'fr', 'it', 'pl', 'en', 'ru'],
		backend: {
			loadPath: '/translations/{{lng}}/{{ns}}.json'
		}
	})
export default i18next