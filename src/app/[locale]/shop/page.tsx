import { getLocale, getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { pageTitle } from '@/config/site'
import { ShopBanner } from '@/components/shop/ShopBanner'
import { ShopSection } from '@/components/shop/ShopSection'
import { PageContainer } from '@/components/ui/PageContainer'
import { getShop } from '@/lib/api/fortnite'

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('shop')
    return {
        title: pageTitle(t('title')),
        description: t('banner_title')
    }
}

export default async function ShopPage() {
    const locale = await getLocale()
    const shop = await getShop(locale)
    const sectionIds = [
        ...new Set(shop.entries.map(entry => entry.layout?.id ?? entry.layoutId))
    ]

    return (
        <div>
            <PageContainer>
                <ShopBanner />
                {sectionIds.map(id => (
                    <ShopSection key={id} entries={shop.entries} sectionId={id} />
                ))}
            </PageContainer>
        </div>
    )
}
