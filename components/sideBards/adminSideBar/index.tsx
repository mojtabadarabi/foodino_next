import { SideBarItems } from "@/app/types/food"
import { AdminConfigs } from "@/configs/adminConfigs"
import Link from "next/link";

export default function index() {
    const { getSideBarItems } = AdminConfigs()
    const items = getSideBarItems()
    return (
        <div>
            {
                items.map((item: SideBarItems) => (
                    <Link href={item.href}>
                        <div className={`text-[var(--text-color)] mb-2 font-bold flex items-center p-2 hover:bg-[var(--background-hover)] ${item.isActive && 'bg-[var(--background-hover)]'} transition duration-75 rounded`}>
                            {item.title}
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}