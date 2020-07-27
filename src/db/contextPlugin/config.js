// const _ = require('lodash');

// export function getAllUserAccessibleNodes(nodesArray) {
//   const nodesList = ['root'];
//   _.forEach(nodesArray, (node) => {
//     const levelStringArray = _.split(node, '-');
//     const level = levelStringArray.length;
//     for (let i = 1; i <= level; i += 1) {
//       nodesList.push(_.join(levelStringArray.slice(0, i), '-'));
//     }
//   });
//   return _.uniq(nodesList);
// }


// const config = {
//   /**
//    * Whether the mongo tenant plugin MAGIC is enabled. Default: true
//    */
//   enabled: true,

//   /**
//    * The name of the tenant id field. Default: tenantId
//    */
//   tenantIdKey: 'accessTag.hierarchy',

//   /**
//    * The type of the tenant id field. Default: String
//    */
//   tenantIdType: Array,

//   /**
//    * The name of the tenant id getter method. Default: getTenantId
//    */
//   tenantIdGetter: 'getAccessTokens',

//   /**
//    * The name of the tenant bound model getter method. Default: byTenant
//    */
//   accessorMethod: 'getModelWithContext',

//   /**
//    * Enforce tenantId field to be set. Default: false
//    * NOTE: this option will become enabled by default in mongo-tenant@2.0
//    */
//   requireTenantId: true,
// };

// export function getContextPluginConfig() {
//   return JSON.parse(JSON.stringify(config));
// }
// export default {
//   getAllUserAccessibleNodes,
//   getContextPluginConfig,
// };
