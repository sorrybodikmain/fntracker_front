import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'fortniteapi.io' },
			{ protocol: 'https', hostname: 'media.fortniteapi.io' },
			{ protocol: 'https', hostname: 'fntracker.pp.ua' }
		]
	}
}

export default withNextIntl(nextConfig)
