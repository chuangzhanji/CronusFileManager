import React from "react";
import { connect } from 'react-redux';
// redux action
import { setSorting, filterSorting, setImagesSettings } from '../Redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import TopBarButtonGroups from './Elements/TopBarButtonGroups';
// material-ui组件
import { Grid, Radio, Divider, FormControlLabel } from '@material-ui/core/';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// 样式
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    container: {
        padding: '5px',
        borderBottom: '1px solid #868DAA',
        background: "#f6f7fd"
    },
    menuItem:{
        padding:'0px',
        fontSize: '13px',
        width: '250px',
        display:'block',
        '& span':{
            fontSize: '13px'
        },
        '& label':{
            margin:'0px'
        },
        '& svg':{
            width: '15px'
        }
    }
}));


function TopBar(props){
    const classes = useStyles();
    const { buttons , orderFiles, showImages} = props;
    //
    const [anchorEl, setAnchorEl] = React.useState(null);
    // 菜单显示
    const [open, setOpen] = React.useState({sorting:false,search:false,settings:false});

    // 显示菜单
    const handleOpenMenu = (event, name) => {
        switch (name) {
            case 'sorting':
                setOpen({sorting: true})
                break;
            case 'search':
                setOpen({search: true})
                break;
            case 'settings':
                setOpen({settings: true})
                break;
        
            default:
                break;
        }
        // 弹出菜单绑定
        setAnchorEl(event.currentTarget);
    };

    // 执行文件排序
    const handleSetOrderBy = (orderBy) =>{
        props.setSorting(orderBy, orderFiles.field);
        props.filterSorting();
    }

    // 执行文件排序正反序
    const handleSetOrderField = (field) =>{
        props.setSorting(orderFiles.orderBy, field);
        props.filterSorting();
    }

    // 关闭弹出窗口
    const handleClose = () => {
        setAnchorEl(null);
        setOpen({sorting:false,search:false,settings:false});
    };

    // 更改image显示设置
    const handleSetSettings = (imagePreview) =>{
        props.setImagesSettings(imagePreview);
    }


    // 选项
    const options = [
        {
            name: 'By Name',
            value:'name'
        },
        {
            name: 'By Size',
            value:'size'
        },
        {
            name: 'By Create Date',
            value:'date'
        }
    ];

    // 按钮属性定义
    const additionalButtons = [
        {
            title: 'Sorting',
            icon: 'icon-settings',
            onClick: (e)=> handleOpenMenu(e,'sorting'),
            disable: false
        },
        {
            title: 'Settings',
            icon: 'icon-settings-1',
            onClick: (e)=> handleOpenMenu(e,'settings'),
            disable: false
        }
    ]

    return (
        <>
            <Grid container className={classes.container} >
                {/*topbar按钮*/}
                {buttons.topbar.map((groups, index)=> 
                    <Grid item key={index}>
                        <TopBarButtonGroups buttons={groups} index={index} />
                    </Grid>
                )}


                <Grid style={{ marginLeft: "auto" }}>
                    {/*排序按钮和设置按钮*/}
                    <TopBarButtonGroups buttons={additionalButtons} />
                        {/*两个弹出菜单*/}
                        <Menu
                            id="sorting-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(open.sorting)}
                            onClose={handleClose}
                        >
                            {options.map((option,index) => (
                                <MenuItem key={index} className={classes.menuItem} selected={option.value === orderFiles.field}>
                                        <FormControlLabel value={option.value} control={
                                            <Radio name='orderField' checked={option.value === orderFiles.field} onChange={()=>handleSetOrderField(option.value)} value={option.value} />
                                        } label={option.name}  />
                                </MenuItem>
                            ))}
                            <Divider />
                            <MenuItem className={classes.menuItem} selected={'asc' === orderFiles.orderBy}>
                                <FormControlLabel control={<Radio name='orderby' checked={'asc' === orderFiles.orderBy} onChange={()=>handleSetOrderBy('asc')} value='asc' />} label='Ascending'  />
                            </MenuItem>
                            <MenuItem className={classes.menuItem} selected={'desc' === orderFiles.orderBy}>
                                <FormControlLabel control={<Radio name='orderby' checked={'desc' === orderFiles.orderBy} onChange={()=>handleSetOrderBy('desc')} value='desc' />} label='Descending'  />
                            </MenuItem>
                        </Menu>


                        <Menu
                            id="settings-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(open.settings)}
                            onClose={handleClose}
                        >
                            <MenuItem className={classes.menuItem} selected={showImages === 'thumbs'}>
                                <FormControlLabel control={
                                    <Radio name='imageSettings' checked={showImages === 'thumbs'} onChange={()=>{handleSetSettings('thumbs')}} value='thumbs' />
                                } label='Show Thumbs'  />
                            </MenuItem>
                            <MenuItem className={classes.menuItem} selected={showImages === 'icons'}>
                                <FormControlLabel control={
                                    <Radio name='imageSettings' checked={showImages === 'icons'} onChange={()=>{handleSetSettings('icons')}} value='icons' />
                                } label='Show Icons'  />
                            </MenuItem>
                        </Menu>

                </Grid>

            </Grid>

        </>
    )
}


const mapStateToProps = store => ({
    store,
    selectedFiles: store.filemanager.selectedFiles,
    selectedFolder: store.filemanager.selectedFolder,
    bufferedItems: store.filemanager.bufferedItems,
    foldersList: store.filemanager.foldersList,
    filesList: store.filemanager.filesList,
    itemsView: store.filemanager.itemsView,
    showImages: store.filemanager.showImages,
    orderFiles: store.filemanager.orderFiles,
    history: store.filemanager.history,
    translations : store.dashboard.translations,
    lang : store.dashboard.lang,
});

const mapDispatchToProps = dispatch => ({
    setSorting: (orderBy, field) => dispatch(setSorting(orderBy, field)),
    filterSorting: () => dispatch(filterSorting()),
    setImagesSettings:(imagePreview)=>dispatch(setImagesSettings(imagePreview)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
