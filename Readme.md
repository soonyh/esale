[https://soonyh.github.io/esale/modules/networkAdd/index.html](https://soonyh.github.io/esale/modules/networkAdd/index.html)

## 技术选型    

+ 视图框架 [jquery-weui](http://jqweui.com/)    
+ 数据模拟 [Mock.js](http://mockjs.com/)
+ 模板引擎 [art-template](https://github.com/aui/artTemplate/) 
+ 字体图标 [iconfont](http://www.iconfont.cn/)
+ 构建工具 [gulp](http://gulpjs.com/) 

## 文件目录

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
|    |    |--- module3                   # 场景3
|    |--- mock                           # 数据模拟
|    |    |--- mock.js                   # mock.js插件
|    |    |--- rules.js                  # 自定义的映射规则
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

> 1、删除mock文件夹，以及页面上对他的相关资源引用因为一旦接口切换到生产版本后，就不需要模拟数据了    
> 2、压缩了所有的html、js和CSS（包括遗留注释信息和console）  
> 3、合并了全局引用的插件和封装的全局方法app.js  

## 组件封装

封装思路： 

+ 方便复用和按需加载。
+ 定义好组件的入参以及它的执行任务。
+ 组件包含了与之相关的所有HTML\JS\CSS(与vue的组件思路是一致的)

组件的最终形态是一个`.html`文件，通过`App.includeHtml(options)`异步加载到宿主页面。（详见app.js）