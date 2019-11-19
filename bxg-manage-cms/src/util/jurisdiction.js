var openCourses = [ //开通课程
    { name: '曾玉粉', mail: 'zengyufen@itcast.cn' },
    { name: '李兰菲', mail: 'lilanfei@itcast.cn' },
    { name: '韩雪凉', mail: 'hanxueliang@itcast.cn' },
]
var collectionOrder = [ //补录订单
    { name: '冯嘉萍', mail: 'fengjiaping@itcast.cn' },
    { name: '耿海燕', mail: 'genghaiyan@itcast.cn' },
    { name: '李慧慧', mail: 'lihuihui@itcast.cn' },
    { name: '刘志超', mail: 'liuzhichao@itcast.cn' },
    { name: '李云飘', mail: 'liyunpiao@itcast.cn' },
    { name: '任珊', mail: 'renshan@itcast.cn' },
    { name: '商嫒静', mail: 'shangaijing@itcast.cn' },
    { name: '孙雪', mail: 'sunxue@itcast.cn' },
    { name: '王栋3', mail: 'wangdong3@itcast.cn' },
    { name: '王慧龙', mail: 'wanghuilong@itcast.cn' },
    { name: '王林', mail: 'wanglin@itcast.cn' },
    { name: '王邵', mail: 'wangshao@itcast.cn' },
    { name: '王新等', mail: 'wangxindeng@itcast.cn' },
    { name: '吴迪1', mail: 'wudi1@itcast.cn' },
    { name: '张敏杰', mail: 'zhangminjie@itcast.cn' },
    { name: '赵苗苗', mail: 'zhaomiaomiao@itcast.cn' },
    { name: '唐诗', mail: 'tangshi@itcast.cn' },
    { name: '姜明君', mail: 'jiangmingjun@itcast.cn' },
    { name: '刘珊珊', mail: 'liushanshan@itcast.cn' },
    { name: '刘文杰', mail: 'liuwenjie@itcast.cn' },
    { name: '程瑞玲', mail: 'chengruiling@itcast.cn' },
    { name: '胡家伟', mail: 'hujiawei@itcast.cn' },
    { name: '刘荣1', mail: 'liurong1@itcast.cn' },
    { name: '王雪3', mail: 'wangxue3@itcast.cn' },
    { name: '邢慧', mail: 'xinghui@itcast.cn' },
    { name: '温福园', mail: 'wenfuyuan@itcast.cn' },
    { name: '吴金凤', mail: 'wujinfeng@itcast.cn' },
    { name: '王宇琴', mail: 'wangyuqin@itcast.cn' },
    { name: '李嘉晴', mail: 'lijiaqing@itcast.cn' },
    { name: '王馨', mail: 'wangxin3@itcast.cn' },
    { name: '杨晓婷', mail: 'yangxiaoting@itcast.cn' },
    { name: '韩景芳', mail: 'hanjingfang@itcast.cn' },
    { name: '詹文正', mail: 'zhanwenzheng@itcast.cn' },
    { name: '史明远', mail: 'shimingyuan@itcast.cn' },
    { name: '单志强', mail: 'shanzhiqiang@itcast.cn' }
]
var collectionToPayWater = [ //补录支付流水
    { name: '张翼', mail: 'zhangyi@itcast.cn' },
    { name: '陈云', mail: 'chenyun@itcast.cn' },
    { name: '张雷杨', mail: 'zhangleiyang@itcast.cn' },
    { name: '康秋菊', mail: 'kangqiuju@itcast.cn' },
    { name: '刘雅静', mail: 'liuyajing@itcast.cn' },
    { name: '靖赛琦', mail: 'jingsaiqi@itcast.cn' }
]
var auditCollectionToPay = [ //审核补录流水
    { name: '张翼', mail: 'zhangyi@itcast.cn' },
    { name: '陈云', mail: 'chenyun@itcast.cn' },
    { name: '张雷杨', mail: 'zhangleiyang@itcast.cn' },
    { name: '康秋菊', mail: 'kangqiuju@itcast.cn' },
    { name: '刘雅静', mail: 'liuyajing@itcast.cn' },
    { name: '靖赛琦', mail: 'jingsaiqi@itcast.cn' }
]

var devArr = [{ name: '丁攀峰', mail: 'dingpanfeng@itcast.cn' },
{ name: '张翔', mail: 'zhangxiang@itcast.cn' },
{ name: '蒋贝贝', mail: 'jiangbeibei@itcast.cn' },
{ name: '张小冬', mail: 'zhangxiaodong@itcast.cn' },
{ name: '刘鹏3', mail: 'liupeng3@itcast.cn' },
{ name: '黄蓉3', mail: 'huangrong3@itcast.cn' },
{ name: '郭静1', mail: 'guojing1@itcast.cn' },
{ name: '刘丹红', mail: 'liudanhong@itcast.cn' },
{ name: '王妍', mail: 'wangyan7@itcast.cn' },
{ name: '王小龙', mail: 'wangxiaolong@itcast.cn' },
{ name: '郎盈', mail: 'langying@itcast.cn' }
]

// 资讯人员邮箱，只能看到资讯管理菜单
const infoReg = /@news.bxg$/

if (process.env.type !== 'production') {
    openCourses = openCourses.concat(devArr);
    collectionOrder = collectionOrder.concat(devArr);
    collectionToPayWater = collectionToPayWater.concat(devArr);
    auditCollectionToPay = auditCollectionToPay.concat(devArr);
}
export {
    openCourses,
    collectionOrder,
    collectionToPayWater,
    auditCollectionToPay,
    infoReg
}
