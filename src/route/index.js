import Loadabler from './loading'

const Home = Loadabler(() => import('../view/home'))
const Flow = Loadabler(() => import('../view/flow'))
const FlowDetail = Loadabler(() => import('../view/flow/detail'))
const Pdf = Loadabler(() => import('../embed/pdf'))

//设置路由
/* 
 * routerMenus config说明
 * title 菜单标题
 * exact 可选, 是否精确匹配路由, 主要用于home页面
 * icon 可选, 建议一级添加icon
 * key 必选, 唯一值
 * path 必选, 路由路径
 * component 必选, 路由组件
 * extraPath 可选, 扩展子层路由
 * children <Array> 可选, 子级路由
 *  -- 子级配置一致
 */
export const routerMenus = [{
        title: '首页',
        icon: 'bars',
        key: 'k1',
        path: '/page',
        component: Home,
        exact: true
    },
    {
        title: 'pdf文件',
        key: 'k3',
        icon: 'bars',
        path: '/page/data/pdf',
        component: Pdf
    },
    {
        title: '数据流量管理',
        icon: 'bars',
        key: 'k2',
        children: [
            {
                title: '数据统计',
                pkey: 'k2',
                key: 'k2-2',
                path: '/page/flower',
                component: Flow,
                exact: true,
                extraPath: [{
                    path: '/page/flower/detail',
                    title: '数据统计详情',
                    component: FlowDetail
                }]
            }
        ]
    },
]

export const flatRouter = () => {
    let result = []
    const flat = (arr) => {
        if (arr.length > 0) {
            for (let value of arr) {
                if (isObjectFn(value)) {
                    for (let key in value) {
                        if (key === 'component' && !!value[key]) {
                            result.push(value)
                        }
                        if (isArrayFn(value[key])) {
                            flat(value[key])
                        }
                    }
                }

            }
        }
    }
    flat(routerMenus)
    return result
}

function isArrayFn(o) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(o);
    } else {
        return Object.prototype.toString.call(o) === '[object Array]';
    }
}

function isObjectFn(o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}