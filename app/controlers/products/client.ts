import {getAllModelPagination} from "@/app/helpers";
import {getQueryByLang} from "@/helpers/servicesHelpers";
import {NextApiRequest, NextApiResponse} from "next";
import {DEFAULT_LANG} from "@/constants/Links";

export default class ClientProductController {
    req: NextApiRequest
    res: NextApiResponse
    dataBase: any

    constructor(req: NextApiRequest, res: NextApiResponse, dataBase: any) {
        this.dataBase = dataBase
        this.req = req
        this.res = res
    }

    async getAllProducts() {
        const {page} = this.req.query
        const {paginate, lang} = this.req.headers
        const products = await getAllModelPagination(this.dataBase.collection("products"), page, paginate)
        const dataByLang = getQueryByLang({data: products, keys: ['name', 'description'], lang: lang || DEFAULT_LANG})
        this.res.status(200).json({
            status: 200,
            data: {data: dataByLang, total: products.length, page, paginate},
            msg: 'successFull'
        })
    }
}