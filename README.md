# 微服务App架构
基于Single-SPA和Webpack
1个中心基座+3个子应用（1个toC前台，1个toB后台，1个toB后台分支）

# 技术栈：
基座：Vue
toC前台：React
toB后台：Vue
<!-- toB后台分支：React -->

# 机票H5页面：
2个底部菜单：主页、我的
机票：http://localhost:6661/flight
我的：http://localhost:6661/admin

# 前台：
首页：
航班列表页：/flight/list/sha-bjs?depdate=2022-09029
  舱位列表：展开收缩seat
    登录浮层signin
录入页：/checkout/passenger?seatid=123
  支付浮层
完成页：/flight/order?oid=123

# 舱位等级
头等舱F、公务舱C、经济舱Y

# 字段
首页：出发地、目的地、出发日期、搜索按钮
航班列表页：航司名称、出发时间、到达时间、价格、订票按钮
  舱位列表：（点击订票按钮展开收缩）航司名称、价格、选购按钮
    登录浮层：邮箱、密码、登录按钮
录入页：
  乘机人：姓名、身份证、手机号、邮箱
  支付浮层：
    订单编号、订单简略描述、支付按钮
完成页：
  订单编号、航司名称、出发地、目的地、出发时间、到达时间、价格、乘机人
订单列表页：
  订单编号、航司名称、出发地、目的地、出发时间、到达时间、价格、乘机人


# 后台：
个人中心：/admin
订单列表：/admin/order/list
航司列表：/admin/airline/list
  新增浮层
新增航班：/admin/flight/add?aid=123
舱位管理：/admin/flight/seats?fid=123
  新增浮层
  编辑浮层
