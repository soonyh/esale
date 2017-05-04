[https://soonyh.github.io/esale/modules/networkAdd/index.html](https://soonyh.github.io/esale/modules/networkAdd/index.html)

## 技术选型    

+ 视图框架 [jquery-weui](http://jqweui.com/)    
+ 数据模拟 [Mock.js](http://mockjs.com/)
+ 模板引擎 [art-template](https://github.com/aui/artTemplate/) 
+ 字体图标 [iconfont](http://www.iconfont.cn/)
+ 构建工具 [gulp](http://gulpjs.com/) 

## 文件目录

构建前

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

构建后

```
|--- build                                
|    |--- resources                       
|    |--- modules                         
```

_构建后的变化_  

> 1、删除mock文件夹，以及页面上对他的相关资源引用因为一旦接口切换到生产版本后，就不需要模拟数据了    
> 2、压缩了所有的html、js和CSS（包括遗留注释信息和console）  
> 3、合并了全局引用的插件和封装的全局方法app.js  


## 前后端分离必备神器 -mock.js

提供拦截 Ajax 请求，生成随机数据(文本、数字、布尔值、日期、邮箱、链接、图片、颜色等。)，模拟返回的数据。还可以自定义延迟响应时间的能力     

## 组件封装

封装思路： 

1. 方便复用和按需加载。
2. 定义好组件的入参(类似vue组件开发的接口属性一样)。
3. 组件包含了与之相关的所有HTML\JS\CSS(与vue的组件思路是一致的)

组件的最终形态是一个`.html`文件，通过`App.includeHtml(options)`异步加载到宿主页面。（详见app.js）

__App.includeHtml({url:'',container:'',data:{}})__     

```
/**
    * 说明：
    * 通过传入的容器id和组件地址，异步加载Html片段。
    * 自动生成一个带特定属性data-role="pie"的容器，用来包裹该html片段
    * 可以给该PIE容器传参（对象类型）,$(PIE).data('mailbox',data)
    * 组件内的脚本可以用.closest()方法追溯到该Pie容器,并提取传入的数据
    * 另外，会根据PIE容器上的reload属性值，决定多次调用时是否重新请求代码片段
    *
    * 调用方法：
    * App.includeHtml({url:'',container:'',data:{}})
    *
    * Options:
    * @url:       [必选] [string] 组件的url地址
    * @container: [必选] [string] selector,load的内容所存放的容器比如：'#con' 或者'.content .tab'
    * @data:      [选填] [Object] 传给组件的数据，以'mainbox'保存在容器上
    * @type       [string]    [选填] 填充方式'append|prepend|html'，不填默认是'html'
    * @reload:    [选填] [boolen] 表示是否允许重新拉取，默认值是true
    * @cb:        [选填] [function] 表示该组件初始化成功时的回调方法
*/
        
```

## 关于app.js 

全局引用，它自定义和二次封装了: modal,toastr,pickup,loading,validator,ajaxSetup等一个应用通常需要具备的能力。

例如App.validator():  

```
只需在input元素上添加相应的data-type属性，即可完成对元素的相应校验

<input class="form-control color-green" placeholder="宽带接入账号" 
type="text" name="account" data-type="boardbandAccount" />

```
