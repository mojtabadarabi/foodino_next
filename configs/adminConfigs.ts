import { SideBarItems } from "@/app/types/food"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { appRoutes } from "./routes"

export function AdminConfigs() {
    const { t } = useTranslation('common')
    const { pathname } = useRouter()
    const getSideBarItems = (): SideBarItems[] => {

        return [
            {
                title: t('dashboard'),
                href: appRoutes.dashboard.href,
                isActive: pathname == appRoutes.dashboard.href || pathname == appRoutes.createRestaurant.href
            }
        ]
    }
    return { getSideBarItems }
}