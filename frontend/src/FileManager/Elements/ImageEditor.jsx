import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import '../Assets/tui-image-editor.css'
import whiteTheme from '../Assets/whiteTheme';
// 第三方组件
import ImageEditor from '@toast-ui/react-image-editor'
import Dialog from '@material-ui/core/Dialog';
import Zoom  from '@material-ui/core/Zoom';
// 自定义组件
import ButtonList from './ButtonGroup';


const useStyles = makeStyles(theme => ({
  buttonsCont: {
    textAlign: 'center',
    borderRadius: '0px 0px 5px 5px',
    border: '1px solid #E9eef9',
    borderTop:'none',
    padding:'15px',
    background:'#fff'
  },
dialog:{
}

}));

export default function ImageEditPopup(props){
    // 父组件提供的参数
    const {closeCallBack, submitCallback, name, extension, path, open } = props;
    // style hook api
    const classes = useStyles();
    // ref
    const editorRef = React.createRef();

    // 处理点击操作
    const handleClickButton = (asNew) => {
        // 文件格式
      const format = extension !== '.jpg' ? 'jpeg' : 'png';
        // 实例对象
      const editorInstance = editorRef.current.getInstance();
        // 图片格式转换？
      const imageData = editorInstance._graphics.toDataURL({
        quality: 0.7,
        format
      });
        // 回调
      submitCallback(imageData, asNew);
    };

        // 按钮
    const buttons = [
      {
        name: 'submit',
        icon: 'icon-exit',
        label: 'Save & Quit',
        class: 'green',
        onClick: ()=>handleClickButton(false)
      },
      {
        name: 'update',
        icon: 'icon-save',
        label: 'Save as new file',
        class: 'blue',
        onClick: ()=>handleClickButton(true)
      },
      {
        name: 'submit',
        icon: 'icon-ban',
        label: 'Cancel',
        class: 'red',
        onClick: ()=>closeCallBack()
      }
    ];

    // material-ui Dialog动画设置
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Zoom in={props.open} ref={ref} {...props} />;
    });
  
    return (
        // 使用详情查看：https://v4.mui.com/zh/api/dialog/
      <Dialog
        open={Boolean(open)}
        TransitionComponent={Transition}
        fullWidth
        maxWidth={'xl'}
        onClose={closeCallBack}
        className={classes.dialog}
      >
          {/* 使用详情查看：https://nhn.github.io/tui.image-editor/latest/ImageEditor */}
          <ImageEditor 
            ref={editorRef}
            includeUI={{
                loadImage: {
                    path: path,
                    name: name
                },
                theme: whiteTheme,
                initMenu: 'filter',
                uiSize: {
                    width: '100%',
                    height: '700px'
                },
                menuBarPosition: 'bottom'
            }}
                cssMaxHeight={500}
                selectionStyle={{
                cornerSize: 20,
                rotatingPointOffset: 70
            }}

            // 关闭google ansys
            usageStatistics={false}
          />

          <div className={classes.buttonsCont} >
            <ButtonList buttons={buttons} />
          </div>

        </Dialog>
    );
}