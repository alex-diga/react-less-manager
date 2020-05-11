import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { routerMenus } from '../../route'

// const MyIcon = Icon.createFromIconfontCN({
//     scriptUrl: '//at.alicdn.com/t/font_1505404_05g1zqob7406.js', // 在 iconfont.cn 上生成
// });

class PageMenus extends React.Component {
    state = {
        openKey: [],
        selectedKeys: [],
        // path: this.props.path
    }
    componentWillReceiveProps(nextProps) { // 父组件重传props时就会调用这个方法
        if (!!nextProps.location.pathname && this.props.location.pathname !== nextProps.location.pathname) {
            this.setMenuOpen()
        }
    }
    componentDidMount() {
        this.setMenuOpen()
    }
    setMenuOpen = () => {
        // console.log(this.props.history.location.pathname)
        const defaultData = currentRouterPath(this.props.history.location.pathname)
        this.setState({
            openKey: defaultData.dufaultSub,
            selectedKeys: defaultData.dufaultKey
        });
    };
    menuClickFn = (e) => {
        this.setState({
            selectedKeys: [e.key]
        })
    }
    openChangeFn = (openKey) => {
        if (openKey.length === 1 || openKey.length === 0) {
            this.setState({
                openKey: openKey
            })
            return
        }
        const latestOpenKey = openKey[openKey.length - 1]
        if (latestOpenKey.includes(openKey[0])) {
            this.setState({
                openKey
            })
        } else {
            this.setState({
                openKey: [latestOpenKey]
            })
        }
    }
    getMenuNodes = (MenuList) => {
        return MenuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.path}>
                            {/* {item.icon && <MyIcon type={item.icon}></MyIcon>} */}
                            {item.icon && <Icon type={item.icon} />}
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <Menu.SubMenu
                        key={item.key}
                        title={
                            <span>
                                {item.icon && <Icon type={item.icon} />}
                                <span>{item.title}</span>
                            </span>
                        }>
                        {this.getMenuNodes(item.children)}
                    </Menu.SubMenu>
                )
            }
        })
    }
    render() {
        const { openKey, selectedKeys } = this.state
        return (
            <Menu
                theme='light'
                openKeys={openKey}
                selectedKeys={selectedKeys}
                onClick={this.menuClickFn.bind(this)}
                onOpenChange={this.openChangeFn.bind(this)}
                mode="inline"
                className="pageMenu"
            >
                {
                    this.getMenuNodes(routerMenus)
                }
            </Menu>
        )
    }
}

export default withRouter(PageMenus)

// 导航栏路由获取当前路径
const currentRouterPath = (path) => {
    let obj = {}
    // let path = window.location.pathname
    let arr = routerMenus
    try {
        (function poll(arr, path, subArr) {
            let sub = Array.from(subArr)
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].pkey) {
                    sub.push(arr[i].pkey)
                }
                if (arr[i].path === path) {
                    let obj = {
                        dufaultKey: arr[i].key,
                        dufaultSub: sub
                    }
                    throw (obj)
                } else if (!!arr[i].extraPath && arr[i].extraPath.length > 0) {
                    for(let j = 0 ; j < arr[i].extraPath.length; j++) {
                        if (arr[i].extraPath[j].path === path) {
                            let obj = {
                                dufaultKey: arr[i].key,
                                dufaultSub: sub
                            }
                            throw (obj)
                        }
                    }

                }
                let en = arr[i].children
                if (en && en.length > 0) {
                    poll(en, path, sub)
                }
                sub.pop()
            }
        })(arr, path, [])
    } catch (err) {
        obj = err
    }
    return obj
}