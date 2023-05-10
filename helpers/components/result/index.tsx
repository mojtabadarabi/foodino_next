import Loading from "@/helpers/components/loading";
import Error from "@/helpers/components/error";
import Empty from "@/helpers/components/empty";

interface Props {
    children:any,
    loading?:boolean,
    error?:boolean,
    empty?:boolean,
    loadingUi?:JSX.Element,
    errorUi?:JSX.Element,
    emptyUi?:JSX.Element,
    refetch?:()=>void
}

export default function Result({children, loading=false, error=false,empty=false,loadingUi,errorUi,emptyUi,refetch=()=>{}}: Props) {
    if(loading) return loadingUi||<Loading/>
    if(error) return errorUi||<Error/>
    if(empty) return emptyUi||<Empty/>
    return children
}