import {findOne, getAllModelPagination} from "@/app/helpers";
import {getQueryByLang} from "@/helpers/servicesHelpers";
import {NextApiRequest, NextApiResponse} from "next";
import {DEFAULT_LANG} from "@/constants/Links";

export default class ClientUserController {
    req: NextApiRequest
    res: NextApiResponse
    dataBase: any

    constructor(req: NextApiRequest, res: NextApiResponse, dataBase: any) {
        this.dataBase = dataBase
        this.req = req
        this.res = res
    }

    async checkSign() {
        const {userName} = this.req.body
        console.log(this.req.body)
        const foundedUser = await findOne(this.dataBase.collection("users"), 'email',userName)
        console.log(foundedUser)
        console.log('foundedUser')
        this.res.status(200).json({
            status: 200,
            data: null,
            msg: 'successFull'
        })
    }
}