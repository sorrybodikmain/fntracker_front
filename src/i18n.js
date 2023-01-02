import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const apiKey = 'jundBoxlgHInslZrJ_YM4A'
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`

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
				maxAge: 24 * 60 * 60 * 365
			}
		},
		ns: ['home', 'shop', 'header', 'footer'],
		defaultNS: 'home',
		supportedLngs: ['ru', 'de', 'es', 'fr', 'it', 'pl', 'en'],
		backend: {
			loadPath: loadPath
		}
	})
export default i18next