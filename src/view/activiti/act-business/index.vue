<!--<style lang="less">
@import "./index.less"
</style>-->
<template>
  <div>
    <Row class="table-search-con">
      <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form" @keydown.native.enter.prevent ="handleSearch">
        <Form-item label="名称" prop="name">
          <Input type="text" v-model="searchForm.name" clearable placeholder="请输入名称" class="search-input" @on-change="handleClear" />
        </Form-item>
        <Form-item label="结果" prop="result">
          <Input type="text" v-model="searchForm.result" clearable placeholder="请输入结果" class="search-input" @on-change="handleClear" />
        </Form-item>
        <Form-item label="申请时间">
          <DatePicker
            v-model="selectDateAppliedAt"
            type="daterange"
            format="yyyy-MM-dd"
            clearable
            @on-change="changeSelectDateRangeAppliedAt"
            placeholder="选择起始时间"
            style="width: 200px"
          ></DatePicker>
        </Form-item>
        <Form-item label="创建时间">
          <DatePicker
            v-model="selectDate"
            type="daterange"
            format="yyyy-MM-dd"
            clearable
            @on-change="changeSelectDateRange"
            placeholder="选择起始时间"
            style="width: 200px"
          ></DatePicker>
        </Form-item>
        <Form-item label="类型" prop="type">
          <Select
            v-model="searchForm.type"
            placeholder="请选择"
            clearable
            style="width: 200px" >
            <Option v-for="(item) in typeList" :key="item.value" :value="item.value">{{item.label}}</Option>
          </Select>
        </Form-item>
        <span v-if="searchDropDown">
          <Form-item label="状态" prop="status">
            <Select
              v-model="searchForm.status"
              placeholder="请选择"
              clearable
              style="width: 200px" >
              <Option v-for="(item) in statusList" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </Form-item>
        </span>
        <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
        <Button @click="handleReset">重置</Button>
        <a class="drop-down" @click="changeSearchDropDown">
          {{dropDownContent}}
          <Icon :type="dropDownIcon"></Icon>
        </a>
      </Form>
    </Row>
    <Row class="table-operation-con">
      <Button @click="addModal" type="primary" icon="md-add">创建</Button>
      <Button @click="deleteBatch" icon="md-trash">批量删除</Button>
      <Dropdown @on-click="changeOperationDropDown">
        <Button>
          更多操作 <Icon type="md-arrow-dropdown" />
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="exportData">导出所选数据</DropdownItem>
          <DropdownItem name="exportAll">导出全部数据</DropdownItem>
          <DropdownItem name="importData">导入数据</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button @click="init" icon="md-refresh">刷新</Button>
    </Row>
    <Row>
      <Alert show-icon>
        已选择<span class="select-count">{{selectCount}}</span> 项
        <a class="select-clear" @click="handleSelectNone">清空</a>
      </Alert>
    </Row>
    <Row>
      <Table
        :loading="loading"
        border
        :columns="columns"
        :data="data"
        ref="table"
        sortable="custom"
        @on-sort-change="changeSort"
        @on-selection-change="changeSelection"
      ></Table>
    </Row>
    <Row class="table-page-con" type="flex" justify="end">
      <Page
        :current="searchForm.pageNumber"
        :total="total"
        :page-size="searchForm.pageSize"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        :page-size-opts="[10,20,50]"
        show-total
        show-elevator
        show-sizer
      ></Page>
    </Row>

    <!-- 创建编辑弹出框 -->
    <Modal :title="modalTitle" v-model="modelModalVisible" :mask-closable="false" :width="520" @keydown.native.enter.prevent="saveModel">
      <Form ref="modelForm" :model="modelForm" :label-width="88" :rules="modelFormValidate">
        <FormItem label="选择审批人" prop="assignees" :error="error">
          <Select
            v-model="modelForm.assignees"
            placeholder="请选择或输入搜索"
            filterable
            clearable
            multiple
            :loading="loadingAssignee"
          >
            <Option v-for="(item, i) in assigneeList" :key="i" :value="item.id">{{item.username}}</Option>
          </Select>
        </FormItem>
        <FormItem label="优先级" prop="priority">
          <Select v-model="modelForm.priority" placeholder="请选择" clearable>
            <Option v-for="(item, i) in dictPriority" :key="i" :value="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="消息通知">
          <Checkbox v-model="modelForm.sendMessage">站内消息通知</Checkbox>
          <Checkbox v-model="modelForm.sendSms">短信通知</Checkbox>
          <Checkbox v-model="modelForm.sendEmail">邮件通知</Checkbox>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" :loading="loadingSubmit" @click="saveModel">提交</Button>
      </div>
    </Modal>

    <Drawer width="840" v-model="viewModalVisible" title="选择业务流程">
      <div class="bootan-drawer-view">
        <div>
          <Form
            ref="searchFormDrawer"
            :model="searchFormDrawer"
            inline
            :label-width="60"
            class="search-form"
          >
            <Form-item label="流程名称" prop="name">
              <Input
                type="text"
                v-model="searchFormDrawer.name"
                clearable
                placeholder="请输入流程名"
                style="width: 140px"
              />
            </Form-item>
            <Form-item label="所属分类" prop="categories">
              <Cascader
                v-model="selectCategory"
                :data="categories"
                @on-change="handleChangeCategory"
                change-on-select
                filterable
                clearable
                placeholder="请选择分类"
                style="width: 140px"
              ></Cascader>
            </Form-item>
            <Form-item style="margin-left:-35px;" class="br">
              <Button @click="getProcessList" type="primary" icon="ios-search">搜索</Button>
              <Button @click="resetProcess">重置</Button>
              <i-switch
                size="large"
                v-model="searchFormDrawer.showLatest"
                @on-change="getProcessList"
                style="margin:0 5px"
              >
                <span slot="open">最新</span>
                <span slot="close">全部</span>
              </i-switch>
            </Form-item>
          </Form>
        </div>
        <div>
          <RadioGroup v-model="showType" type="button">
            <Radio title="缩略图" label="thumb">
              <Icon type="ios-apps" style="margin-bottom:3px;"></Icon>
            </Radio>
            <Radio title="列表" label="list">
              <Icon type="md-list" style="margin-bottom:3px;"></Icon>
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="process-wrapper" v-if="showType=='thumb'">
        <Card v-for="(item, i) in dataProcess" :key="i" class="process-card">
          <div class="content" @click="chooseProcess(item)">
            <div class="other">
              <div class="name">{{i+1}}. {{item.name}}</div>
              <div class="key">{{item.description}}</div>
              <div class="info">版本：v.{{item.version}} 所属分类：{{item.categoryTitle}}</div>
            </div>
          </div>
        </Card>
        <Spin fix v-if="loadingProcess"/>
      </div>
      <Table
        :loading="loadingProcess"
        border
        :columns="processColumns"
        :data="dataProcess"
        ref="processTable"
        v-if="showType=='list'"
      ></Table>
    </Drawer>

    <Modal :title="modalExportTitle" v-model="exportModalVisible" :mask-closable="false" @on-ok="exportModelData">
      <Form ref="exportForm" :label-width="85">
        <FormItem label="导出文件名">
          <Input v-model="exportFileName"/>
        </FormItem>
        <FormItem label="自定义导出列">
          <CheckboxGroup v-model="chooseColumns">
            <Checkbox
              v-for="(item, idx) in exportColumns"
              :label="item.title"
              :key="idx"
              :value="item.checked"
              :disabled="item.disabled"
            ></Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Form>
    </Modal>

    <Drawer title="导入数据" closable v-model="importModalVisible" width="1000">
      <Upload action :before-upload="beforeUploadImport" accept=".xls, .xlsx">
        <Button icon="ios-cloud-upload-outline" style="margin-right:10px">上传Excel文件</Button>
        <span v-if="importFile.name != ''">当前选择文件：{{ importFile.name }}</span>
      </Upload>
      <Alert type="warning" show-icon>导入前请按照模板填写必要字段，其中必要字段为：name</Alert>
      <Table
        :columns="importColumns"
        border
        :height="importHeight"
        :data="importTableData"
        ref="importTable"
      ></Table>
      <div class="drawer-footer">
        <Button @click="downloadTemple" type="info" style="position:absolute;left:15px;">下载导入模板</Button>
        <Button @click="importModalVisible == false">关闭</Button>
        <Button
          :loading="loadingImport"
          :disabled="importTableData.length<=0"
          @click="importData"
          style="margin-left:5px"
          type="primary"
        >
          确认导入
          <span v-if="importTableData.length > 0">{{importTableData.length}} 条数据</span>
        </Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import {
  apiDictDataViewName,
  apiActProcessViewFirstNode,
  apiActCategoryListAll,
  apiActProcessListIndex,
  apiActBusinessListIndex,
  // apiActBusinessListAll,
  // apiActBusinessView,
  // apiActBusinessCreate,
  apiActBusinessApply,
  // apiActBusinessUpdate,
  apiActBusinessDelete,
  // apiActBusinessSearch,
  apiActBusinessImportData,
  apiActBusinessExportData,
  apiActBusinessEnable,
  apiActBusinessDisable
} from '@/api/index'
import excel from '@/libs/excel'
import { importDataColumns, importData } from './import-excel.js'

