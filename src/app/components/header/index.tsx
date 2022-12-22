import { FunctionComponent, ChangeEvent, useEffect, useState } from 'react'
import axios, {RawAxiosRequestHeaders} from 'axios'

import {useSecrets} from "../../../hooks"
import { ApiDetail, apiDetailDefault, Subscription, SubscriptionSecrets, subscriptionSecretsDefault } from '../../../models'
import {ApiDetailService} from "../../services/api-detail"
import {ManagementService} from "../../services/management-api"
import {fileDownload} from '../../../helper'

type ApiDetailDisplayModel = ApiDetail & SubscriptionSecrets & {
  urlTemplate: string
}

const apiDetailDisplayModelDefault = {...apiDetailDefault, ...subscriptionSecretsDefault, urlTemplate: ''}
const Header: FunctionComponent<{}> = () => {
  const {token, managementApiUrl, userId} = useSecrets()
  const [apiDetailDisplayModel, setApiDetailDisplayModel] = useState<Array<ApiDetailDisplayModel>>([apiDetailDisplayModelDefault])
  const apiDetailService = new ApiDetailService()
  const managementService = new ManagementService()

  async function getApiDetails() {
    if(token) {
      const apiDetailDisplayModel: Array<ApiDetailDisplayModel> = []
      const apisResponse = await managementService.getApis(
        managementApiUrl,
        token
      )

      for(const apiDetail of apisResponse.value) {
        const operations = await apiDetailService.getOperations(managementApiUrl, token, apiDetail.name)
        const wsdlOperation = operations.value.filter(o => o.properties.urlTemplate.includes('?wsdl'))
        const subscriptionSecretKey = await getSubscriptionContent(apiDetail.name)

        if(wsdlOperation.length) {
          apiDetailDisplayModel.push({
            ...apiDetail,
            ...subscriptionSecretKey,
            urlTemplate: wsdlOperation[0].properties.urlTemplate
          })
        }
      }

      setApiDetailDisplayModel(apiDetailDisplayModel)
    }
  }

  async function getSubscriptionContent(apiName: string): Promise<SubscriptionSecrets> {
    let secret: SubscriptionSecrets = subscriptionSecretsDefault

    if(token && userId && apiName) {
      const apiProducts = await apiDetailService.getProducts(
        managementApiUrl,
        token,
        apiName
      )

      for(const products of apiProducts.value) {
        const subscriptions = await managementService.getSubscriptions(
          managementApiUrl,
          token,
          userId
        )
        
        const allowedSubscriptions = subscriptions.value.filter((subscription: Subscription) => subscription.properties.scope.includes(products.name))

        for(const subscription of allowedSubscriptions) {
          secret = await managementService.listSecrets(
            managementApiUrl,
            token,
            userId,
            subscription.name
          )
        }
      }
    }

    return secret
  }

  async function downloadWsdl(apiDetail: ApiDetailDisplayModel) {
    if(token) {
      const hostNames = await apiDetailService.getHostNames(managementApiUrl, token, apiDetail.name)

      if(hostNames && hostNames.value.length > 0) {
        const headers: RawAxiosRequestHeaders = {};
        headers[apiDetail.properties.subscriptionKeyParameterNames.header] = apiDetail.primaryKey

        const {data} = await axios.get(
          `${apiDetail.properties.protocols[0]}://${hostNames.value[0].properties.value}${apiDetail.urlTemplate}`,
          {
            headers: headers
          }
        )

        fileDownload(data, 'text/plain', `${apiDetail.name}.wsdl`)
      }
    }
  }

  useEffect(() => {
    (async () => {
      await getApiDetails()
    })()
  }, [])

  return <div className="table" role="table" aria-label="APIs">
  <div className="table-head" role="rowgroup">
      <div className="table-row" role="row">
          <div className="col-5" role="columnheader">Name</div>
          <div className="col-5" role="columnheader">Description</div>
          <div className="col-2" role="columnheader">Download</div>
      </div>
  </div>
  <div className="table-body animation-fade-in" role="presentation">
    {
      apiDetailDisplayModel.map(apiDetail => {
        return (
          <div className="table-row" role="row">
              <div className="col-5 text-truncate" role="cell">
                  <a href="/api-details#api=test" title="Test">
                      <span data-bind="text: item.displayName">{apiDetail.name}</span>
                  </a>
              </div>
              <div className="col-5" role="cell">
                  <div ></div>
              </div>
              <div className="col-2" role="cell">
                <button onClick={() => downloadWsdl(apiDetail)} className="button button-download">
                  Download WSDL
                </button>
              </div>
          </div>
        )
      })
    } 
  </div>
</div>
}

export default Header