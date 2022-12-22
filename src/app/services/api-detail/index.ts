import axios from 'axios'
import { ApiDetail, ApimHostName, ArrayResponse, Operation, Product } from '../../../models'

export interface IApiDetailService {
    getApiDetail(managementUrl: string, managementToken: string, apiName: string): Promise<ApiDetail>
    getHostNames(managementUrl: string, managementToken: string, apiName: string): Promise<ArrayResponse<ApimHostName>>
    getOperations(managementUrl: string, managementToken: string, apiName: string): Promise<ArrayResponse<Operation>>
    getProducts(managementUrl: string, managementToken: string, apiName: string): Promise<ArrayResponse<Product>>
}

export class ApiDetailService implements IApiDetailService {
    constructor() {
    }

    async getApiDetail(
      managementUrl: string, 
      managementToken: string, 
      apiName: string
      ): Promise<ApiDetail> {
        const apiDetail = `apis/${apiName}?expandApiVersionSet=true&api-version=2021-04-01-preview`
        const apiDetailUrl = `${managementUrl}/${apiDetail}`
        const {data} = await axios.get<ApiDetail>(
            apiDetailUrl,
            {
              headers: {
                Authorization: managementToken,
              }
            },
          )

        return data;
    }

    async getHostNames(
        managementUrl: string,
        managementToken: string,
        apiName: string
    ): Promise<ArrayResponse<ApimHostName>> {
        const apiList = `/apis/${apiName}/hostnames?api-version=2021-04-01-preview`
        const apiUrl = `${managementUrl}${apiList}`
        const {data} = await axios<ArrayResponse<ApimHostName>>({
            method: 'get', 
            url: apiUrl, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': managementToken
              }
            }
        )
        
        return data;
    }

    async getOperations(
      managementUrl: string, 
      managementToken: string, 
      apiName: string
      ): Promise<ArrayResponse<Operation>> {
        const apiDetail = `apis/${apiName}/operations?$top=50&api-version=2021-04-01-preview`        
        const apiDetailUrl = `${managementUrl}/${apiDetail}`
        const {data} = await axios.get<ArrayResponse<Operation>>(
            apiDetailUrl,
            {
              headers: {
                Authorization: managementToken,
              }
            },
          )

        return data;
    }

    async getProducts(
      managementUrl: string,
      managementToken: string,
      apiName: string
      ): Promise<ArrayResponse<Product>> {
        const apiDetail = `apis/${apiName}/products?api-version=2021-04-01-preview`        
        const apiDetailUrl = `${managementUrl}/${apiDetail}`
        const {data} = await axios.get<ArrayResponse<Product>>(
          apiDetailUrl,
          {
            headers: {
              Authorization: managementToken,
            }
          },
        )

      return data;
    }
}