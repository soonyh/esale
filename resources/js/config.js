var __dirname = '../../';
/*!========================================================================
 * 接口配置
 * Author:soon
 * ======================================================================== */
$.extend(true, App, {
    modules: {
        common: {
            queryPhoneNumber: __dirname + 'modules/common/queryPhoneNumber.html',
            queryAddress: __dirname + 'modules/common/queryAddress.html',
            queryFaZhanRen: __dirname + 'modules/common/queryFaZhanRen.html',
            signaturePad: __dirname + 'modules/common/signaturePad.html',
            queryAdslKeXuanBao: __dirname + 'modules/common/queryAdslKeXuanBao.html',
            queryCdmaKeXuanBao: __dirname + 'modules/common/queryCdmaKeXuanBao.html',
        },
        networkAdd: {
            taoCanLieBiao: __dirname + 'modules/networkAdd/taocanliebiao.html',
            kuanDaiXinXi: __dirname + 'modules/networkAdd/kuanDaiXinXi.html',
            keXuanBao: __dirname + 'modules/networkAdd/keXuanBao.html',
            dingDanXinXi: __dirname + 'modules/networkAdd/dingDanXinXi.html',
            shouYinTai: __dirname + 'modules/networkAdd/shouYinTai.html',
            keXuanBaoConfig: __dirname + 'modules/networkAdd/keXuanBaoConfig.html',
            receipt: __dirname + 'modules/networkAdd/receipt.html'
        },
        businessLibrary: {
            taoCanLieBiao: __dirname + 'modules/businessLibrary/taocanliebiao.html',
            kuanDaiXinXi: __dirname + 'modules/businessLibrary/kuanDaiXinXi.html',
            keXuanBao: __dirname + 'modules/businessLibrary/keXuanBao.html',
            dingDanXinXi: __dirname + 'modules/businessLibrary/dingDanXinXi.html',
            shouYinTai: __dirname + 'modules/businessLibrary/shouYinTai.html',
            keXuanBaoConfig: __dirname + 'modules/businessLibrary/keXuanBaoConfig.html',
            receipt: __dirname + 'modules/businessLibrary/receipt.html'
        },
        smartHome: {
            taoCanLieBiao: __dirname + 'modules/smartHome/taocanliebiao.html',
            kuanDaiXinXi: __dirname + 'modules/smartHome/kuanDaiXinXi.html',
            keXuanBao: __dirname + 'modules/smartHome/keXuanBao.html',
            dingDanXinXi: __dirname + 'modules/smartHome/dingDanXinXi.html',
            shouYinTai: __dirname + 'modules/smartHome/shouYinTai.html',
            keXuanBaoConfig: __dirname + 'modules/smartHome/keXuanBaoConfig.html',
            receipt: __dirname + 'modules/smartHome/receipt.html'
        },
        newFusion: {
            taoCanLieBiao: __dirname + 'modules/newFusion/taocanliebiao.html',
            selectProduct: __dirname + 'modules/newFusion/selectProduct.html',
            xinXiTianXie: __dirname + 'modules/newFusion/xinXiTianXie.html',
            dingDanXinXi: __dirname + 'modules/newFusion/dingDanXinXi.html',
            shouYinTai: __dirname + 'modules/newFusion/shouYinTai.html',
            keXuanBaoConfig: __dirname + 'modules/newFusion/keXuanBaoConfig.html',
            receipt: __dirname + 'modules/newFusion/receipt.html'
        },
    },
    urls: {
        common: {
            queryPhoneNumber: 'common/queryPhoneNumber.json', //查询手机号
            queryAddress: 'common/queryAddress.json', //查询安装地址
            queryFaZhanRen: 'common/queryFaZhanRen.json', //查询发展人                
            confirmResource: 'common/confirmResource.json', //确认安装地址的资源
            queryAdslKeXuanBao: 'common/queryAdslKeXuanBao.json',
            queryCdmaKeXuanBao: 'common/queryCdmaKeXuanBao.json',
        },
        networkAdd: {
            taoCanLieBiao: 'networkAdd/taoCanLieBiao.json', //请求套餐列表的数据
            submitTaoCan: 'networkAdd/submitTaoCan.json', //提交选中的套餐
            kuanDaiXinXi: 'networkAdd/kuanDaiXinXi.json', //请求select下拉选项的数据
            submitKuanDaiXinXi: 'networkAdd/submitKuanDaiXinXi.json', //提交宽带信息
            keXuanBao: 'networkAdd/keXuanBao.json', //请求可选包初始化数据
            submitKeXuanBao: 'networkAdd/submitKeXuanBao.json', //提交选中的可选包
            submitDingDanXinXi: 'networkAdd/submitDingDanXinXi.json', //提交选中的可选包
            dingDanXinXi: 'networkAdd/dingDanXinXi.json', //订单信息模块，初始化数据
            matchFace: 'networkAdd/matchFace.json', //人脸识别
            queryTimeRange: 'networkAdd/queryTimeRange.json', //当选中受理时间后，异步查询可选的受理时段
            shouYinTai: 'networkAdd/shouYinTai.json', //提交宽带信息
            getAgreement: 'networkAdd/getAgreement.json', //获取受理协议
            saveReceipt: 'networkAdd/saveReceipt.json', //保存回执   
            validAccount: 'networkAdd/validAccount.json',   
            validAccount2: 'networkAdd/validAccount2.json',   
        },
        businessLibrary: {
            orderLists: 'businessLibrary/orderLists.json',  
            myLists: 'businessLibrary/myLists.json', 
            kuanDaiXinXi: 'businessLibrary/kuanDaiXinXi.json', //请求select下拉选项的数据
            submitKuanDaiXinXi: 'businessLibrary/submitKuanDaiXinXi.json', //提交宽带信息
            keXuanBao: 'businessLibrary/keXuanBao.json', //请求可选包初始化数据
            submitKeXuanBao: 'businessLibrary/submitKeXuanBao.json', //提交选中的可选包
            submitDingDanXinXi: 'businessLibrary/submitDingDanXinXi.json', //提交选中的可选包
            dingDanXinXi: 'businessLibrary/dingDanXinXi.json', //订单信息模块，初始化数据
            matchFace: 'businessLibrary/matchFace.json', //人脸识别
            queryTimeRange: 'businessLibrary/queryTimeRange.json', //当选中受理时间后，异步查询可选的受理时段
            shouYinTai: 'businessLibrary/shouYinTai.json', //提交宽带信息
            getAgreement: 'businessLibrary/getAgreement.json', //获取受理协议
            saveReceipt: 'businessLibrary/saveReceipt.json', //保存回执   
            validAccount: 'businessLibrary/validAccount.json',   
            validAccount2: 'businessLibrary/validAccount2.json',   
        },
        smartHome: {
            mainOffer: 'smartHome/mainOffer.json', //获取套餐列表前，先请求入参
            taoCanLieBiao: 'smartHome/taoCanLieBiao.json', //请求套餐列表的数据
            submitTaoCan: 'smartHome/submitTaoCan.json', //提交选中的套餐
            kuanDaiXinXi: 'smartHome/kuanDaiXinXi.json', //请求select下拉选项的数据               
            submitKuanDaiXinXi: 'smartHome/submitKuanDaiXinXi.json', //提交宽带信息
            keXuanBao: 'smartHome/keXuanBao.json', //请求可选包初始化数据
            submitKeXuanBao: 'smartHome/submitKeXuanBao.json', //提交选中的可选包
            submitDingDanXinXi: 'smartHome/submitDingDanXinXi.json', //提交选中的可选包
            dingDanXinXi: 'smartHome/dingDanXinXi.json', //订单信息模块，初始化数据
            matchFace: 'smartHome/matchFace.json', //人脸识别
            queryTimeRange: 'smartHome/queryTimeRange.json', //当选中受理时间后，异步查询可选的受理时段
            shouYinTai: 'smartHome/shouYinTai.json', //提交宽带信息
            getAgreement: 'smartHome/getAgreement.json', //获取受理协议
            saveReceipt: 'smartHome/saveReceipt.json', //保存回执   
        },
        newFusion: {
            taoCanLieBiao: 'newFusion/taoCanLieBiao.json', //请求套餐列表的数据
            submitTaoCan: 'newFusion/submitTaoCan.json', //提交选中的套餐
            selectProduct: 'newFusion/selectProduct.json',
            submitSelectProduct: 'newFusion/submitSelectProduct.json',
            XinXiTianXie: 'newFusion/XinXiTianXie.json', //请求select下拉选项的数据
            submitXinXiTianXie: 'newFusion/submitXinXiTianXie.json', //提交宽带信息
            submitDingDanXinXi: 'newFusion/submitDingDanXinXi.json', //提交选中的可选包
            dingDanXinXi: 'newFusion/dingDanXinXi.json', //订单信息模块，初始化数据
            matchFace: 'newFusion/matchFace.json', //人脸识别
            queryTimeRange: 'newFusion/queryTimeRange.json', //当选中受理时间后，异步查询可选的受理时段
            shouYinTai: 'newFusion/shouYinTai.json', //提交宽带信息
            getAgreement: 'newFusion/getAgreement.json', //获取受理协议
            saveReceipt: 'newFusion/saveReceipt.json', //保存回执   
        }
    },
    // urls: {
    //     common: {
    //         queryPhoneNumber: '/yxs_service/service/cdmaprodrel', //查询手机号
    //         queryAddress: '/yxs_service/service/requestBusiness', //查询安装地址
    //         confirmResource: '/yxs_service/service/requestBusinessSure', //确认安装地址的资源
    //         queryFaZhanRen: '/yxs_service/service/staffInfoQuery', //查询发展人 
    //     },
    //     networkAdd: {
    //         taoCanLieBiao: '/yxs_service/service/getOfferSpecsByCond', //请求套餐列表的数据
    //         submitTaoCan: '/yxs_service/service/selectSetMeal', //提交选中的套餐
    //         kuanDaiXinXi: '/yxs_service/service/queryPropOfProd', //请求select下拉选项的数据
    //         submitKuanDaiXinXi: '/yxs_service/service/broadBandInfoSub', //提交宽带信息
    //         keXuanBao: '/yxs_service/service/intf2AgentPortal', //请求可选包初始化数据
    //         submitKeXuanBao: '/yxs_service/service/optionnalPackageInfoSub', //提交选中的可选包
    //         submitDingDanXinXi: '/yxs_service/service/orderSub', //提交选中的可选包
    //         matchFace: 'networkAdd/matchFace.json', //人脸识别
    //         queryTimeRange: '/yxs_service/service/hoursQuery', //当选中受理时间后，异步查询可选的受理时段
    //         shouYinTai: '/yxs_service/service/getChargeInfo', //提交宽带信息
    //         getAgreement: 'networkAdd/getAgreement.json', //获取受理协议
    //         saveReceipt: 'networkAdd/saveReceipt.json', //保存回执  
    //         validAccount: '/yxs_service/service/addAn',
    //         validAccount2: '/yxs_service/service/deleteAn',
    //     },
    //     businessLibrary: {
    //         orderLists: 'businessLibrary/orderLists.json', //获取列表  
    //         myLists: 'businessLibrary/myLists.json', // 
    //     },
    // }
});
