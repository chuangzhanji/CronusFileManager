import React from 'react';
import { connect } from 'react-redux';
// redux action
import { getTranslations, langChange } from './Redux/actions';
// 主组件
import FileManager from './FileManager/FileManager';
// material-ui makeStyles 可实现对css封装，参考教程：https://v4.mui.com/zh/styles/basics/
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    root: {
    }
}));

function App(props){
    // material-ui hook api
    const classes = useStyles();

    // translations/lang均为预定义的redux state值
    if(props.translations.lang !== props.lang){
        // 导入对应的语言包
        import(`./Data/Languages/${props.lang}`)
            // 如果导入成功，将语言包数据保存到redux state translations，并保存语言类型lang
        .then(result => {
            // 执行redux reducer getTranslations
            props.getTranslations({
                lang:props.lang,
                data: result.default
            });
            // 导入失败时，保存语言类型lang，语言数据为空
        }).catch(e =>{
            props.getTranslations({
                lang:props.lang,
                data: {}
            });
        });
    }

    // filePath???
    const handleCallBack = (filePath)=> {
        console.log('Image Path Returend', filePath);
    }

    return (
        <div className={classes.root} >
            <FileManager height='580' callback={handleCallBack} />
        </div>
    );

}

const mapStateToProps = store => ({
    store,
    translations : store.dashboard.translations,
    lang : store.dashboard.lang,
});

const mapDispatchToProps = dispatch => ({
    langChange: (lang) => dispatch(langChange(lang)),
    getTranslations: (data) => dispatch(getTranslations(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);