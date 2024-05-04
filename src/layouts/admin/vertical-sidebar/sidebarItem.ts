import {
    KeyIcon,
    DashboardIcon,
    BrandStackshareIcon,
    BrandOpenaiIcon,
    BookIcon,
    UsersIcon,
    SettingsIcon, LockDollarIcon
} from 'vue-tabler-icons';

const items = [
    {
        title: "概况",
        icon: DashboardIcon,
        to: "/admin/dashboard"
    },
    {
        title: "API keys",
        icon: KeyIcon,

        to: "/admin/apikeys"
    },
    {
        title: "渠道",
        icon: BrandStackshareIcon,

        to: "/admin/channel"
    },
    {
        title: "模型",
        icon: BrandOpenaiIcon,

        to: "/admin/models"
    },
    {
        title: "知识库",
        icon: BookIcon,
        to: "/admin/knowledge"
    },
    {
        title: "用户管理",
        icon: UsersIcon,
        to: "/admin/users"
    },
    {
        title: "日志",
        icon: LockDollarIcon,
        to: "/admin/logs"
    },
    {
        title: "设置",
        icon: SettingsIcon,
        to: "/admin/settings"
    },
];


export default items;