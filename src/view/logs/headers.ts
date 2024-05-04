

const headers = [
    // { title: 'Id', value: 'id' },
    { title: '时间', value: 'createdAt' , align: "center"},
    { title: '渠道ID', value: 'channelId' ,sortable: false, align: "center"},
    { title: '渠道类型', value: 'channelType' ,sortable: false, align: "center"},
    { title: '渠道名称', value: 'channelName' ,sortable: false, align: "center"},
    { title: '用户ID', value: 'userId' ,sortable: false, align: "center"},
    // { title: '用户名', value: 'username' ,sortable: false},
    { title: 'Model', value: 'model' ,sortable: false, align: "center"},
    { title: '总token', value: 'totalToken' ,sortable: false, align: "center"},
    { title: '提示token', value: 'promptTokens' ,sortable: false, align: "center"},
    { title: '完成token', value: 'completionTokens' ,sortable: false, align: "center"},
    { title: '输入', value: 'inputText' ,sortable: false, align: "center"},
    { title: '输出', value: 'outputText' ,sortable: false},
    { title: 'IP', value: 'ip' , align: "center"},
    { title: '用时', value: 'consumeTime' , align: "center"},
]

export default headers