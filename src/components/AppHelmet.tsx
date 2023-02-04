import { FC, PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet-async'

interface ICustomHelmetProps {
	title: string,
	desc?: string,
	img?: string
}

const AppHelmet: FC<PropsWithChildren<
	ICustomHelmetProps
>> = ({ img, desc, title }) => {
	const defaultImg = 'public/images/icons/icon-384x384.png'
	return (
		<Helmet>
			<title>{title} | FNTracker</title>
			<meta property='og:title' content={title} />
			<meta name='twitter:image' content={img || defaultImg} />
			<meta property='og:image' content={img || defaultImg} />
			{desc && <>
				<meta name='description' content={desc} />
				<meta property='og:description' content={desc} />
			</>
			}
			<meta property='og:type' content='website' />
			<meta property='og:site_name' content='FNTracker' />
			<meta property='og:image:width' content='1280' />
			<meta property='og:image:height' content='720' />
			<meta name='twitter:card' content='summary_large_image' />

		</Helmet>
	)
}

export default AppHelmet
