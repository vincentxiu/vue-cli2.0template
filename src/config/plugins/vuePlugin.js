import echarts from 'echarts'
import Qs from 'qs'
import * as utils from '@/config/utils'
export default {
  install: (Vue, options) => {
    let _this = Vue.prototype
    const UTILS = {
      $bus: new Vue({
        methods: {
          emit(event, ...args) {
            this.$emit(event, ...args)
          },
          on(event, callback) {
            this.$on(event, callback)
          },
          off(event, callback) {
            this.$off(event, callback)
          }
        }
      }),
      $echarts: echarts,
      $utils: utils,
      $qs: Qs,
      dealTree: tree => {
        if (Array.isArray(tree)) {
          for (let res of tree) {
            return _this.dealNode(res)
          }
        } else {
          return _this.dealNode(tree)
        }
      },
      dealNode: node => {
        if (Array.isArray(node)) {
          for (let res of node) {
            return _this.dealNode(res)
          }
        } else {
          node.value = node.code
          node.label = node.name
          delete node.code
          delete node.name
          if (node.children && node.children.length > 0) {
            for (let res of node.children) {
              _this.dealNode(res)
            }
          }
          return node
        }
      },
      getSettingsDictionary: (data, config) => {
        if (!config || !config.code) {
          _this.$Message.error('字典数据加载失败!')
        }
        let requestData = {
          ticket: '80f1b3dc9bfc49a88bd39c4b18a444eb',
          prodId: 'shencai-bssp',
          dictCode: config.code,
          depth: config.maxLevel
        }
        if (config.parentCode) {
          requestData.code = config.parentCode
        }
        let methodName = 'getProdDictCodeList' // 默认无层级的
        if (config.isTree && config.isTree === true) methodName = 'getProdDictCodeTreeByDepth'
        _this.$axios.get(`prodId/sys/main/main/${methodName}`, _this.$qs.stringify({
          dictCode: 'std_canton',
          depth: 3,
          code: '320000',
          ticket: '53b578f68d104799945e4c38c4e43bf1',
          prodId: 'shencai-bssp'
        }))
          .then(res => {
            if (!res.data.data) {
              _this.$Message.error('字典数据加载失败!')
            }
            if (config && config.isEmpty === true) {
              const emptyContent = config.emptyContent || '请选择'
              data.push({
                'name': emptyContent,
                'code': ''
              })
            }
            if (config.parentCode && config.isTree) {
              data.push(_this.dealTree(res.data.data))
            } else {
              for (let i of res.data.data) {
                data.push(i)
              }
            }
          })
          .catch(error => console.log(error))
      }
    }
    Object.assign(_this, UTILS)
  }
}
