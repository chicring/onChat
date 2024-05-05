import {
    BrandStackshareIcon,
    LinkIcon, PasswordIcon, BoxModelIcon, BoneIcon
} from 'vue-tabler-icons';

export interface ModelConfig {
    [key: string]: string;
}

export interface ChannelConfig {
    id: number;
    name: string;
    enabled: boolean;
    type: string;
    apiKey: string;
    baseUrl: string;
    models: string;
    model: null;
    priority: number;
    usage: number;
    enableProxy: boolean;
    createdAt: number;
    [key: string]: any;
}


export const items = [
    {
        label: '渠道名称',
        subtitle: '自定义渠道名称',
        placeholder: '渠道名称',
        model: 'name',
        icon: BrandStackshareIcon,
        type: 'text'
    },
    {
        label: '接口地址',
        subtitle: '需要包含http(s)://',
        placeholder: 'Base API URL',
        model: 'baseUrl',
        icon: LinkIcon,
        type: 'text'
    },
    {
        label: 'Api key',
        subtitle: '使用自定义的OpenAI key',
        placeholder: 'API key',
        model: 'apiKey',
        icon: PasswordIcon,
        type: 'password'
    },
    {
        label: '自定义模型',
        subtitle: '添加可使用的模型',
        placeholder: 'gpt-3',
        model: 'models',
        icon: BoxModelIcon,
        type: 'select'
    },
    {
        label: '优先级',
        subtitle: '优先级越高越先使用',
        placeholder: 'Priority',
        model: 'priority',
        icon: BoneIcon,
        type: 'number'
    },
    {
        label: 'Proxy Enabled',
        subtitle: '是否使用代理',
        placeholder: 'Enable proxy',
        model: 'enableProxy',
        icon: BrandStackshareIcon,
        type: 'switch'
    },
    {
        label: 'Enabled',
        subtitle: '是否启用',
        model: 'enabled',
        icon: BrandStackshareIcon,
        type: 'switch'
    }
]
