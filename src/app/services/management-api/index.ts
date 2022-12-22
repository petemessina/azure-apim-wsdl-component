import axios from 'axios'
import { ArrayResponse, ApiDetail, Subscription, SubscriptionSecrets } from '../../../models'

export interface IManagementService {
    getApis(managementUrl: string, managementToken: string): Promise<ArrayResponse<ApiDetail>>
    getSubscriptions(managementUrl: string, managementToken: string, userId: string): Promise<ArrayResponse<Subscription>>
    listSecrets(managementUrl: string, managementToken: string, userId: string, subscriptionId: string): Promise<SubscriptionSecrets>
}

export class ManagementService implements IManagementService {
    constructor() {
    }

    async getApis(
        managementUrl: string, 
        managementToken: string
    ): Promise<ArrayResponse<ApiDetail>> {
        const apiList = `/apis?expandApiVersionSet=true&$top=50&$skip=0&$filter=isCurrent%20eq%20true&api-version=2021-04-01-preview`
        const apiUrl = `${managementUrl}${apiList}`
        const {data} = await axios<ArrayResponse<ApiDetail>>({
            method: 'get', 
            url: apiUrl, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': managementToken
              }
            }
        )

        return data
    }

    async getSubscriptions(
        managementUrl: string, 
        managementToken: string, 
        userId: string
    ): Promise<ArrayResponse<Subscription>> {
        const apiList = `/users/${userId}/subscriptions?api-version=2021-04-01-preview`
        const apiUrl = `${managementUrl}${apiList}`
        const {data} = await axios<ArrayResponse<Subscription>>({
            method: 'get', 
            url: apiUrl, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': managementToken
              }
            }
        )

        return data
    }

    async listSecrets(
        managementUrl: string, 
        managementToken: string, 
        userId: string, 
        subscriptionId: string
    ): Promise<SubscriptionSecrets> {
        const apiList = `/users/${userId}/subscriptions/${subscriptionId}/listSecrets?api-version=2021-04-01-preview`
        const apiUrl = `${managementUrl}${apiList}`
        const {data} = await axios<SubscriptionSecrets>({
            method: 'post', 
            url: apiUrl, 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': managementToken
              }
            }
        )
        
        return data;
    }
}