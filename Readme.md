# 翼销售APP

## 技术选型    

+ 视图框架 [jquery-weui](http://jqweui.com/)    
+ 数据模拟 [Mock.js](http://mockjs.com/)
+ 模板引擎 [art-template](https://github.com/aui/artTemplate/) 
+ 字体图标 [iconfont](http://www.iconfont.cn/)
+ 构建工具 [gulp](http://gulpjs.com/) 

## 目录

### 构建前

```
|--- src                                 # 被构建的目标资源目录
|    |--- resources                      # 静态资源目录
|    |    |--- css
|    |    |--- fonts
|    |    |--- img
|    |    |--- plugins                   # 插件目录
|    |    |    |--- jqWeUI         
|    |    |    |    |--- jquery-weui.js          
|    |    |    |    |--- jquery-weui.css          
|    |    |    |--- jquery.js        
|    |    |    |--- template.js        
|    |    |    |--- ...        
|    |    |--- js                        
|    |    |    |--- app.js               # 局引用的自定义函数                  
|    |--- modules                        
|    |    |--- networkAdd                # 场景1：宽带新装
|    |    |    |--- index.html           # 组织整个场景的索引页面（每个场景）
|    |    |    |--- index.js             # 负责整个场景
|    |    |    |--- dingDanXinXi.html    
|    |    |    |--- taoCanLieBiao.html 
|    |    |    |--- ...
|    |    |--- module2                   # 场景2
|    |    |--- module3         
|    |--- mock                           # 数据模拟
|    |    |--- mock.js                   # mock.js插件
|    |    |--- rules.js                  # 映射规则
|--- .gitignore                          # git时忽略的文件配置
|--- gulpfile.js                         # gulp配置文件
└── package.json                         # 命令和依赖列表                 
```

### 构建后

```
|--- build                                
|    |--- resources                       
|    |--- modules                         
```

_构建后的变化_  

> 1、删除mock文件夹，以及页面上对他的相关资源引用因为一旦接口切换到生成版本后，就不需要模拟数据了    
> 2、压缩了所有的js和CSS（包括遗留在页面上的console信息）  
> 3、合并了全局引用的插件和封装的全局方法app.js  