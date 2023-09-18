### 海风小店，开源商城（后台管理端VUE）

+ 基于开源项目NideShop重建，精简了一些功能的同时完善了一些功能，并重新设计了UI
+ 测试数据来自上述开源项目
+ 服务端api基于Ｎode.js+ThinkJS+MySQL
+ 后台管理 基于VUE.js+element-ui

### 基于海风小店开发上线的小程序
<img width="200" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/mwyx.jpg">

#### 视频教程
https://www.bilibili.com/video/av89568075

#### 本项目需要配合  
服务端： https://github.com/iamdarcy/hioshop-server  
微信小程序：https://github.com/iamdarcy/hioshop-miniprogram

线上demo：https://www.qile.club/hiolabs  
用户名：hiolabs  
密码：hiolabs

<a target="_blank" href="https://www.aliyun.com/?source=5176.11533457&userCode=zm04niet"><img width="1400" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/aliyun.jpg"></a>
阿里云主机：低至2折 <a target="_blank" href="https://www.aliyun.com/?source=5176.11533457&userCode=zm04niet">立即去看看</a>

### 项目截图
+ Dashboard

<img width="900" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/dashboard.jpg"/>

+ 订单

<img width="900" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/order.jpg"/>

+ 电子面单生成

<img width="900" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/express2.jpg"/>

+ 商品管理

<img width="900" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/goods.jpg"/>

+ 购物车

<img width="900" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/cart.jpg"/>

+ 用户

<img width="900" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/user.jpg"/>

+ 运费模板

<img width="900" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/template.jpg"/>

+ 运费模板详情页

<img width="900" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/template2.jpg"/>

### 本地开发环境配置
+ 克隆项目到本地
```
git clone https://github.com/iamdarcy/hioshop-admin-web  
```
+ 安装依赖
```
npm install
```

如果安装不成功，百度搜索cnpm，用淘宝源代替，替换后，用cnpm i进行安装依赖  


如果出现这个问题：Object.fromEntries is not a function
看下面这篇文章进行解决：
https://www.cnblogs.com/ykbk/p/16615610.html


+ 启动
```
npm run dev
```

+ build 打包成静态文件
```
npm run build:prod 或者 sudo npm run build:prod  
```

生成的静态文件在dist的web文件夹中，上传到服务器就可以在浏览器中打开了。

### 功能列表
+ 订单管理：查看，修改订单价格，发货，生成电子面单，修改订单状态
+ 商品管理：添加、修改、删除商品，添加商品分类
+ 购物车：可以看到用户加入购物车的情况
+ 用户列表：用户的一些使用踪迹
+ 店铺设置：广告列表，公告管理，运费模板（可以根据地区设置相应的运费），管理员

- 项目地址  
后台管理：https://github.com/iamdarcy/hioshop-admin  
服务端： https://github.com/iamdarcy/hioshop-server  
微信小程序：https://github.com/iamdarcy/hioshop-miniprogram  

- 本项目会持续更新和维护，喜欢别忘了 Star，有问题可通过微信、QQ群联系我，谢谢您的关注。
- 我的微信号是lookgxl，加群时回答这个问题即可入群。  
海风小店小程序商城1群 824781955（满）  
海风小店小程序商城2群 932101372（满）    
海风小店小程序商城3群 1130172339（满）  
海风小店小程序商城4群 652317079   

加我个人微信时，请先star。  
<img width="500" src="https://raw.githubusercontent.com/iamdarcy/hiolabs/master/git-images/contact.jpg"/>

