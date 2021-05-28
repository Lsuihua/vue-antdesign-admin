const getters = {
    collapsed : state => state.app.collapsed,
    currentMenu: state => state.app.currentMenu,
    menu: state => state.app.menu,
    menuSelect: state => state.app.menuSelect,
    defaultMenuKey: state => state.app.defaultMenuKey,
    openKey: state => state.app.openKey,
    breadcrumb: state => state.app.breadcrumb,
    viewSize:state => state.app.viewSize
}

export default getters