import $http from "./service";

const JSON_TYPE = { "Content-Type": "application/json" };
const FORM_TYPE = { "Content-Type": "application/x-www-form-urlencoded" };
const GET = "get";
const POST = "post";
import flowConfig from "@/view/flow/config";
const processCodes = flowConfig.searchTypeOptions.map(i => i.value);
//上传附件获取space
export const spaceGet = domain => {
        return $http({
                url: `/dingtalk/space/get?domain=${domain}`,
                method: GET,
                headers: JSON_TYPE
        });
};

//授权用户访问企业自定义空间
export const spaceGrant = (domain, fileIds, type) => {
        return $http({
                url: `/dingtalk/space/grant?domain=${domain}&fileIds=${fileIds}&type=${type}`,
                method: GET,
                headers: JSON_TYPE
        });
};

//流程上传附件获取space
export const getSpaceInfo = () => {
        return $http({
                url: `/dingtalk/process/getSpaceInfo`,
                method: POST,
                headers: JSON_TYPE
        });
};

//获取当前人所在部门
export const getUserDeptList = userId => {
        return $http({
                url: `/dingtalk/corp/getUserDepts?userId=${userId}`,
                method: GET
        });
};
//免登模拟
export const login = code => {
        return $http({
                url: `/dingtalk/login?code=${code}`,
                method: POST,
                headers: FORM_TYPE
        });
};

/****************************流程管理***************************/
//待我审批列表
export const getTodoTaskList = (data = {}) => {
        return $http({
                url: `/dingtalk/process/getTodoTasks`,
                method: POST,
                headers: FORM_TYPE,
                data
        });
};
//获取我已审批列表
export const getDoneTaskList = data => {
        return $http({
                url: "/dingtalk/process/getDoneTasks",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};
//我发起的
export const getSubmitInstanceList = data => {
        return $http({
                url: "/dingtalk/process/getSubmitInstances",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};

//抄送我的
export const getCcInstanceList = data => {
        return $http({
                url: "/dingtalk/process/getCcInstances",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};
//标记已读
export const readCcInstance = processInstanceId => {
        return $http({
                url: "/dingtalk/process/readCcInstance",
                method: POST,
                headers: FORM_TYPE,
                data: {
                        processCodes,
                        processInstanceId
                }
        });
};

//待我审批数量
export const countTodoTask = () => {
        return $http({
                url: "/dingtalk/process/countTodoTask",
                method: POST,
                headers: FORM_TYPE,
                data: { processCodes }
        });
};

//抄送我的
export const countCcInstance = () => {
        return $http({
                url: "/dingtalk/process/countCcInstance",
                method: POST,
                headers: FORM_TYPE,
                data: { processCodes }
        });
};

/****************************项目管理***************************/
//合作单位列表
export const getPartnerList = data => {
        return $http({
                url: "/research/partner/getProjectPartnerList",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};

//查看合作单位
export const getPartner = projectPartnerId => {
        return $http({
                url: "/research/partner/getProjectPartner",
                method: POST,
                headers: FORM_TYPE,
                data: { projectPartnerId }
        });
};


//科研合同列表
export const getResearchContractList = data => {
        return $http({
                url: "/contract/getContractList",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};
//获取项目类型
export const getProjectCategoryList = data => {
        return $http({
                url: "/research/project/getProjectCategoryList",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};
//二级项目列表
export const getProjectSecondaryList = data => {
        return $http({
                url: "/research/parent/getProjectParentList",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};

//二级项目创建
export const createProjectSecondary = data => {
        return $http({
                url: "/research/parent/createProjectParent",
                method: POST,
                headers: JSON_TYPE,
                data
        });
};

//二级项目查看
export const getProjectSecondary = projectParentId => {
        return $http({
                url: "/research/parent/getProjectParent",
                method: POST,
                headers: FORM_TYPE,
                data: { projectParentId }
        });
};


//国库预算项目列表
export const getProjectSecondaryTaskList = data => {
        return $http({
                url: "/research/project/getProjectList",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};


//申请书项目列表
export const getProjectApplicationList = data => {
        return $http({
                url: "/research/project/getProjectApplicationList",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};

//科技发展项目创建
export const createProjectDevelop = data => {
        return $http({
                url: "/research/project/createProjectDevelop",
                method: POST,
                headers: JSON_TYPE,
                data
        });
};

//创建科技合同
export const createProjectContract = data => {
        return $http({
                url: "/research/project/createProjectContract",
                method: POST,
                headers: JSON_TYPE,
                data
        });
};
//科技合同列表
export const getProjectContractList = data =>{
        return $http({
                url:'/research/project/getProjectContractList',
                method:POST,
                headers:FORM_TYPE,
                data
        })
}

//项目(成果)列表
export const getProjectList = data => {
        return $http({
                url: "/research/achievement/getProjectList",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};

//论文列表
export const getProjectPaperList = data => {
        return $http({
                url: "/research/achievement/getProjectPaperList",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};

//获取一级项目分类
export const getProjectFirstCategoryList = data => {
        return $http({
                url: "/research/project/getProjectFirstCategoryList",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};
//获取二级项目分类
export const getProjectSecondCategoryList = data => {
        return $http({
                url: "/research/project/getProjectSecondCategoryList",
                method: POST,
                headers: FORM_TYPE,
                data
        });
};




