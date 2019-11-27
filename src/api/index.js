import axios from '@/libs/api.request'

export const uploadFile = '/bootan/common/upload'

export const getMenuList = '/bootan/permission/menu-list'

export const apiLogin = ({ username, password }) => {
  return axios.postRequest('/login', {
    username,
    password
  })
}

export const ws = '/bootan/ws'

export const apiMe = (params) => {
  return axios.getRequest('/me', params)
}

export const apiLogout = (token) => {
  return axios.getRequest('/logout', token)
}

export const apiMessageCount = () => {
  return axios.getRequest('/message-count')
}

export const apiCommonUpload = (params) => {
  return axios.getRequest('/common/upload', params)
}

export const apiUserListIndex = (params) => {
  return axios.getRequest('/user/list-index', params)
}

export const apiUserView = (id, params) => {
  return axios.getRequest('/user/view/' + id, params)
}

export const apiUserCreate = (params) => {
  return axios.postRequest('/user/create', params)
}

export const apiUserUpdate = (params) => {
  return axios.postRequest('/user/update', params)
}

export const apiUserDelete = (ids, params) => {
  return axios.deleteRequest('/user/delete/' + ids, params)
}

export const apiUserImportData = (params) => {
  return axios.importRequest('/user/import-data', params)
}

export const apiUserDepartmentUser = (id, params) => {
  return axios.getRequest('/user/department-user/' + id, params)
}

export const apiUserUnlock = (params) => {
  return axios.postRequest('/user/unlock', params)
}

export const apiUserResetPassword = (params) => {
  return axios.postRequest('/user/reset-password', params)
}

export const apiUserDisable = (id, params) => {
  return axios.postRequest('/user/disable/' + id, params)
}

export const apiUserEnable = (id, params) => {
  return axios.postRequest('/user/enable/' + id, params)
}

export const apiRoleListAll = (params) => {
  return axios.getRequest('/role/list-all', params)
}

export const apiRoleListIndex = (params) => {
  return axios.getRequest('/role/list-index', params)
}

export const apiRoleSave = (params) => {
  return axios.postRequest('/role/save', params)
}

export const apiRoleDelete = (ids, params) => {
  return axios.deleteRequest('/role/delete/' + ids, params)
}

export const apiRoleSavePermission = (params) => {
  return axios.postRequest('/role/save-permission', params)
}

export const apiRoleSaveDepartment = (params) => {
  return axios.postRequest('/role/save-department', params)
}

export const apiRoleSaveDefault = (params) => {
  return axios.postRequest('/role/save-default', params)
}

export const apiPermissionListAll = (params) => {
  return axios.getRequest('/permission/list-all', params)
}

export const apiPermissionListIndex = (params) => {
  return axios.getRequest('/permission/list-index', params)
}

export const apiPermissionSave = (params) => {
  return axios.postRequest('/permission/save', params)
}

export const apiPermissionCreate = (params) => {
  return axios.postRequest('/permission/create', params)
}

export const apiPermissionUpdate = (params) => {
  return axios.postRequest('/permission/update', params)
}

export const apiPermissionDelete = (ids, params) => {
  return axios.deleteRequest('/permission/delete/' + ids, params)
}

export const apiPermissionSearch = (keyword, params) => {
  return axios.getRequest('/permission/search/' + keyword, params)
}

export const apiPermissionMenuList = (params) => {
  return axios.getRequest('/permission/menu-list', params)
}

export const apiDepartmentListAll = (params) => {
  return axios.getRequest('/department/list-all', params)
}

export const apiDepartmentList = (parentId, params) => {
  return axios.getRequest('/department/list/' + parentId, params)
}

export const apiDepartmentListIndex = (params) => {
  return axios.getRequest('/department/list-index', params)
}

export const apiDepartmentSave = (params) => {
  return axios.postRequest('/department/save', params)
}

export const apiDepartmentCreate = (params) => {
  return axios.postRequest('/department/create', params)
}

export const apiDepartmentUpdate = (params) => {
  return axios.postRequest('/department/update', params)
}

export const apiDepartmentDelete = (ids, params) => {
  return axios.deleteRequest('/department/delete/' + ids, params)
}

export const apiDepartmentSearch = (keyword, params) => {
  return axios.getRequest('/department/search/' + keyword, params)
}

export const apiStudentListIndex = (params) => {
  return axios.getRequest('/student/list-index', params)
}

export const apiStudentSave = (params) => {
  return axios.postRequest('/student/save', params)
}

export const apiStudentDelete = (ids, params) => {
  return axios.deleteRequest('/student/delete/' + ids, params)
}

export const apiStudentListAll = (params) => {
  return axios.getRequest('/student/list-all', params)
}

export const apiStudentImportData = (params) => {
  return axios.importRequest('/student/import-data', params)
}

export const apiStudentDisable = (id, params) => {
  return axios.postRequest('/student/disable/' + id, params)
}

export const apiStudentEnable = (id, params) => {
  return axios.postRequest('/student/enable/' + id, params)
}

export const apiDictListAll = (params) => {
  return axios.getRequest('/dict/list-all', params)
}

export const apiDictListIndex = (params) => {
  return axios.getRequest('/dict/list-index', params)
}

export const apiDictSave = (params) => {
  return axios.postRequest('/dict/save', params)
}

export const apiDictDelete = (ids, params) => {
  return axios.deleteRequest('/dict/delete/' + ids, params)
}

export const apiDictSearch = (keyword, params) => {
  return axios.getRequest('/dict/search/' + keyword, params)
}

