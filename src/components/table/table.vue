<template>
  <div>
    <div class="list-wrap">
      <Table v-bind:loading="loading" v-bind:no-data-text="gridData.noDataText" v-bind:columns="columns" v-bind:data="gridData.data">
      </Table>
    </div>
    <div class="list-page-wrap">
      <Page v-bind:current="gridData.pageIndex" v-bind:total="gridData.totalCount" v-bind:page-size="gridData.pageSize" @on-change="pageChange"
        @on-page-size-change="pageSizeChange" v-bind:page-size-opts="[5,10, 20,50]" show-elevator show-total>
      </Page>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {},
    methods: {
      /**
       * 页面初始化
       */
      init() {
        this.loadData()
      },
      loadData() {
        var vm = this
        vm.loading = true
        var requetData = {
          ticket: this.ticket,
          pagingParams: {
            pageSize: this.gridData.pageSize,
            pageIndex: this.gridData.pageIndex
          },
          queryParams: this.searchParams
        }
        this.ajax({
          serviceType: 'crossDomainCall',
          serviceName: 'ppc/Workitem',
          methodName: 'pageWorkitem',
          data: requetData,
          success: function (resultData) {
            if (resultData.status != vm.ResultStatusEnum.SUCCESS) {
              vm.$Message.error('数据获取失败！')
              return
            }
            var response = resultData.data
            vm.gridData.data = response.dataList
            if (response.pagingParams.pageIndex == '0') {
              vm.gridData.pageIndex = vm.gridData.pageIndex
            } else {
              vm.gridData.pageIndex = response.pagingParams.pageIndex
            }
            vm.gridData.totalCount = response.pagingParams.totalCount
            if (vm.gridData.data.length == 0) {
              vm.gridData.noDataText = $.publicMethod.noDataText
            }
          },
          complete: function (e) {
            vm.loading = false
          }
        })
      },
      /**
       * 选择页数
       */
      pageChange(pageIndex) {
        this.gridData.pageIndex = pageIndex
        this.loadData()
      },
      /**
       * 选择每页显示条数
       */
      pageSizeChange(pageSize) {
        this.gridData.pageSize = pageSize
        this.loadData()
      }
    }
  }
</script>

<style scoped>


</style>
