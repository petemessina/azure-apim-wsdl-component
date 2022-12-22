const {deployNodeJS} = require("@azure/api-management-custom-widgets-tools")

const serviceInformation = {
	"resourceId": "subscriptions/0520db6c-742a-4fa4-a182-79425c16bc83/resourceGroups/hub-rg/providers/Microsoft.ApiManagement/service/apim-demoservice-002",
	"managementApiEndpoint": "https://management.azure.com"
}
const name = "soap-header"
const fallbackConfigPath = "./static/config.msapim.json"

deployNodeJS(serviceInformation, name, fallbackConfigPath)