export const apiDictDataListIndex = (params) => {
  return axios.getRequest('/dict-data/list-index', params)
}

export const apiDictDataSave = (params) => {
  return axios.postRequest('/dict-data/save', params)
}

export const apiDictDataDelete = (ids, params) => {
  return axios.deleteRequest('/dict-data/delete/' + ids, params)
}

export const apiDictDataViewName = (name, params) => {
  return axios.getRequest('/dict-data/view-name/' + name, params)
}

export const apiDictDataDisable = (id, params) => {
  return axios.postRequest('/dict-data/disable/' + id, params)
}

export const apiDictDataEnable = (id, params) => {
  return axios.postRequest('/dict-data/enable/' + id, params)
}

export const apiDictDataImportData = (params) => {
  return axios.importRequest('/dict-data/import-data', params)
}

export const apiLogListIndex = (params) => {
  return axios.getRequest('/log/list-index', params)
}

export const apiLogSave = (params) => {
  return axios.postRequest('/log/save', params)
}

export const apiLogDelete = (ids, params) => {
  return axios.deleteRequest('/log/delete/' + ids, params)
}

export const apiLogListAll = (params) => {
  return axios.getRequest('/log/list-all', params)
}

export const apiLogImportData = (params) => {
  return axios.importRequest('/log/import-data', params)
}

export const apiLogDisable = (id, params) => {
  return axios.postRequest('/log/disable/' + id, params)
}

export const apiLogEnable = (id, params) => {
  return axios.postRequest('/log/enable/' + id, params)
}

export const apiRedisListIndex = (params) => {
  return axios.getRequest('/redis/list-index', params)
}

export const apiRedisSave = (params) => {
  return axios.postRequest('/redis/save', params)
}

export const apiRedisDelete = (ids, params) => {
  return axios.deleteRequest('/redis/delete/' + ids, params)
}

export const apiRedisInfo = (params) => {
  return axios.getRequest('/redis/info', params)
}

export const apiRedisMemory = (params) => {
  return axios.getRequest('/redis/memory', params)
}

export const apiRedisKeySize = (params) => {
  return axios.getRequest('/redis/key-size', params)
}

export const apiFileListIndex = (params) => {
  return axios.getRequest('/file/list-index', params)
}

export const apiFileSave = (params) => {
  return axios.postRequest('/file/save', params)
}

export const apiFileDelete = (ids, params) => {
  return axios.deleteRequest('/file/delete/' + ids, params)
}

export const apiFileCopy = (params) => {
  return axios.deleteRequest('/file/copy/' + params)
}

export const apiQuartzListIndex = (params) => {
  return axios.getRequest('/quartz/list-index', params)
}

export const apiQuartzListAll = (params) => {
  return axios.getRequest('/quartz/list-all', params)
}

export const apiQuartzView = (id, params) => {
  return axios.getRequest('/quartz/view/' + id, params)
}

export const apiQuartzSave = (params) => {
  return axios.postRequest('/quartz/save', params)
}

export const apiQuartzDelete = (ids, params) => {
  return axios.deleteRequest('/quartz/delete/' + ids, params)
}

export const apiQuartzImportData = (params) => {
  return axios.importRequest('/quartz/import-data', params)
}

export const apiQuartzEnable = (id, params) => {
  return axios.postRequest('/quartz/enable/' + id, params)
}

export const apiQuartzDisable = (id, params) => {
  return axios.postRequest('/quartz/disable/' + id, params)
}

export const apiActCategoryListIndex = (params) => {
  return axios.getRequest('/act-category/list-index', params)
}

export const apiActCategoryListAll = (params) => {
  return axios.getRequest('/act-category/list-all', params)
}

export const apiActCategoryView = (id, params) => {
  return axios.getRequest('/act-category/view/' + id, params)
}

export const apiActCategorySave = (params) => {
  return axios.postRequest('/act-category/save', params)
}

export const apiActCategoryCreate = (params) => {
  return axios.postRequest('/act-category/create', params)
}

export const apiActCategoryUpdate = (params) => {
  return axios.postRequest('/act-category/update', params)
}

export const apiActCategoryDelete = (ids, params) => {
  return axios.deleteRequest('/act-category/delete/' + ids, params)
}

export const apiActCategoryImportData = (params) => {
  return axios.importRequest('/act-category/import-data', params)
}

export const apiActCategoryEnable = (id, params) => {
  return axios.postRequest('/act-category/enable/' + id, params)
}

export const apiActCategoryDisable = (id, params) => {
  return axios.postRequest('/act-category/disable/' + id, params)
}
export const apiActModelListIndex = (params) => {
  return axios.getRequest('/act-model/list-index', params)
}

export const apiActModelListAll = (params) => {
  return axios.getRequest('/act-model/list-all', params)
}

export const apiActModelView = (id, params) => {
  return axios.getRequest('/act-model/view/' + id, params)
}

export const apiActModelSave = (params) => {
  return axios.postRequest('/act-model/save', params)
}

export const apiActModelCreate = (params) => {
  return axios.postRequest('/act-model/create', params)
}

export const apiActModelUpdate = (params) => {
  return axios.postRequest('/act-model/update', params)
}

export const apiActModelDelete = (ids, params) => {
  return axios.deleteRequest('/act-model/delete/' + ids, params)
}

export const apiActModelImportData = (params) => {
  return axios.importRequest('/act-model/import-data', params)
}

export const apiActModelEnable = (id, params) => {
  return axios.postRequest('/act-model/enable/' + id, params)
}

export const apiActModelDisable = (id, params) => {
  return axios.postRequest('/act-model/disable/' + id, params)
}