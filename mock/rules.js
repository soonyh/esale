  $.ajaxSetup({
      data: Math.random().toString()
  });

  function getDataType(data) {
      var str = Object.prototype.toString.call(data);
      return str.split(' ')[1].substring(0, str.split(' ')[1].length - 1)
  }
  $(document).ajaxSuccess(function(event, jqXHR, ajaxOptions) {
      var data = ajaxOptions.data == undefined ? null : ajaxOptions.data
          // 只能打印出get类型的传参
      console.group('===================');
      console.info('请求地址：%s', ajaxOptions.url);
      console.log('提交数据 [%s]: %s', getDataType(data), decodeURIComponent(data));
      if (jqXHR.responseJSON) {
          console.log('返回数据 [%s]: %s', getDataType(jqXHR.responseJSON), JSON.stringify(jqXHR.responseJSON, null, '\t'))
      };
      console.groupEnd();
  });
  var Random = Mock.Random;
  Mock.setup({
      timeout: '11-1000'
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  //common
  //////////////////////////////////////////////////////
  Mock.mock(/common\/queryPhoneNumber.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "list": [{
          "label|+1": 17708068645,
          "value|+1": 1
      }]
  });
  Mock.mock(/common\/queryAddress.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "list|10-20": [{
          "label": function() {
              return Random.province() + ' ' + Random.city() + ' ' + Random.ctitle(5, 20)
          },
          "value|+1": 1
      }],
      "total": 56
  });
  Mock.mock(/common\/queryFaZhanRen.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "resultData": {
          "staffId|+1": 1239,
          "staffName": "@cname"
      }
  });
  Mock.mock(/common\/confirmResource.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "resultData": {
          "Ponmodel": "1",
          "Siteid": "30367",
          "Modeshowid": "",
          "OLTVENDORNAME": "",
          "Districtid": "22017",
          "Addrname": "天津天津市武清区下朱庄街天和林溪（博园）7号楼703",
          "ValidateResult": "0",
          "Connmodechoose": "",
          "Modeshowname": "",
          "result": "0",
          "ISIPTV": "1",
          "Sitename": "武清局",
          "AddrID": "100000438617",
          "Prodspecid": "9",
          "ISSXSZ": "null",
          "desc": "成功",
          "OLTVENDORID": "",
          "Speedrate": "4M"
      }
  });
  Mock.mock(/common\/queryAdslKeXuanBao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "list|10-20": [{
          "label": function() {
              return Random.province() + ' ' + Random.city() + ' ' + Random.ctitle(5, 20)
          },
          "value|+1": 1
      }],
  });
  Mock.mock(/common\/queryCdmaKeXuanBao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "resultData": {
          "staffId|+1": 1239,
          "staffName": "@cname"
      }
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  //networkAdd
  //////////////////////////////////////////////////////
  Mock.mock(/networkAdd\/taoCanLieBiao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "list|10": [{
          "id|+1": 300112,
          "title": "@ctitle(5,20)",
          "description": "@cparagraph(2)"
      }],
      total: 33
  })
  Mock.mock(/networkAdd\/submitTaoCan.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  //初始化数据
  Mock.mock(/networkAdd\/kuanDaiXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      payTypes: [{
          label: "预付费",
          value: "@natural(1000, 600000)"
      }, {
          label: "后付费",
          value: "@natural(1000, 600000)",
      }],
      speedTypes: [{
          label: "20M",
          value: "4083583"
      }, {
          label: "40M",
          value: "408358",
          select: true,
      }],
      flags: [{
          label: "催、停、拆",
          value: "@natural(1000, 600000)",
          select: true
      }],
      boardbandAccount: '12345678',
  });
  Mock.mock(/networkAdd\/validAccount.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "success": 0,
      "anId": "@natural(1000,2000)",
  });
  Mock.mock(/networkAdd\/validAccount2.json/, {
      "health": {
          "code": 1,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "success": 1
  });
  Mock.mock(/networkAdd\/submitKuanDaiXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  //configOptions字段为空数组，表示不需要显示button(参)
  Mock.mock(/networkAdd\/keXuanBao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "list|10": [{
          "id|+1": 100112,
          "title": function() {
              return '冲' + Random.natural(100, 500) + '送300 ' + Random.cword(5, 10)
          },
          "configOptions|0-3": [{
              "id|+1": 1002,
              "options|0-3": [{
                  "label": "@cword(4,10)",
                  "value|+1": 4323
              }]              
          }]
      }]
  });
  Mock.mock(/networkAdd\/submitKeXuanBao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  Mock.mock(/networkAdd\/submitDingDanXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  Mock.mock(/networkAdd\/matchFace.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "matchRate": function() {
          return Random.natural(0, 100) + '%人证相符'
      }
  });
  Mock.mock(/networkAdd\/queryTimeRange.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "data": [{
          "label": "8:00 - 12:00",
          "value": 112
      }, {
          "label": "15:00 - 18:00",
          "value": 2112
      }, {
          "label": "20:00 - 24:00",
          "value": 212
      }]
  });
  Mock.mock(/networkAdd\/shouYinTai.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "olId|+1": 112312,
      "accNbr": "13675060325",
      "list": [{
          "label": "制卡费",
          "value": function() {
              return Random.natural(1, 100)
          }
      }, {
          "label": "话费预存款",
          "value": function() {
              return Random.natural(100, 1000)
          }
      }],
      "balance": {
          "appCharge": function() {
              return Random.natural(100, 1000)
          },
          "agentBalance": function() {
              return Random.natural(100, 1000)
          },
          "inoutBalance": function() {
              return Random.natural(100, 1000)
          },
          "payCost": function() {
              return Random.natural(100, 1000)
          },
      }
  });
  Mock.mock(/networkAdd\/getAgreement.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "pic": "../../resources/pic/pdf.jpg"
  });
  Mock.mock(/networkAdd\/saveReceipt.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  //smartHome
  //////////////////////////////////////////////////////
  Mock.mock(/smartHome\/mainOffer.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          ChannelNbr: "@cword(5,20)",
          StaffCode: "@natural(60, 100)",
          RegionCode: "@province",
          ProdOfferName: "@cword(5,20)",
          ProdSpecId: "@natural(60, 100)"
      }
  });
  Mock.mock(/smartHome\/taoCanLieBiao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "list|10": [{
          "id|+1": 300112,
          "title": "@ctitle(5,20)",
          "description": "@cparagraph(2)"
      }],
      total: 33
  })
  Mock.mock(/smartHome\/submitTaoCan.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  //初始化数据
  Mock.mock(/smartHome\/kuanDaiXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      payTypes: [{
          label: "预付费",
          value: "@natural(1000, 600000)"
      }, {
          label: "后付费",
          value: "@natural(1000, 600000)"
      }],
      speedTypes: [{
          label: "20M",
          value: "@natural(1000, 600000)"
      }, {
          label: "40M",
          value: "@natural(1000, 600000)"
      }],
      lineTypes: [{
          label: "光纤",
          value: "@natural(1000, 600000)"
      }, {
          label: "普通宽带",
          value: "@natural(1000, 600000)"
      }],
      modemTypes: [{
          label: "四口光猫",
          value: "@natural(1000, 600000)"
      }, {
          label: "二口光猫",
          value: "@natural(1000, 600000)"
      }],
      activeTypes: [{
          label: "即装即销",
          value: "@natural(1000, 600000)"
      }, {
          label: "不要即装即销",
          value: "@natural(1000, 600000)"
      }]
  });
  Mock.mock(/smartHome\/submitKuanDaiXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  //configOptions字段为空数组，表示不需要显示button(参)
  Mock.mock(/smartHome\/keXuanBao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "activityTypes|4": [{
          "label": "@ctitle(5,10)",
          "value|+1": 5421
      }],
      "list|10": [{
          "id|+1": 100112,
          "title": function() {
              return '冲' + Random.natural(100, 500) + '送300 ' + Random.cword(5, 10)
          },
          "activityType|+1": 5421,
          "configOptions|0-2": [{
              "label": "@cword(4,10)",
              "value|+1": 4323
          }]
      }]
  });
  Mock.mock(/smartHome\/submitKeXuanBao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  Mock.mock(/smartHome\/submitDingDanXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  Mock.mock(/smartHome\/dingDanXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "channels|2-6": [{
          "label": function() {
              return Random.province() + ' ' + Random.city() + ' ' + Random.cword(2, 5) + '营业厅'
          },
          "value|+1": 23523
      }]
  });
  Mock.mock(/smartHome\/matchFace.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "matchRate": function() {
          return Random.natural(0, 100) + '%人证相符'
      }
  });
  Mock.mock(/smartHome\/queryTimeRange.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "data": [{
          "label": "8:00 - 12:00",
          "value": 112
      }, {
          "label": "15:00 - 18:00",
          "value": 2112
      }, {
          "label": "20:00 - 24:00",
          "value": 212
      }]
  });
  Mock.mock(/smartHome\/shouYinTai.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "orderNumber|+1": 112312,
      "total": "@natural(30, 3600)",
      "productName": "13675060325",
      "simCardFee": "@natural(10, 30)",
      "prestoreMoney": "@natural(100, 600)"
  });
  Mock.mock(/smartHome\/getAgreement.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "pic": "../../resources/pic/pdf.jpg"
  });
  Mock.mock(/smartHome\/saveReceipt.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  //newFusion
  //////////////////////////////////////////////////////
  Mock.mock(/newFusion\/taoCanLieBiao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "list|10": [{
          "id|+1": 300112,
          "title": "@ctitle(5,20)",
          "description": "@cparagraph(2)",
          "roles": {
              "mobile": {
                  "roleCd": '1',
                  "max": '5',
                  "min": '1',
                  "prodSpecId": '1233'
              },
              "boardband": {
                  "roleCd": '2',
                  "max": '5',
                  "min": '1',
                  "prodSpecId": '1234'
              },
              "tianYiGaoQin": {
                  "roleCd": '3',
                  "max": '5',
                  "min": '1',
                  "prodSpecId": '1234'
              }
          }
      }]
  })
  Mock.mock(/newFusion\/submitTaoCan.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  //初始化数据
  Mock.mock(/newFusion\/selectProduct.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "mobile|1-5": [{
          "label|+1": 13675060325,
          "value": "@natural(1000, 600000)"
      }],
      "boardband|1-5": [{
          "label|+1": 13675060325,
          "value": "@natural(1000, 600000)"
      }],
      "tianYiGaoQin|1-5": [{
          "label|+1": 13675060325,
          "value": "@natural(1000, 600000)"
      }]
  });
  Mock.mock(/newFusion\/submitSelectProduct.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  //configOptions字段为空数组，表示不需要显示button(参)
  Mock.mock(/newFusion\/xinXiTianXie.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "activityTypes|4": [{
          "label": "@ctitle(5,10)",
          "value|+1": 5421
      }],
      "list|10": [{
          "id|+1": 100112,
          "title": function() {
              return '冲' + Random.natural(100, 500) + '送300 ' + Random.cword(5, 10)
          },
          "activityType|+1": 5421,
          "configOptions|0-2": [{
              "label": "@cword(4,10)",
              "value|+1": 4323
          }]
      }]
  });
  Mock.mock(/newFusion\/submitxinXiTianXie.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  Mock.mock(/newFusion\/submitDingDanXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  Mock.mock(/newFusion\/dingDanXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "channels|2-6": [{
          "label": function() {
              return Random.province() + ' ' + Random.city() + ' ' + Random.cword(2, 5) + '营业厅'
          },
          "value|+1": 23523
      }]
  });
  Mock.mock(/newFusion\/matchFace.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "matchRate": function() {
          return Random.natural(0, 100) + '%人证相符'
      }
  });
  Mock.mock(/newFusion\/queryTimeRange.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "data": [{
          "label": "8:00 - 12:00",
          "value": 112
      }, {
          "label": "15:00 - 18:00",
          "value": 2112
      }, {
          "label": "20:00 - 24:00",
          "value": 212
      }]
  });
  Mock.mock(/newFusion\/shouYinTai.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "orderNumber|+1": 112312,
      "total": "@natural(30, 3600)",
      "productName": "13675060325",
      "simCardFee": "@natural(10, 30)",
      "prestoreMoney": "@natural(100, 600)"
  });
  Mock.mock(/newFusion\/getAgreement.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "pic": "../../resources/pic/pdf.jpg"
  });
  Mock.mock(/newFusion\/saveReceipt.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  ///////////////////////////////////////////////////////////////////////////////////////
  //business library
  //////////////////////////////////////////////////////
  Mock.mock(/businessLibrary\/orderLists.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "list|10": [{
          "orderTime": function() {
              return Random.date() + ' [' + Random.time() + ']'
          },
          "orderNumber|+1": 1374636273653627,
          "address": function() {
              return Random.province() + ' ' + Random.city() + ' ' + Random.ctitle(5, 20)
          },
          "remark": "@cparagraph(1)"
      }],
      total: "25"
  });
  Mock.mock(/businessLibrary\/myLists.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "list|10": [{
          "orderNumber|+1": 1374636273653627,
          "address": function() {
              return Random.province() + ' ' + Random.city() + ' ' + Random.ctitle(5, 20)
          },
          "phone|+1": 13675060325,
          "state|1":[0,1],
          "remark": "@cparagraph(1)"
      }],
      total: "25"
  });
 //初始化数据
  Mock.mock(/businessLibrary\/kuanDaiXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      payTypes: [{
          label: "预付费",
          value: "@natural(1000, 600000)"
      }, {
          label: "后付费",
          value: "@natural(1000, 600000)",
      }],
      speedTypes: [{
          label: "20M",
          value: "4083583"
      }, {
          label: "40M",
          value: "408358",
          select: true,
      }],
      flags: [{
          label: "催、停、拆",
          value: "@natural(1000, 600000)",
          select: true
      }],
      boardbandAccount: '12345678',
  });
  Mock.mock(/businessLibrary\/validAccount.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "success": 0,
      "anId": "@natural(1000,2000)",
  });
  Mock.mock(/businessLibrary\/validAccount2.json/, {
      "health": {
          "code": 1,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "success": 1
  });
  Mock.mock(/businessLibrary\/submitKuanDaiXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  //configOptions字段为空数组，表示不需要显示button(参)
  Mock.mock(/businessLibrary\/keXuanBao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "list|10": [{
          "id|+1": 100112,
          "title": function() {
              return '冲' + Random.natural(100, 500) + '送300 ' + Random.cword(5, 10)
          },
          "configOptions|0-3": [{
              "id|+1": 1002,
              "options|0-3": [{
                  "label": "@cword(4,10)",
                  "value|+1": 4323
              }]              
          }]
      }]
  });
  Mock.mock(/businessLibrary\/submitKeXuanBao.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  Mock.mock(/businessLibrary\/submitDingDanXinXi.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });
  Mock.mock(/businessLibrary\/matchFace.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "matchRate": function() {
          return Random.natural(0, 100) + '%人证相符'
      }
  });
  Mock.mock(/businessLibrary\/queryTimeRange.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "data": [{
          "label": "8:00 - 12:00",
          "value": 112
      }, {
          "label": "15:00 - 18:00",
          "value": 2112
      }, {
          "label": "20:00 - 24:00",
          "value": 212
      }]
  });
  Mock.mock(/businessLibrary\/shouYinTai.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "olId|+1": 112312,
      "accNbr": "13675060325",
      "list": [{
          "label": "制卡费",
          "value": function() {
              return Random.natural(1, 100)
          }
      }, {
          "label": "话费预存款",
          "value": function() {
              return Random.natural(100, 1000)
          }
      }],
      "balance": {
          "appCharge": function() {
              return Random.natural(100, 1000)
          },
          "agentBalance": function() {
              return Random.natural(100, 1000)
          },
          "inoutBalance": function() {
              return Random.natural(100, 1000)
          },
          "payCost": function() {
              return Random.natural(100, 1000)
          },
      }
  });
  Mock.mock(/businessLibrary\/getAgreement.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      "pic": "../../resources/pic/pdf.jpg"
  });
  Mock.mock(/businessLibrary\/saveReceipt.json/, {
      "health": {
          "code": 0,
          "message": function() {
              if (this.code != 0) {
                  return "返回数据异常"
              }
          }
      },
      data: {
          token: "@natural(1000, 600000)"
      }
  });