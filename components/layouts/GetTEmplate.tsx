import PrivateLayout from './privateLayout'
import PublicLayout from './publicLayout'

export default function GetTemplate({children,template,title}:{children:JSX.Element,template:string,title:string}){
    switch (template) {
        case 'admin':
            return <PrivateLayout title={title}>{children}</PrivateLayout>
        default:
            return <PublicLayout title={title}>{children}</PublicLayout>
    }
}