export default {
  name: 'model-manage',
  data () {
    let that = this
    return {
      error: '',
      assigneeList: [],
      dictPriority: [],
      showType: 'thumb',
      selectCategory: [],
      categories: [
      ],
      treeMap: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      selectCount: 0,
      loading: true,
      loadingSubmit: false,
      loadingImport: false,
      loadingProcess: false,
      loadingAssignee: false,
      selectDate: null,
      selectDateAppliedAt: null,
      searchDropDown: false,
      dropDownContent: '展开',
      dropDownIcon: 'ios-arrow-down',
      searchForm: {
        name: '',
        result: '',
        processDefinitionId: '',
        processInstanceId: '',
        tableId: '',
        isHistory: '',
        userId: '',
        appliedAt: '',
        type: '',
        status: '',
        pageNumber: 1,
        pageSize: 10,
        sort: 'createdAt',
        order: 'desc',
        startDate: '',
        endDate: '',
        startDateAppliedAt: '',
        endDateAppliedAt: ''
      },
      searchFormDrawer: {
        name: '',
        actCategoryId: '',
        showLatest: 0
      },
      columns: [
        { type: 'selection', width: 60, align: 'center', fixed: 'left' },
        { type: 'index', width: 60, align: 'center', fixed: 'left' },

        { title: '名称', key: 'name', sortable: true, fixed: 'left' },
        { title: '结果', key: 'result', sortable: true },
        // { title: '流程定义id', key: 'processDefinitionId', sortable: true },
        // { title: '流程实例id', key: 'processInstanceId', sortable: true },
        // { title: '关联其他表id', key: 'tableId', sortable: true },
        // { title: '是否为历史记录', key: 'isHistory', sortable: true },
        // { title: '申请用户id', key: 'userId', sortable: true },
        { title: '提交申请时间', key: 'appliedAt', sortable: true },

        {
          title: '类型',
          key: 'type',
          align: 'center',
          render: (h, params) => {
            let re = ''
            this.typeList.forEach((item) => {
              if (item.value === params.row.type) {
                re = item.label
              }
            })

            return h('div', re)
          },
          filters: [],
          filterMultiple: false,
          filterRemote (value, row) {
            that.searchForm.type = value[0]
            that.searchForm.type = that.searchForm.type + ''
            that.getModels()
          }
        },

        { title: '排序', key: 'sortOrder', sortable: true },

        {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h(
              'i-switch',
              {
                props: {
                  value: params.row.status,
                  size: 'large',
                  'true-value': 1,
                  'false-value': 0
                },
                on: {
                  'on-change': v => {
                    this.changeStatus(params.row, v)
                  }
                }
              },
              this.statusList.map((item) => {
                return h('span', { slot: item.slot }, item.label)
              })
            )
          },
          filters: [],
          filterMultiple: false,
          filterRemote (value, row) {
            that.searchForm.status = value[0]
            that.searchForm.status = that.searchForm.status + ''
            that.getModels()
          }
        },
        { title: '创建时间', key: 'createdAt', sortable: true, sortType: 'desc' },
        // { title: '更新时间', key: 'updatedAt', sortable: true },

        {
          title: '操作',
          key: 'action',
          align: 'center',
          fixed: 'right',
          width: 256,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.applyModal(params.row)
                    }
                  }
                },
                '提交申请'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'default',
                    size: 'small',
                    icon: 'ios-create-outline'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.editModal(params.row)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash'
                  },
                  on: {
                    click: () => {
                      this.deleteOne(params.row)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      processColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name',
          width: 150,
          sortable: true
        },
        {
          title: '备注描述',
          key: 'description',
          width: 150,
          sortable: true
        },
        {
          title: '所属分类',
          key: 'categoryTitle',
          width: 150,
          sortable: true
        },
        {
          title: '版本',
          key: 'version',
          align: 'center',
          sortable: true,
          render: (h, params) => {
            let re = ''
            if (params.row.version) {
              re = 'v.' + params.row.version
            }
            return h('div', re)
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 135,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.chooseProcess(params.row)
                    }
                  }
                },
                '选择该流程'
              )
            ])
          }
        }
      ],
      data: [],
      dataProcess: [],
      total: 0,
      totalCategory: 0,
      modalTitle: '',
      modelModalVisible: false,
      modelForm: {
        id: '',
        name: '',
        result: '',
        processDefinitionId: '',
        processInstanceId: '',
        tableId: '',
        isHistory: '',
        userId: '',
        appliedAt: '',
        assignees: [],
        priority: 1,
        sendMessage: '',
        sendSms: '',
        sendEmail: '',
        type: 1,
        sortOrder: 50
      },
      modelFormValidate: {
        result: [{ required: true, message: '结果不能为空', trigger: 'blur' }],
        processDefinitionId: [{ required: true, message: '流程定义id不能为空', trigger: 'blur' }],
        processInstanceId: [{ required: true, message: '流程实例id不能为空', trigger: 'blur' }],
        tableId: [{ required: true, message: '关联其他表id不能为空', trigger: 'blur' }],
        isHistory: [{ required: true, message: '是否为历史记录不能为空', trigger: 'blur' }],
        userId: [{ required: true, message: '申请用户id不能为空', trigger: 'blur' }],
        appliedAt: [{ required: true, message: '提交申请时间不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }]
      },
      viewModalVisible: false,
      viewForm: {},
      modalExportTitle: '确认导出数据',
      exportModalVisible: false,
      chooseColumns: [],
      exportColumns: [{ title: '名称', key: 'name' }],
      exportDataList: [],
      exportFileName: '',
      importModalVisible: false,
      importHeight: 520,
      importFile: {
        'name': ''
      },
      importTableData: [],
      importColumns: [],
      typeList: [
        {
          label: '类型1',
          value: 1
        },
        {
          label: '类型2',
          value: 2
        }
      ],
      statusList: [
        {
          label: '启用',
          value: 1,
          slot: 'open'
        },
        {
          label: '禁用',
          value: 0,
          slot: 'close'
        }
      ]
    }
  },
  created () {
    let i = 0
    let that = this
    that.columns.forEach(function (e) {
      if (e.key === 'type') {
        that.columns[i].filters = that.typeList
      } else if (e.key === 'status') {
        that.columns[i].filters = that.statusList
      }
      i++
    })
  },
  mounted () {
    this.importHeight = Number(document.documentElement.clientHeight - 230)
    this.init()
  },
  methods: {
    init () {
      this.getModels()
      this.getProcessList()
      this.getCategoryAll()
      this.getActPriorityType()
    },

    /* **** 和后台交互代码区块 begin **** */
    getModels () {
    // 多条件带分页搜索列表
      this.loading = true
      // 避免后台默认值
      if (typeof this.searchForm.type === 'undefined' || this.searchForm.type === 'undefined') {
        this.searchForm.type = ''
      }
      if (typeof this.searchForm.status === 'undefined' || this.searchForm.status === 'undefined') {
        this.searchForm.status = ''
      }
      apiActBusinessListIndex(this.searchForm).then(res => {
        this.loading = false
        if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
          this.data = res.data.data.content
          this.total = res.data.data.totalElements
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    getProcessList () {
      this.loading = true
      // 避免后台默认值
      if (typeof this.searchFormDrawer.type === 'undefined' || this.searchFormDrawer.type === 'undefined') {
        this.searchFormDrawer.type = ''
      }
      if (typeof this.searchFormDrawer.status === 'undefined' || this.searchFormDrawer.status === 'undefined') {
        this.searchFormDrawer.status = ''
      }
      apiActProcessListIndex(this.searchFormDrawer).then(res => {
        this.loading = false
        if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
          this.dataProcess = res.data.data.content
          this.totalCategory = res.data.data.totalElements
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    getCategoryAll () {
      apiActCategoryListAll(this.searchFormDrawer).then(res => {
        this.loading = false
        if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
          this.categories = this.convertTree(res.data.data, this.treeMap)
        } else {
          this.$Message.error(res.data.message)
        }
      })
    },
    saveModel () {
      this.$refs.modelForm.validate(valid => {
        if (valid) {
          this.loadingSubmit = true
          if (this.modalType === 0) {
            apiActBusinessApply(this.modelForm).then(res => {
              this.loadingSubmit = false
              if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
                this.$Message.success(res.data.message)
                this.getModels()
                this.modelModalVisible = false
              } else {
                this.$Message.error(res.data.message)
              }
            })
          }
        }
      })
    },
    deleteOne (v) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除数据 ' + v.name + ' ?',
        loading: true,
        onOk: () => {
          apiActBusinessDelete(v.id).then(res => {
            this.$Modal.remove()
            if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
              this.$Message.success(res.data.message)
              this.getModels()
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      })
    },
    deleteBatch () {
      if (this.selectCount <= 0) {
        this.$Message.warning('您还未选择要删除的数据')
        return
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所选的 ' + this.selectCount + ' 条数据?',
        loading: true,
        onOk: () => {
          let ids = ''
          this.selectList.forEach(function (e) {
            ids += e.id + ','
          })
          ids = ids.substring(0, ids.length - 1)
          apiActBusinessDelete(ids).then(res => {
            this.$Modal.remove()
            if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
              this.$Message.success(res.data.message)
              this.handleSelectNone()
              this.getModels()
            } else {
              this.$Message.error(res.data.message)
            }
          })
        }
      })
    },
    resetProcess () {
      this.$refs.searchFormDrawer.resetFields()
      // 重新加载数据
      this.getProcessList()
    },
    getActPriorityType () {
      apiDictDataViewName('act_priority_type').then(res => {
        if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
          this.dictPriority = res.data.data
        }
      })
    },
    /* **** 和后台交互代码区块 end **** */

    /* **** 页面内按钮交互代码 begin **** */
    handleSearch () {
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      this.getModels()
    },
    handleClear (e) {
      if (e.target.value === '') {
        this.getModels()
      }
    },
    handleReset () {
      this.searchForm.type = this.searchForm.type.toString()
      this.searchForm.status = this.searchForm.status.toString()
      this.$nextTick(() => {
        this.$refs.searchForm.resetFields()
      })
      this.searchForm.startDate = ''
      this.searchForm.endDate = ''
      this.selectDate = null
      this.selectDateAppliedAt = null
      this.searchForm.pageNumber = 1
      this.searchForm.pageSize = 10
      // 重新加载数据
      this.getModels()
    },
    changeStatus (row, v) {
      if (row.status === 1) {
        apiActBusinessDisable(row.id).then(res => {
          this.$Modal.remove()
          if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
            this.$Message.success(res.data.message)
            this.getModels()
          } else {
            this.$Message.error(res.data.message)
          }
        })
      } else {
        apiActBusinessEnable(row.id).then(res => {
          this.$Modal.remove()
          if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
            this.$Message.success(res.data.message)
            this.getModels()
          } else {
            this.$Message.error(res.data.message)
          }
        })
      }
    },
    addModal () {
      // this.modalType = 0
      // this.modalTitle = '创建'
      // this.$refs.modelForm.resetFields()
      // delete this.modelForm.id
      this.viewModalVisible = true
    },
    viewModal (v) {
      let list = []
      for (let attr in v) {
        list[attr] = v[attr]
        if (v[attr] == null) {
          list[attr] = ''
        } else {
          if (attr === 'type') {
            this.typeList.forEach((item) => {
              if (item.value === v[attr]) {
                list[attr] = item.label
              }
            })
          } else if (attr === 'status') {
            this.statusList.forEach((item) => {
              if (item.value === v[attr]) {
                list[attr] = item.label
              }
            })
          }
        }
      }

      this.viewForm = Object.assign({}, list)
      this.viewModalVisible = true
    },
    editModal (v) {
      let query = { id: v.tableId, category: 2, backRoute: this.$route.name }
      console.log(query)
      this.$router.push({
        name: v.routeName,
        query: query
      })
    },
    chooseProcess (v) {
      if (!v.routeName) {
        this.$Message.error('该流程信息未完善，暂时无法申请')
        return
      }

      this.viewModalVisible = false
      let query = { category: 1, backRoute: this.$route.name, processDefinitionId: v.id }
      this.$router.push({
        name: v.routeName,
        query: query
      })
    },
    applyModal (v) {
      this.modalType = 0
      this.modalTitle = '提交申请'
      this.$refs.modelForm.resetFields()
      for (let attr in v) {
        if (v[attr] == null) {
          v[attr] = ''
        }
      }
      let str = JSON.stringify(v)
      let modelInfo = JSON.parse(str)
      this.modelForm = modelInfo

      this.loadingAssignee = true
      apiActProcessViewFirstNode(v.processDefinitionId).then(res => {
        this.loadingAssignee = false
        if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
          this.assigneeList = res.data.data.users
          let ids = []
          res.data.data.users.forEach(e => {
            ids.push(e.id)
          })
          this.modelForm.assignees = ids
          this.getModels()
        } else {
          this.$Message.error(res.data.message)
        }
      })

      this.modelModalVisible = true
    },
    /* **** 页面内按钮交互代码 end **** */

    /* **** 页面内控件标准代码（一般无须修改） begin **** */
    handleChangeCategory (value, selectedData) {
      let actCategoryId = ''
      // 获取最后一个值
      if (value && value.length > 0) {
        actCategoryId = value[value.length - 1]
      }
      this.searchFormDrawer.actCategoryId = actCategoryId
    },
    changeSearchDropDown () {
      if (this.searchDropDown) {
        this.dropDownContent = '展开'
        this.dropDownIcon = 'ios-arrow-down'
      } else {
        this.dropDownContent = '收起'
        this.dropDownIcon = 'ios-arrow-up'
      }
      this.searchDropDown = !this.searchDropDown
    },
    changeSelectDateRange (v) {
      if (v) {
        this.searchForm.startDate = v[0]
        this.searchForm.endDate = v[1]
      }
    },
    changeSelectDateRangeAppliedAt (v) {
      if (v) {
        this.searchForm.startDateAppliedAt = v[0]
        this.searchForm.endDateAppliedAt = v[1]
      }
    },
    handleSelectNone () {
      this.$refs.table.selectAll(false)
    },
    changeSort (e) {
      this.searchForm.sortColumn = e.key
      this.searchForm.sortType = e.order
      if (e.order === 'normal') {
        this.searchForm.sortType = ''
      }
      this.getModels()
    },
    changeSelection (e) {
      this.exportDataList = e
      this.selectList = e
      this.selectCount = e.length
    },
    changePage (v) {
      this.searchForm.pageNumber = v
      this.getModels()
      this.handleSelectNone()
    },
    changePageSize (v) {
      this.searchForm.pageSize = v
      this.getModels()
    },
    cancelModal () {
      this.modelModalVisible = false
    },
    changeOperationDropDown (name) {
      if (name === 'exportData') {
        if (parseInt(this.selectCount) <= 0) {
          this.$Message.warning('您还未选择要导出的数据')
          return
        }
        this.exportType = 'part'
        this.exportModalVisible = true
        this.exportTitle = '确认导出 ' + this.selectCount + ' 条数据'
      } else if (name === 'exportAll') {
        this.exportType = 'all'
        this.exportModalVisible = true
        this.exportTitle = '确认导出全部 ' + this.total + ' 条数据'
        apiActBusinessExportData().then(res => {
          if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
            this.exportDataList = res.data.data
          }
        })
      } else if (name === 'importData') {
        this.importModalVisible = true
      }
    },
    exportModelData () {
      if (this.exportFileName === '') {
        this.exportFileName = '数据' + `${(new Date()).valueOf()}`
      }
      // 判断勾选导出列
      let array = []
      this.exportColumns.forEach(e => {
        this.chooseColumns.forEach(c => {
          if (e.title === c && !e.disabled) {
            array.push(e)
          }
        })
      })
      this.exportColumns = array
      this.exportModalVisible = false
      let title = []
      let key = []
      this.exportColumns.forEach(e => {
        title.push(e.title)
        key.push(e.key)
      })
      const params = {
        title: title,
        key: key,
        data: this.exportDataList,
        autoWidth: true,
        filename: this.exportFileName
      }
      excel.export_array_to_excel(params)
    },
    beforeUploadImport (file) {
      this.importFile = file
      const fileExt = file.name
        .split('.')
        .pop()
        .toLocaleLowerCase()
      if (fileExt === 'xlsx' || fileExt === 'xls') {
        this.readFile(file)
        this.file = file
      } else {
        this.$Notice.warning({
          title: '文件类型错误',
          desc:
            '所选文件‘ ' +
            file.name +
            ' ’不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
        })
      }
      return false
    },
    // 读取文件
    readFile (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onerror = e => {
        this.$Message.error('文件读取出错')
      }
      reader.onload = e => {
        this.$Message.success('读取数据成功')
        const data = e.target.result
        const { header, results } = excel.read(data, 'array')
        const tableTitle = header.map(item => {
          return { title: item, key: item }
        })
        this.importTableData = results
        this.importColumns = tableTitle
      }
    },
    downloadTemple () {
      let title = []
      let key = []
      importDataColumns.forEach(e => {
        title.push(e.title)
        key.push(e.key)
      })
      const params = {
        title: title,
        key: key,
        data: importData,
        autoWidth: true,
        filename: '导入数据模版'
      }
      excel.export_array_to_excel(params)
    },
    importData () {
      this.loadingImport = true
      apiActBusinessImportData(this.importTableData).then(res => {
        this.loadingImport = false
        if (parseInt(res.status) === 200 && parseInt(res.data.code) === 200) {
          this.importModalVisible = false
          this.getModels()
          this.$Modal.info({
            title: '导入结果',
            content: res.data.message
          })
        }
      })
    },
    convertTree (tree, map) {
      const result = []

      // 遍历 tree
      tree.forEach((item) => {
        // 读取 map 的键值映射
        const value = item[ map.value ]
        const label = item[ map.label ]
        let children = item[ map.children ]

        // 如果有子节点，递归
        if (children) {
          children = this.convertTree(children, map)
        }

        result.push({
          value,
          label,
          children
        })
      })

      return result
    }
    /* **** 页面内控件标准代码（一般无须修改） end **** */

  }
}
</script>
