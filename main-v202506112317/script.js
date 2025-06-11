// 高德地名转坐标函数
function geocodeAddress(address) {
    return new Promise((resolve) => {
        AMap.plugin('AMap.Geocoder', () => {
            const geocoder = new AMap.Geocoder();
            geocoder.getLocation(address, (status, result) => {
                if (status === 'complete' && result.geocodes.length) {
                    resolve([result.geocodes[0].location.lng, result.geocodes[0].location.lat]);
                } else {
                    resolve(null);
                }
            });
        });
    });
}

// 高德API配置
const AMAP_CONFIG = {
    key: '8208cbde287c4836cb4b23272fddee03',
    drivingUrl: 'http://restapi.amap.com/v3/direction/driving'
}

// 设置Cesium Ion访问令牌
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYWFjZDg0Yi03MTllLTQxYmYtODI5Ny0yMzNmMTk1YjA4MDkiLCJpZCI6MjgxNTI5LCJpYXQiOjE3NDEyMjQxMDZ9.ZgJ4mbIa2nWr2106TMgm3LonowG2J1nCIofkSootuy4';

// 初始化Viewer - 修改为无地形的平面图
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: new Cesium.EllipsoidTerrainProvider(), // 使用平坦地形
    timeline: false,
    animation: false,
    baseLayerPicker: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    homeButton: false,
    geocoder: false,
    infoBox: false
});

// 隐藏Cesium商业图标
viewer._cesiumWidget._creditContainer.style.display = "none";

// 模型数据
const modelData = [
    {
        id: 'model1',
        assetId: 3448272, // 修改为第二段代码中的assetId
        position: [105.04479, 27.84965, 0], // 修改为第二段代码中的坐标
        heading: -5.0,
        name: '烈士陵园大门',
        description: '扎西红军烈士陵园大门庄严肃穆，采用传统中式建筑风格，门楣上镌刻着红军烈士陵园六个鎏金大字。这座大门不仅是陵园的入口，更是革命精神的象征，见证了1935年红军长征途经扎西时的英勇事迹。大门两侧的石狮和松柏更增添了庄重氛围，每年清明和烈士纪念日都有大批群众前来瞻仰。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model2',
        assetId: 3449226, // 修改为第二段代码中的assetId
        position: [105.04471, 27.85045, 0], // 修改为第二段代码中的坐标
        heading: -5.0,
        name: '纪念碑',
        description: '高达15米的扎西红军烈士纪念碑矗立在陵园中央，碑身由汉白玉砌成，正面刻有革命烈士永垂不朽的题词。碑座四周浮雕生动再现了红军长征途中扎西会议、娄山关战役等历史场景。这座纪念碑不仅是缅怀先烈的圣地，更是爱国主义教育的重要基地，碑前常年摆放着各界群众敬献的花篮。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model3',
        assetId: 3448909, // 修改为第二段代码中的assetId
        position: [105.04582, 27.85068, 0], // 修改为第二段代码中的坐标
        heading: -29.0, // 修改为第二段代码中的朝向
        name: '狮子营红军战斗遗址',
        description: '狮子营战斗遗址保存着当年红军与国民党军激战的战壕和防御工事，这片山坡上曾发生过惨烈的拉锯战。遗址内展示的弹壳、军用水壶等文物，配合解说牌上的战斗经过描述，让参观者仿佛回到1935年2月那个风雪交加的夜晚。这里已被列为省级文物保护单位，是研究红军长征史的重要实证。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model4',
        assetId: 3416984, // 修改为第二段代码中的assetId
        position: [105.04675, 27.8508, 0], // 修改为第二段代码中的坐标
        heading: -8.0, // 修改为第二段代码中的朝向
        name: '纪念馆',
        description: '扎西会议纪念馆采用现代与传统结合的建筑风格，馆内通过200余件珍贵文物、历史照片和多媒体展陈，系统展示了1935年中央政治局扎西会议的重大历史意义。重点展区还原了会议场景，陈列着毛泽东、周恩来等领导人使用过的桌椅、油灯等物品，还设有沉浸式影院播放《长征在扎西》专题片。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model5',
        assetId: 3416931, // 修改为第二段代码中的assetId
        position: [105.04750, 27.8499, 0], // 修改为第二段代码中的坐标
        heading: -5.0,
        name: '红军井',
        description: '这口直径约2米的石砌古井，因红军长征时期曾为部队提供饮用水源而得名。井台石壁上仍清晰可见红军井三个刻字，井水至今清澈甘甜。当地流传着红军战士帮村民打水、村民为红军送草鞋的感人故事，这口井已成为军民鱼水情的生动见证，被列入县级文物保护名录。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model6',
        assetId: 3456378, // 修改为第二段代码中的assetId
        position: [105.04666, 27.8492, 0], // 修改为第二段代码中的坐标
        heading: 70.0, // 修改为第二段代码中的朝向
        name: '扎西老街',
        description: '始建于明清时期的扎西老街全长800余米，青石板路面两侧林立着56栋保存完好的穿斗式木结构民居。街道中段的红军标语墙、百年老茶馆和传统银器作坊构成独特的人文景观。每逢赶集日，街道上摆满苗族刺绣、威信白蜡等特色商品，是体验滇东北民俗文化的活态博物馆。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model7',
        assetId: 3416956, // 修改为第二段代码中的assetId
        position: [105.04598, 27.84948, 0], // 修改为第二段代码中的坐标
        heading: -12.0, // 修改为第二段代码中的朝向
        name: '扎西宾馆',
        description: '这座具有苏式建筑风格的宾馆始建于1958年，曾接待过多位革命老前辈和党史研究者。宾馆内保留着1972年修复时的水磨石地面和木质旋转楼梯，三号楼设有长征主题客房，墙面悬挂着红军长征路线图和老照片。宾馆后院那棵周恩来总理亲手种植的雪松现已亭亭如盖。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model8',
        assetId: 3416955, // 修改为第二段代码中的assetId
        position: [105.04513, 27.85086, 0], // 修改为第二段代码中的坐标
        heading: -14.0, // 修改为第二段代码中的朝向
        name: '八角楼',
        description: '独特的八角形三层木结构建筑，飞檐翘角上悬挂着24只铜铃，微风拂过便发出清脆声响。该建筑融合了汉族阁楼与彝族碉楼的特点，二楼展厅陈列着扎西会议参会者的书法作品复制件，顶层观景台可俯瞰整个烈士陵园。建筑专家考证其斗拱结构具有显著的清代营造法式特征。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model9',
        assetId: 3416949, // 修改为第二段代码中的assetId
        position: [105.0471, 27.8499, 0], // 修改为第二段代码中的坐标
        heading: -8.0, // 修改为第二段代码中的朝向
        name: '扎西客栈',
        description: '由百年马帮驿站改造而成的特色客栈，完整保留了天井、火塘等传统元素。客房内摆放着手工织布机改制的茶几，墙上装饰着苗族蜡染布。后院保留着当年红军炊事班使用过的石磨，现已成为游客体验磨豆浆的热门打卡点。客栈提供的红军饭套餐包含南瓜汤、荞面馍等长征时期食物。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model10',
        assetId: 3416948, // 修改为第二段代码中的assetId
        position: [105.0479, 27.8502, 0], // 修改为第二段代码中的坐标
        heading: 40.0, // 修改为第二段代码中的朝向
        name: '云上乡愁书院',
        description: '展示当地这座由清代文庙改建的书院，藏书3万余册，特设红色文献专区收藏长征主题书籍。书院定期举办银发讲师团讲述革命故事，天井中的百年桂花树下常举行红色经典诵读会。二楼展柜里陈列着1935年红军留下的《识字课本》和《革命歌谣集》复制件，展现了红军的文化教育传统。化的书院。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model11',
        assetId: 3416946, // 修改为第二段代码中的assetId
        position: [105.0472, 27.8498, 0], // 修改为第二段代码中的坐标
        heading: 80.0, // 修改为第二段代码中的朝向
        name: '彝秀馆',
        description: '展馆系统展示了国家级非遗威信彝族刺绣的17种针法和82种传统纹样。中心展区陈列着长达18米的《彝家欢歌》刺绣长卷，以及红军时期彝汉群众互赠的绣花背带复制品。互动区提供刺绣体验，游客可在非遗传承人指导下完成简单的太阳纹或羊角纹刺绣。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model12',
        assetId: 3416945, // 修改为第二段代码中的assetId
        position: [105.0484, 27.8498, 0], // 修改为第二段代码中的坐标
        heading: 20.0, // 修改为第二段代码中的朝向
        name: '苗族服饰馆',
        description: '馆内展出云南苗族支系特有的川黔滇型服饰，重点展示20世纪30年代与红军有关的服饰文物。镇馆之宝是一件染有蓝靛的麻布对襟衣，据考证曾由帮助红军渡江的苗族船工穿着。现代展区通过全息投影展示了苗族百鸟衣从纺线到成衣的128道工序。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model13',
        assetId: 3454965, // 修改为第二段代码中的assetId
        position: [105.04798, 27.8499, 0], // 修改为第二段代码中的坐标
        heading: -5.0,
        name: '龙井',
        description: '这口千年古井因井口石雕龙首得名，井水从未干涸。1935年红军驻扎期间，朱德总司令曾亲自组织战士为井台加筑石栏，并在井边召开群众大会。现在井台石碑上仍可辨认吃水不忘挖井人的红军标语残迹，井旁的老皂角树被当地群众称为红军树。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model14',
        assetId: 3454963, // 修改为第二段代码中的assetId
        position: [105.0464, 27.85001, 0], // 修改为第二段代码中的坐标
        heading: -16.0, // 修改为第二段代码中的朝向
        name: '扎西食堂',
        description: '保留着20世纪50年代风貌的国营风格食堂，木质餐牌上写着忆苦思甜饭包谷饭套餐等特色菜品。餐厅墙面悬挂着1951年开业时的老照片，以及红军长征途经地的特色食材介绍。最受欢迎的行军锅套餐用传统方法烹制，包含蕨根粉、竹筒饭等野外生存食品。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model15',
        assetId: 3454961, // 修改为第二段代码中的assetId
        position: [105.04569, 27.8499, 0], // 修改为第二段代码中的坐标
        heading: -20.0, // 修改为第二段代码中的朝向
        name: '威信人民政府',
        description: '这座1952年建成的苏式建筑群，主楼顶端的五角星与红旗雕塑极具时代特征。大院内的红军槐树下立着扎西会议决议碑复制件，办公楼走廊悬挂着《红军长征过威信》系列油画。政务服务中心特设红色代办窗口，延续着当年红军帮群众解难题的优良传统。',
        uploadTime: '2025-05-10'
    },
    {
        id: 'model16',
        assetId: 3425518, // 修改为第二段代码中的assetId
        position: [105.0446, 27.8486, 0], // 修改为第二段代码中的坐标
        heading: -5.0,
        name: '红军广场',
        description: '占地1.8万平方米的红色文化广场，中央矗立着军民团结主题雕塑，地面镶嵌着长征路线铜质浮雕。广场西侧的电子大屏定期播放红色电影，东侧的红军故事墙用瓷板画形式展现了32个长征故事。每天清晨都有群众在广场上打红军拳、唱革命歌曲，已成为当地红色文化生活的核心场所。',
        uploadTime: '2025-06-09'
    },
    {
        id: 'model17',
        assetId: 3456379, // 修改为第二段代码中的assetId
        position: [105.04858, 27.85102, 0], // 修改为第二段代码中的坐标
        heading: 22.0,
        name: '扎西会议旧址',
        description: '扎西会议旧址，位于云南省昭通市威信县扎西镇，由清咸丰六年（1856年）建造的江西会馆（万寿宫）和光绪四年（1878年）建造的湖广会馆（禹王宫）组成，建筑群融合川滇黔三省风格，全木结构，占地4686平方米。1935年2月9日，中共中央在此召开政治局扩大会议，史称"扎西会议"。会议通过了《遵义会议决议》正式文件，作出回师黔北、二渡赤水的战略决策，并成立中共川南特委及红军游击纵队。旧址内保留着毛泽东、周恩来等领导人路居的厢房，戏楼为会议主场地，现陈列红军标语、武器等百余件文物。1962年江西会馆曾遭拆除，1976年按原貌重建，1983年被列为省级文物保护单位。',
        uploadTime: '2025-06-09'
    }
];

// 封装加载并定位模型的函数
async function loadAndPositionModel(assetId, lon, lat, height, headingDeg, pitchDeg, rollDeg) {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(assetId, {
        minimumPixelSize: 16,  // 设置最小像素尺寸
        maximumScreenSpaceError: 2  // 控制模型细节级别
    });

    // 位置
    const position = Cesium.Cartesian3.fromDegrees(lon, lat, height);

    // 姿态
    const hpr = new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(headingDeg),
        Cesium.Math.toRadians(pitchDeg),
        Cesium.Math.toRadians(rollDeg)
    );

    // 构建 modelMatrix
    const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
        position,
        hpr
    );
    tileset.modelMatrix = modelMatrix;

    // 添加到场景
    viewer.scene.primitives.add(tileset);

    return tileset;
}

// 加载所有模型
async function loadModels() {
    try {
        for (const model of modelData) {
            const tileset = await loadAndPositionModel(
                model.assetId,
                model.position[0],
                model.position[1],
                model.position[2],
                model.heading,
                0,
                0
            );

            // 添加点击事件
            tileset.id = model.id;
            tileset.modelInfo = model;

            await tileset.readyPromise;
        }

        // 飞到第一个模型
        if (modelData.length > 0) {
            const firstModelPos = Cesium.Cartesian3.fromDegrees(...modelData[9].position);
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(
                    modelData[9].position[0] - 0.00125,
                    modelData[9].position[1] - 0.00480, // 向南偏移约50米
                    300
                ),
                orientation: {
                    heading: Cesium.Math.toRadians(0),
                    pitch: Cesium.Math.toRadians(-30),
                    roll: 0.0
                },
                duration: 1
            });
        }
    } catch (error) {
        console.error("模型加载失败:", error);
        alert("模型加载失败，请检查控制台日志。");
    }
}

// 初始化点击事件处理
function initClickHandler() {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction(function (movement) {
        const pickedObject = viewer.scene.pick(movement.position);
        if (Cesium.defined(pickedObject) && pickedObject.primitive.id) {
            // 找到对应的模型信息
            const modelInfo = modelData.find(m => m.id === pickedObject.primitive.id);
            if (modelInfo) {
                // 显示信息窗口
                document.getElementById('modelTitle').textContent = modelInfo.name;
                document.getElementById('modelId').textContent = modelInfo.id;
                document.getElementById('modelPosition').textContent = modelInfo.position.join(', ');
                document.getElementById('modelUploadTime').textContent = modelInfo.uploadTime;
                document.getElementById('modelDescription').textContent = modelInfo.description;

                const infoWindow = document.getElementById('infoWindow');
                infoWindow.style.display = 'block';
                setTimeout(() => {
                    infoWindow.classList.add('show');
                }, 10);

                // 存储当前选中模型位置
                window.currentSelectedModel = modelInfo.position;

                // 飞到模型位置
                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(
                        modelInfo.position[0] + 0.00014,
                        modelInfo.position[1] - 0.00138, // 向南偏移约50米
                        100
                    ),
                    orientation: {
                        heading: Cesium.Math.toRadians(0),
                        pitch: Cesium.Math.toRadians(-30),
                        roll: 0.0
                    },
                    duration: 1
                });
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

// 修改initNavigation函数
function initNavigation() {
    // 规划路线按钮事件
    document.getElementById('planRouteBtn').addEventListener('click', function () {
        const startSelect = document.getElementById('start-select')
        const endSelect = document.getElementById('end-select')

        if (!startSelect.value || !endSelect.value) {
            alert('请选择起点和终点')
            return
        }

        try {
            // 获取起点和终点的经纬度
            const start = startSelect.value.split(',').map(Number)
            const end = endSelect.value.split(',').map(Number)

            // 路径规划
            routeManager.planRoute(start, end)
                .then(routeData => {
                    routeManager.visualizeRoute(routeData)
                    document.getElementById('startNavBtn').disabled = false

                    // 显示路线信息
                    let html = '<p><i class="fas fa-check-circle" style="color:green"></i> 路线规划成功:</p>'
                    html += `<p><i class="fas fa-road"></i> 距离: ${(routeData.distance / 1000).toFixed(1)}公里</p>`
                    html += `<p><i class="fas fa-clock"></i> 预计时间: ${(routeData.duration / 60).toFixed(0)}分钟</p>`
                    html += '<p><i class="fas fa-list-ol"></i> 路线步骤:</p><ol>'

                    routeData.steps.forEach(step => {
                        html += `<li>${step.instruction}</li>`
                    })

                    html += '</ol>'
                    document.getElementById('routeResult').innerHTML = html
                })
                .catch(error => {
                    document.getElementById('routeResult').innerHTML =
                        `<p><i class="fas fa-exclamation-circle" style="color:red"></i> ${error.message}</p>`
                })
        } catch (error) {
            alert(error.message)
        }
    })

    // 替换原来的开始导览按钮事件
    document.getElementById('startNavBtn').addEventListener('click', function () {
        if (!routeManager.vehicleModel) {
            alert('请先规划路线');
            return;
        }

        // 重置时钟
        viewer.clock.currentTime = viewer.clock.startTime;
        viewer.clock.multiplier = 1.0;
        viewer.clock.shouldAnimate = true;

        // 跟踪车辆
        viewer.trackedEntity = routeManager.vehicleModel;
    });
}

// 修改navigateToBtn点击事件
document.getElementById('navigateToBtn').addEventListener('click', function () {
    if (window.currentSelectedModel) {
        const navPanel = document.getElementById('navigationPanel')
        navPanel.style.display = 'block'
        setTimeout(() => {
            navPanel.classList.add('show')
        }, 10)

        // 设置终点为当前选中模型
        document.getElementById('end-select').value = window.currentSelectedModel.join(',')

        // 关闭信息窗口
        const infoWindow = document.getElementById('infoWindow')
        infoWindow.classList.remove('show')
        setTimeout(() => {
            infoWindow.style.display = 'none'
        }, 300)
    }
})

// 初始化模糊搜索功能（仅按name字段搜索）
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        if (!query) {
            searchResults.style.display = 'none';
            return;
        }

        // 仅按name字段进行模糊查询
        const results = modelData.filter(model =>
            model.name.toLowerCase().includes(query)
        );

        if (results.length > 0) {
            let html = '<ul>';
            results.forEach(model => {
                html += `<li data-id="${model.id}">${model.name}</li>`;
            });
            html += '</ul>';
            searchResults.innerHTML = html;
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });

    // 点击搜索结果跳转到对应模型
    searchResults.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            const modelId = e.target.getAttribute('data-id');
            const model = modelData.find(m => m.id === modelId);
            if (model) {
                const position = Cesium.Cartesian3.fromDegrees(...model.position);
                viewer.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(
                        model.position[0] + 0.00014,
                        model.position[1] - 0.00138, // 向南偏移约50米
                        100
                    ),
                    orientation: {
                        heading: Cesium.Math.toRadians(0),
                        pitch: Cesium.Math.toRadians(-30),
                        roll: 0.0
                    },
                    duration: 1
                });

                document.getElementById('modelTitle').textContent = model.name;
                document.getElementById('modelId').textContent = model.id;
                document.getElementById('modelPosition').textContent = model.position.join(', ');
                document.getElementById('modelUploadTime').textContent = model.uploadTime;
                document.getElementById('modelDescription').textContent = model.description;

                const infoWindow = document.getElementById('infoWindow');
                infoWindow.style.display = 'block';
                setTimeout(() => {
                    infoWindow.classList.add('show');
                }, 10);

                window.currentSelectedModel = model.position;
                searchResults.style.display = 'none';
                searchInput.value = model.name;
            }
        }
    });
}

// 初始化顶部导航栏功能
function initTopBar() {
    // 导航按钮
    document.getElementById('navBtn').addEventListener('click', function () {
        const navPanel = document.getElementById('navigationPanel');
        if (navPanel.style.display === 'block') {
            navPanel.classList.remove('show');
            setTimeout(() => {
                navPanel.style.display = 'none';
            }, 300);
        } else {
            navPanel.style.display = 'block';
            setTimeout(() => {
                navPanel.classList.add('show');
            }, 10);
        }
        this.classList.add('button-hover');
        setTimeout(() => {
            this.classList.remove('button-hover');
        }, 500);
    });

    // 官网按钮
    document.getElementById('officialBtn').addEventListener('click', function () {
        window.open('https://hongsehui.cn/service/venue/687/?page_photo_ids=2', '_blank');
        this.classList.add('button-hover');
        setTimeout(() => {
            this.classList.remove('button-hover');
        }, 500);
    });

    // 科研项目按钮
    document.getElementById('researchBtn').addEventListener('click', function () {
        alert('科研项目信息:\n\n项目级别: 云南师范大学本科生科研训练基金项目\n项目名称: 云南省长征旅游景区开发现状评估及发展趋势优化模拟研究\n项目编号: KX2024111\n项目负责人: 周泽同');
        this.classList.add('button-hover');
        setTimeout(() => {
            this.classList.remove('button-hover');
        }, 500);
    });

    // GitHub按钮
    document.getElementById('githubBtn').addEventListener('click', function () {
        window.open('https://github.com/error-chtholly/zhaxi3D', '_blank');
        this.classList.add('button-hover');
        setTimeout(() => {
            this.classList.remove('button-hover');
        }, 500);
    });

    // 关于按钮
    document.getElementById('aboutBtn').addEventListener('click', function () {
        alert('开发者信息:\n\n团队: 云南师范大学地理学部\n成员: Error Chtholly (Zetong Zhou), Siyi Shen*, Putong Li, Linyan Chen, Ying Yang, Zhongxian Xiang\n版本: 1.0.0\n更新日期: 2025-06-11\n联系方式: zhouzetong_rs@163.com\n注: 本项目受云南师范大学本科生科研训练基金项目 (项目编号: KX2024111, 项目负责人: 周泽同) 支持\n开发者寄语: 希望本系统可以帮助您更加深入的了解扎西红色小镇的三维场景和历史信息, 欢迎来到扎西红色小镇了解更多详情! ');
        this.classList.add('button-hover');
        setTimeout(() => {
            this.classList.remove('button-hover');
        }, 500);
    });

    // 关闭信息窗口按钮
    document.getElementById('closeInfoBtn').addEventListener('click', function () {
        const infoWindow = document.getElementById('infoWindow');
        infoWindow.classList.remove('show');
        setTimeout(() => {
            infoWindow.style.display = 'none';
        }, 300);
    });

    // 为所有按钮添加悬停效果
    const buttons = document.querySelectorAll('#topBar button, #navigateToBtn, #planRouteBtn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.classList.add('button-hover');
        });
        button.addEventListener('mouseleave', function () {
            this.classList.remove('button-hover');
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function () {
    loadModels();
    initClickHandler();
    initNavigation();
    initTopBar();
    initSearch();
    initWeather();
    initCompass();

    // 添加一些动态效果
    setInterval(() => {
        const buttons = document.querySelectorAll('#topBar button');
        const randomIndex = Math.floor(Math.random() * buttons.length);
        buttons[randomIndex].classList.add('pulse');

        setTimeout(() => {
            buttons[randomIndex].classList.remove('pulse');
        }, 2000);
    }, 3000);
});

// 天气功能
function initWeather() {
    // 创建天气特效层
    const weatherEffect = document.createElement('div');
    weatherEffect.id = 'weatherEffect';
    weatherEffect.className = 'weather-effect';
    document.body.appendChild(weatherEffect);

    // 天气按钮点击事件
    document.getElementById('weatherBtn').addEventListener('click', function () {
        this.classList.add('button-hover');
        setTimeout(() => {
            this.classList.remove('button-hover');
        }, 500);

        if (weatherEffect.style.display === 'block') {
            // 关闭天气特效
            weatherEffect.style.display = 'none';
            weatherEffect.className = 'weather-effect';

            const weatherWindow = document.getElementById('weatherWindow');
            weatherWindow.classList.remove('show');
            setTimeout(() => {
                weatherWindow.style.display = 'none';
            }, 300);
        } else {
            // 获取威信县天气
            getWeixinWeather();
        }
    });

    // 关闭天气窗口按钮
    document.getElementById('closeWeatherBtn').addEventListener('click', function () {
        const weatherWindow = document.getElementById('weatherWindow');
        weatherWindow.classList.remove('show');
        setTimeout(() => {
            weatherWindow.style.display = 'none';
        }, 300);

        const weatherEffect = document.getElementById('weatherEffect');
        weatherEffect.style.display = 'none';
        weatherEffect.className = 'weather-effect';
    });
}

// 获取威信县天气数据
function getWeixinWeather() {
    // 威信县的城市编码是530629
    const cityCode = '530629';
    const apiKey = '9a418d1b1fbd093a8064a48cc36ea57e'; // 替换为你的高德API密钥

    fetch(`https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === '1' && data.lives.length > 0) {
                const weatherInfo = data.lives[0];
                displayWeatherInfo(weatherInfo);
                applyWeatherEffect(weatherInfo.weather);
            } else {
                alert('获取天气信息失败，请稍后再试');
            }
        })
        .catch(error => {
            console.error('获取天气信息出错:', error);
            alert('获取天气信息出错，请检查控制台日志');
        });
}

// 显示天气信息
function displayWeatherInfo(weatherInfo) {
    document.getElementById('weatherCondition').textContent = weatherInfo.weather;
    document.getElementById('weatherTemperature').textContent = weatherInfo.temperature;
    document.getElementById('weatherHumidity').textContent = weatherInfo.humidity;
    document.getElementById('weatherWindDirection').textContent = weatherInfo.winddirection;
    document.getElementById('weatherWindPower').textContent = weatherInfo.windpower;
    document.getElementById('weatherReportTime').textContent = weatherInfo.reporttime;

    const weatherWindow = document.getElementById('weatherWindow');
    weatherWindow.style.display = 'block';
    setTimeout(() => {
        weatherWindow.classList.add('show');
    }, 10);
}

// 应用天气特效
function applyWeatherEffect(weatherType) {
    const weatherEffect = document.getElementById('weatherEffect');
    weatherEffect.style.display = 'block';

    // 根据天气类型设置不同的特效
    switch (weatherType) {
        case '晴':
            weatherEffect.className = 'weather-effect sunny';
            break;
        case '多云':
        case '阴':
            weatherEffect.className = 'weather-effect cloudy';
            break;
        case '雨':
        case '小雨':
        case '中雨':
        case '大雨':
        case '暴雨':
            weatherEffect.className = 'weather-effect rain';
            break;
        case '雪':
        case '小雪':
        case '中雪':
        case '大雪':
        case '暴雪':
            weatherEffect.className = 'weather-effect snow';
            break;
        case '雾':
        case '浓雾':
        case '强浓雾':
            weatherEffect.className = 'weather-effect fog';
            break;
        default:
            weatherEffect.className = 'weather-effect';
    }
}

// 路径规划管理器
class RouteManager {
    constructor() {
        this.routeEntity = null
        this.vehicleModel = null
        this.PI = Math.PI
        this.a = 6378245.0
        this.ee = 0.006693421622965943
    }

    //初始化路线选择UI
    initUI() {
        const startSelect = document.getElementById('start-select')
        const endSelect = document.getElementById('end-select')

        // 清空并重新填充选项
        const resetSelect = (select, placeholder) => {
            select.innerHTML = `<option value="">${placeholder}</option>`
            Object.entries(SITES).forEach(([name, coord]) => {
                select.innerHTML += `<option value="${coord.join(',')}">${name}</option>`
            })
        }

        resetSelect(startSelect, '选择起点')
        resetSelect(endSelect, '选择终点')
    }

    /**
     * 执行路径规划
     * @param {number[]} start - 起点坐标 [lng, lat] (WGS84)
     * @param {number[]} end - 终点坐标 [lng, lat] (WGS84)
     * @returns {Promise} 包含路径数据的Promise
     */
    async planRoute(start, end) {
        try {
            // 将WGS84坐标转换为GCJ-02坐标
            const startGcj02 = this.wgs84ToGcj02(start[0], start[1])
            const endGcj02 = this.wgs84ToGcj02(end[0], end[1])

            const url = new URL(AMAP_CONFIG.drivingUrl)
            const params = {
                key: AMAP_CONFIG.key,
                origin: `${startGcj02[0]},${startGcj02[1]}`,
                destination: `${endGcj02[0]},${endGcj02[1]}`,
                strategy: '0', // 速度优先
                output: 'json'
            }

            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.set(key, value)
            })

            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP错误: ${response.status}`)
            }

            const data = await response.json()
            if (data.status !== '1') {
                throw new Error(data.info || '路径规划失败')
            }

            return this.processRouteData(data)
        } catch (error) {
            console.error('路径规划异常:', error)
            throw new Error(`路径规划失败: ${error.message}`)
        }
    }

    /**
     * 处理高德API返回的路径数据
     * @param {Object} data - 高德API返回的原始数据
     * @returns {Object} 处理后的路径数据
     */
    processRouteData(data) {
        const path = data.route?.paths?.[0]
        if (!path) {
            throw new Error('无效的路径数据')
        }

        const pathPoints = path.steps.flatMap(step => {
            if (!step.polyline) {
                console.warn('缺少polyline字段:', step)
                return []
            }
            return step.polyline
                .split(';')
                .map(p => {
                    const [lng, lat] = p.split(',').map(Number)
                    return isNaN(lng) || isNaN(lat) ? null : this.gcj02ToWgs84(lng, lat)
                })
                .filter(Boolean)
        })

        if (!pathPoints.length) {
            throw new Error('未解析到有效路径点')
        }

        return {
            distance: path.distance,
            duration: path.duration,
            points: pathPoints,
            steps: path.steps.map(step => ({
                instruction: step.instruction,
                distance: step.distance,
                polyline: step.polyline
            }))
        }
    }

    /**
     * 在场景中可视化路径
     * @param {Object} routeData - 路径数据
     */
    visualizeRoute(routeData) {
        this.clearExistingRoute()

        this.routeEntity = viewer.entities.add({
            name: '规划路径',
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArray(routeData.points.flatMap(p => [p.lng, p.lat])),
                width: 8,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.3,
                    color: Cesium.Color.YELLOW
                }),
                clampToGround: true
            }
        })

        this.moveVehicleAlongRoute(this.routeEntity)
        // 修改为（添加offset参数控制视角）
        // viewer.zoomTo(this.routeEntity, {
        //     offset: new Cesium.HeadingPitchRange(
        //         0, // 保持默认航向角（正北）
        //         Cesium.Math.toRadians(-30), // 俯角30度（向下看）
        //         500 // 距离路径500米高度（可根据需要调整）
        //     )
        // });

        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(
                (routeData.points[0].lng + routeData.points[routeData.points.length - 1].lng) / 2 + 0.00014,
                (routeData.points[0].lat + routeData.points[routeData.points.length - 1].lat) / 2 - 0.00138, // 向南偏移
                241
            ),
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-30),
                roll: 0.0
            },
            duration: 1
        });
    }

    /**
     * 清除现有路径和车辆模型
     */
    clearExistingRoute() {
        if (this.routeEntity) {
            viewer.entities.remove(this.routeEntity)
            this.routeEntity = null
        }
        if (this.vehicleModel) {
            viewer.entities.remove(this.vehicleModel)
            this.vehicleModel = null
        }
    }

    /**
     * 沿路径移动车辆模型
     * @param {Object} lineEntity - 路径实体
     */
    moveVehicleAlongRoute(lineEntity) {
        if (!lineEntity) return

        const positions = lineEntity.polyline.positions.getValue()
        if (!positions || positions.length < 2) return

        // 计算总距离和速度
        const totalDistance = positions.slice(1).reduce((sum, pos, i) => {
            return sum + Cesium.Cartesian3.distance(positions[i], pos)
        }, 0)

        const totalTime = 100 // 移动总时间(秒)
        const velocity = totalDistance / totalTime

        // 设置时间轴
        const startTime = viewer.clock.currentTime
        const endTime = Cesium.JulianDate.addSeconds(startTime, totalTime, new Cesium.JulianDate())

        // 创建位置属性
        const positionProperty = new Cesium.SampledPositionProperty()
        positionProperty.addSample(startTime, positions[0])

        let accumulatedTime = 0
        positions.slice(1).forEach((pos, i) => {
            const distance = Cesium.Cartesian3.distance(positions[i], pos)
            accumulatedTime += distance / velocity
            const time = Cesium.JulianDate.addSeconds(startTime, accumulatedTime, new Cesium.JulianDate())
            positionProperty.addSample(time, pos)
        })

        // 创建车辆模型
        this.vehicleModel = viewer.entities.add({
            position: positionProperty,
            orientation: new Cesium.VelocityOrientationProperty(positionProperty),
            model: {
                uri: './source/car.glb',
                scale: 0.05
            }
        })

        // 设置时钟
        viewer.clock.currentTime = startTime
        viewer.clock.multiplier = 1
        viewer.clock.shouldAnimate = true
        viewer.clock.stopTime = endTime

        // 返回位置属性用于相机跟踪
        return positionProperty
    }

    /**
     * GCJ02坐标转WGS84坐标
     * @param {number} lng - 经度
     * @param {number} lat - 纬度
     * @returns {Object} 转换后的坐标 {lng, lat}
     */
    gcj02ToWgs84(lng, lat) {
        const a = this.a
        const ee = this.ee

        const dlat = this.transformLat(lng - 105.0, lat - 35.0)
        const dlng = this.transformLng(lng - 105.0, lat - 35.0)

        const radlat = (lat / 180.0) * this.PI
        const magic = Math.sin(radlat)
        const sqrtmagic = Math.sqrt(1 - ee * magic * magic)

        const mdlat = (dlat * 180.0) / (((a * (1 - ee)) / (sqrtmagic * sqrtmagic)) * this.PI)
        const mdlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * this.PI)

        return {
            lng: lng - mdlng,
            lat: lat - mdlat
        }
    }

    /**
     * WGS84坐标转GCJ02坐标
     * @param {number} lng - 经度
     * @param {number} lat - 纬度
     * @returns {Array} 转换后的坐标 [lng, lat]
     */
    wgs84ToGcj02(lng, lat) {
        if (this.outOfChina(lng, lat)) {
            return [lng, lat]
        }

        const dlat = this.transformLat(lng - 105.0, lat - 35.0)
        const dlng = this.transformLng(lng - 105.0, lat - 35.0)

        const radlat = (lat / 180.0) * this.PI
        const magic = Math.sin(radlat)
        const sqrtmagic = Math.sqrt(1 - this.ee * magic * magic) // 使用 this.ee

        const mdlat = (dlat * 180.0) / (((this.a * (1 - this.ee)) / (sqrtmagic * sqrtmagic)) * this.PI)
        const mdlng = (dlng * 180.0) / ((this.a / sqrtmagic) * Math.cos(radlat) * this.PI)

        return [lng + mdlng, lat + mdlat]
    }

    /**
     * 坐标转换辅助函数 - 纬度转换
     */
    transformLat(x, y) {
        return (
            -100.0 +
            2.0 * x +
            3.0 * y +
            0.2 * y * y +
            0.1 * x * y +
            0.2 * Math.sqrt(Math.abs(x)) +
            ((20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0) / 3.0 +
            ((20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin((y / 3.0) * this.PI)) * 2.0) / 3.0 +
            ((160.0 * Math.sin((y / 12.0) * this.PI) + 320 * Math.sin((y * this.PI) / 30.0)) * 2.0) / 3.0
        )
    }

    /**
     * 坐标转换辅助函数 - 经度转换
     */
    transformLng(x, y) {
        return (
            300.0 +
            x +
            2.0 * y +
            0.1 * x * x +
            0.1 * x * y +
            0.1 * Math.sqrt(Math.abs(x)) +
            ((20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0) / 3.0 +
            ((20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin((x / 3.0) * this.PI)) * 2.0) / 3.0 +
            ((150.0 * Math.sin((x / 12.0) * this.PI) + 300.0 * Math.sin((x / 30.0) * this.PI)) * 2.0) / 3.0
        )
    }

    /**
     * 检查坐标是否在中国境内
     * @param {number} lng - 经度
     * @param {number} lat - 纬度
     * @returns {boolean} 是否在中国境内
     */
    outOfChina(lng, lat) {
        return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271
    }
}

// 初始化路由管理器
const routeManager = new RouteManager()

// 初始化指北针
function initCompass() {
    const compass = document.getElementById('compass');

    // 监听相机变化事件
    viewer.camera.changed.addEventListener(function () {
        // 获取当前相机方向（弧度）
        const heading = viewer.camera.heading;

        // 转换为角度并取反（因为相机旋转方向与指北针旋转方向相反）
        const angle = -Cesium.Math.toDegrees(heading);

        // 应用旋转（只旋转罗盘，不旋转文字）
        compass.querySelector('.compass-rose').style.transform = `rotate(${angle}deg)`;
    });

    // 点击指北针重置视角
    compass.addEventListener('click', function () {
        viewer.camera.setView({
            orientation: {
                heading: 0, // 正北方向
                pitch: -Cesium.Math.PI_OVER_FOUR, // 俯视角度
                roll: 0.0
            }
        });
    });
}

// 测量工具管理器
class MeasureTool {
    constructor(viewer) {
        this.viewer = viewer;
        this.activeTool = null;
        this.entities = [];
        this.handler = null;
        this.tempEntities = [];
        this.initUIEvents();
    }

    // 在MeasureTool类中添加这个方法
    setupRightClickDelete(entity, labelEntity) {
        entity.rightClick = () => {
            this.viewer.entities.remove(entity);
            if (labelEntity) this.viewer.entities.remove(labelEntity);
        };
    }

    // 初始化UI事件
    initUIEvents() {
        const toolButtons = document.querySelectorAll('.tool-btn');
        toolButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const toolType = btn.getAttribute('data-tool');
                this.setActiveTool(toolType);
            });
        });

        // 关闭坐标信息弹窗
        document.querySelector('#coordinateInfo .close-popup').addEventListener('click', () => {
            document.getElementById('coordinateInfo').style.display = 'none';
        });

        // 关闭缓冲区弹窗
        document.querySelector('#bufferPopup .close-popup').addEventListener('click', () => {
            document.getElementById('bufferPopup').style.display = 'none';
        });

        // 确认缓冲区设置
        document.getElementById('confirmBuffer').addEventListener('click', () => {
            const radius = parseFloat(document.getElementById('bufferRadius').value);
            if (!isNaN(radius) && this.bufferCenter) {
                this.drawBuffer(this.bufferCenter, radius);
                document.getElementById('bufferPopup').style.display = 'none';
            }
        });

        // 删除实体
        document.getElementById('deleteEntity').addEventListener('click', () => {
            if (this.selectedEntity) {
                this.viewer.entities.remove(this.selectedEntity);
                document.getElementById('contextMenu').style.display = 'none';
            }
        });

        // 切换工具栏显示/隐藏
        document.getElementById('toggleToolBtn').addEventListener('click', () => {
            const toolBar = document.getElementById('toolBar');
            const icon = document.querySelector('#toggleToolBtn i');

            if (toolBar.style.display === 'flex') {
                toolBar.style.display = 'none';
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            } else {
                toolBar.style.display = 'flex';
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            }
        });
    }

    // 设置当前活动工具
    setActiveTool(toolType) {
        // 清除之前的临时实体和事件处理器
        this.clearTempEntities();
        if (this.handler) {
            this.handler.destroy();
            this.handler = null;
        }

        this.activeTool = toolType;

        switch (toolType) {
            case 'coordinate':
                this.initCoordinateTool();
                break;
            case 'line':
                this.initLineTool();
                break;
            case 'rectangle':
                this.initRectangleTool();
                break;
            case 'circle':
                this.initCircleTool();
                break;
            case 'polygon':
                this.initPolygonTool();
                break;
            case 'buffer':
                this.initBufferTool();
                break;
            case 'clear':
                this.clearAllMeasurements();
                break;
        }
    }

    // 初始化坐标查看工具
    initCoordinateTool() {
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        this.handler.setInputAction(movement => {
            const position = this.getPosition(movement.position);
            if (position) {
                const cartographic = Cesium.Cartographic.fromCartesian(position);
                const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
                const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
                const height = cartographic.height.toFixed(2);

                // 更新坐标信息弹窗
                document.getElementById('longitudeValue').textContent = longitude;
                document.getElementById('latitudeValue').textContent = latitude;
                document.getElementById('heightValue').textContent = height;

                // 显示在点击位置
                const infoWindow = document.getElementById('coordinateInfo');
                infoWindow.style.left = `${movement.position.x + 10}px`;
                infoWindow.style.top = `${movement.position.y + 10}px`;
                infoWindow.style.display = 'block';
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    // 初始化直线绘制工具
    initLineTool() {
        let positions = [];
        let lineEntity = null;
        let distanceLabel = null;

        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        // 左键点击
        this.handler.setInputAction(movement => {
            const position = this.getPosition(movement.position);
            if (!position) return;

            if (positions.length === 0) {
                positions.push(position.clone());
                lineEntity = this.viewer.entities.add({
                    polyline: {
                        positions: new Cesium.CallbackProperty(() => [positions[0], position], false),
                        width: 5,
                        material: Cesium.Color.RED,
                        clampToGround: true
                    }
                });
                this.entities.push(lineEntity);
            } else {
                positions.push(position.clone());
                lineEntity.polyline.positions = positions;

                // 添加距离标签
                const distance = Cesium.Cartesian3.distance(positions[0], positions[1]) / 1000;
                const midpoint = Cesium.Cartesian3.midpoint(positions[0], positions[1], new Cesium.Cartesian3());

                distanceLabel = this.viewer.entities.add({
                    position: midpoint,
                    label: {
                        text: distance.toFixed(2) + ' km',
                        font: '14px sans-serif',
                        fillColor: Cesium.Color.RED
                    }
                });
                this.entities.push(distanceLabel);

                // 设置右键删除功能
                this.setupRightClickDelete(lineEntity, distanceLabel);

                positions = [];
                lineEntity = null;
                distanceLabel = null;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 鼠标移动更新
        this.handler.setInputAction(movement => {
            if (positions.length === 1) {
                const position = this.getPosition(movement.endPosition);
                if (position) {
                    lineEntity.polyline.positions = new Cesium.CallbackProperty(
                        () => [positions[0], position], false
                    );
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        // 右键取消当前绘制
        this.handler.setInputAction(() => {
            if (positions.length === 1) {
                this.viewer.entities.remove(lineEntity);
                positions = [];
                lineEntity = null;
            }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    // 初始化矩形绘制工具
    initRectangleTool() {
        let startPoint = null;
        let endPoint = null;
        let rectangleEntity = null;
        let labelEntity = null;

        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        // 左键点击设置起点
        this.handler.setInputAction(movement => {
            const position = this.getPosition(movement.position);
            if (!position) return;

            if (!startPoint) {
                startPoint = position;

                // 创建动态矩形实体（保持原有样式）
                rectangleEntity = this.viewer.entities.add({
                    rectangle: {
                        coordinates: new Cesium.CallbackProperty(() => {
                            if (!endPoint) return Cesium.Rectangle.fromCartesianArray([startPoint, startPoint]);
                            // 确保坐标顺序正确（左下->右上）
                            const positions = [startPoint, endPoint].sort((a, b) =>
                                a.x === b.x ? a.y - b.y : a.x - b.x
                            );
                            return Cesium.Rectangle.fromCartesianArray(positions);
                        }, false),
                        height: 0,
                        material: Cesium.Color.BLUE.withAlpha(0.3),
                        outline: true,
                        outlineColor: Cesium.Color.RED,
                        outlineWidth: 2
                    }
                });
            } else {
                // 完成绘制
                endPoint = position;

                // 计算矩形参数
                const sortedPositions = [startPoint, endPoint].sort((a, b) =>
                    a.x === b.x ? a.y - b.y : a.x - b.x
                );
                const rectangle = Cesium.Rectangle.fromCartesianArray(sortedPositions);

                // 计算边长（转换为经纬度计算更准确）
                const cartographicSW = Cesium.Cartographic.fromCartesian(sortedPositions[0]);
                const cartographicNE = Cesium.Cartographic.fromCartesian(sortedPositions[1]);

                // 计算东西向距离（经度差）
                const widthKm = Cesium.Cartesian3.distance(
                    sortedPositions[0],
                    new Cesium.Cartesian3(sortedPositions[1].x, sortedPositions[0].y, sortedPositions[0].z)
                ) / 1000;

                // 计算南北向距离（纬度差）
                const heightKm = Cesium.Cartesian3.distance(
                    sortedPositions[0],
                    new Cesium.Cartesian3(sortedPositions[0].x, sortedPositions[1].y, sortedPositions[0].z)
                ) / 1000;

                // 计算面积（km²）
                const areaKm2 = (widthKm * heightKm).toFixed(2);

                // 计算中心点位置
                const center = Cesium.Cartesian3.midpoint(startPoint, endPoint, new Cesium.Cartesian3());

                // 添加标签
                labelEntity = this.viewer.entities.add({
                    position: center,
                    label: {
                        text: `宽度: ${widthKm.toFixed(2)} km\n高度: ${heightKm.toFixed(2)} km\n面积: ${areaKm2} km²`,
                        font: '14px sans-serif',
                        fillColor: Cesium.Color.RED,
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 2,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER
                    }
                });
                this.entities.push(labelEntity);

                // 保持最终矩形显示（移除CallbackProperty）
                rectangleEntity.rectangle.coordinates = rectangle;
                this.entities.push(rectangleEntity);

                // 重置状态
                startPoint = null;
                endPoint = null;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 鼠标移动实时更新
        this.handler.setInputAction(movement => {
            if (startPoint) {
                endPoint = this.getPosition(movement.endPosition);
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        // 右键取消
        this.handler.setInputAction(() => {
            if (rectangleEntity) {
                this.viewer.entities.remove(rectangleEntity);
                rectangleEntity = null;
            }
            if (labelEntity) {
                this.viewer.entities.remove(labelEntity);
                labelEntity = null;
            }
            startPoint = null;
            endPoint = null;
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    // 初始化圆形绘制工具
    initCircleTool() {
        let center = null;
        let radius = 0;
        let circle = null;
        let radiusLabel = null;

        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        // 左键点击设置圆心
        this.handler.setInputAction(movement => {
            const position = this.getPosition(movement.position);
            if (!position) return;

            if (!center) {
                // 设置圆心
                center = position;

                // 创建圆形实体
                circle = this.viewer.entities.add({
                    position: center,
                    ellipse: {
                        semiMinorAxis: new Cesium.CallbackProperty(() => radius, false),
                        semiMajorAxis: new Cesium.CallbackProperty(() => radius, false),
                        material: Cesium.Color.BLUE.withAlpha(0.3), // 蓝色半透明填充
                        outline: true,
                        outlineColor: Cesium.Color.RED,
                        outlineWidth: 2
                    }
                });
                this.tempEntities.push(circle);

                // 创建半径标签
                radiusLabel = this.viewer.entities.add({
                    position: center,
                    label: {
                        text: '半径: 0 km',
                        font: '14px sans-serif',
                        fillColor: Cesium.Color.RED,
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 2,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                        pixelOffset: new Cesium.Cartesian2(0, -10)
                    }
                });
                this.tempEntities.push(radiusLabel);
            } else {
                // 完成绘制
                const cartographicCenter = Cesium.Cartographic.fromCartesian(center);
                const cartographicEdge = Cesium.Cartographic.fromCartesian(position);

                // 计算半径(km)
                const lat1 = Cesium.Math.toRadians(Cesium.Math.toDegrees(cartographicCenter.latitude));
                const lon1 = Cesium.Math.toRadians(Cesium.Math.toDegrees(cartographicCenter.longitude));
                const lat2 = Cesium.Math.toRadians(Cesium.Math.toDegrees(cartographicEdge.latitude));
                const lon2 = Cesium.Math.toRadians(Cesium.Math.toDegrees(cartographicEdge.longitude));

                const dLat = lat2 - lat1;
                const dLon = lon2 - lon1;

                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1) * Math.cos(lat2) *
                    Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                radius = 6371 * c; // 地球半径 * 弧度 = 距离(km)

                // 计算面积(km²)
                const area = (Math.PI * radius * radius).toFixed(2);

                // 添加最终标签
                const finalLabel = this.viewer.entities.add({
                    position: center,
                    label: {
                        text: `半径: ${radius.toFixed(2)} km\n面积: ${area} km²`,
                        font: '14px sans-serif',
                        fillColor: Cesium.Color.RED,
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 2,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER
                    }
                });
                this.entities.push(finalLabel);

                // 清除临时实体
                this.clearTempEntities();
                this.tempEntities = [];

                // 添加最终圆形实体
                const finalCircle = this.viewer.entities.add({
                    position: center,
                    ellipse: {
                        semiMinorAxis: radius * 1000, // 转换为米
                        semiMajorAxis: radius * 1000,
                        material: Cesium.Color.BLUE.withAlpha(0.3), // 蓝色半透明填充
                        outline: true,
                        outlineColor: Cesium.Color.RED,
                        outlineWidth: 2
                    }
                });
                this.entities.push(finalCircle);

                // 设置右键删除（直接删除不弹窗）
                this.setupRightClickDelete(finalCircle, finalLabel);

                // 重置状态
                center = null;
                radius = 0;
                circle = null;
                radiusLabel = null;
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 鼠标移动更新半径
        this.handler.setInputAction(movement => {
            if (center) {
                const position = this.getPosition(movement.endPosition);
                if (position) {
                    // 计算当前半径(临时显示用)
                    const currentRadius = Cesium.Cartesian3.distance(center, position) / 1000; // km

                    // 更新半径标签
                    if (radiusLabel) {
                        radiusLabel.label.text = `半径: ${currentRadius.toFixed(2)} km`;
                    }

                    // 更新半径
                    radius = currentRadius * 1000; // 转换为米
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        // 右键取消
        this.handler.setInputAction(() => {
            this.clearTempEntities();
            center = null;
            radius = 0;
            circle = null;
            radiusLabel = null;
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    // 初始化多边形绘制工具
    initPolygonTool() {
        let positions = [];
        let polygon = null;
        let movingPoint = null;
        let line = null;

        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        // 左键点击添加点
        this.handler.setInputAction(movement => {
            const position = this.getPosition(movement.position);
            if (!position) return;

            if (positions.length === 0) {
                // 第一个点
                positions.push(position);

                // 创建起点实体
                const startPoint = this.viewer.entities.add({
                    position: position,
                    point: {
                        pixelSize: 8,
                        color: Cesium.Color.RED,
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 1
                    }
                });
                this.tempEntities.push(startPoint);

                // 创建移动点
                movingPoint = this.viewer.entities.add({
                    position: position,
                    point: {
                        pixelSize: 6,
                        color: Cesium.Color.YELLOW,
                        outlineColor: Cesium.Color.BLACK,
                        outlineWidth: 1
                    }
                });
                this.tempEntities.push(movingPoint);

                // 创建线
                line = this.viewer.entities.add({
                    polyline: {
                        positions: new Cesium.CallbackProperty(() => {
                            return positions.length > 1 ? positions : [positions[0], positions[0]];
                        }, false),
                        width: 2,
                        material: Cesium.Color.RED
                    }
                });
                this.tempEntities.push(line);
            } else {
                // 添加新点
                positions.push(position);

                // 添加点实体
                const point = this.viewer.entities.add({
                    position: position,
                    point: {
                        pixelSize: 8,
                        color: Cesium.Color.RED,
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 1
                    }
                });
                this.tempEntities.push(point);
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // 鼠标移动更新移动点
        this.handler.setInputAction(movement => {
            if (positions.length > 0 && movingPoint) {
                const position = this.getPosition(movement.endPosition);
                if (position) {
                    movingPoint.position = position;

                    // 更新线
                    if (positions.length > 1) {
                        positions.pop();
                    }
                    positions.push(position);
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        // 右键完成绘制
        this.handler.setInputAction(() => {
            if (positions.length > 2) {
                // 移除最后一个移动点
                positions.pop();

                // 计算周长和面积
                let perimeter = 0;
                for (let i = 0; i < positions.length; i++) {
                    const j = (i + 1) % positions.length;
                    perimeter += Cesium.Cartesian3.distance(positions[i], positions[j]) / 1000; // km
                }

                // 使用多边形面积公式计算面积(km²)
                let area = 0;
                const n = positions.length;
                if (n > 2) {
                    // 将笛卡尔坐标转换为经纬度
                    const cartographics = positions.map(pos =>
                        Cesium.Cartographic.fromCartesian(pos)
                    );

                    // 使用球面多边形面积公式
                    for (let i = 0; i < n; i++) {
                        const j = (i + 1) % n;
                        const lon1 = Cesium.Math.toRadians(Cesium.Math.toDegrees(cartographics[i].longitude));
                        const lat1 = Cesium.Math.toRadians(Cesium.Math.toDegrees(cartographics[i].latitude));
                        const lon2 = Cesium.Math.toRadians(Cesium.Math.toDegrees(cartographics[j].longitude));
                        const lat2 = Cesium.Math.toRadians(Cesium.Math.toDegrees(cartographics[j].latitude));

                        area += (lon2 - lon1) *
                            (2 + Math.sin(lat1) + Math.sin(lat2));
                    }

                    area = Math.abs(area * 6371 * 6371 / 2); // 地球半径² / 2
                }

                // 添加标签
                const center = this.computePolygonCentroid(positions);
                const label = this.viewer.entities.add({
                    position: center,
                    label: {
                        text: `周长: ${perimeter.toFixed(2)} km\n面积: ${area.toFixed(2)} km²`,
                        font: '14px sans-serif',
                        fillColor: Cesium.Color.RED,
                        outlineColor: Cesium.Color.WHITE,
                        outlineWidth: 2,
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER
                    }
                });
                this.entities.push(label);

                // 清除临时实体
                this.clearTempEntities();
                this.tempEntities = [];

                // 添加最终多边形实体
                const finalPolygon = this.viewer.entities.add({
                    polygon: {
                        hierarchy: positions,
                        material: Cesium.Color.BLUE.withAlpha(0.3), // 蓝色半透明填充
                        outline: true,
                        outlineColor: Cesium.Color.RED,
                        outlineWidth: 2
                    }
                });
                this.entities.push(finalPolygon);

                // 设置右键删除（直接删除不弹窗）
                this.setupRightClickDelete(finalPolygon, finalLabel);

                // 添加右键删除功能
                finalPolygon.rightClick = () => {
                    const contextMenu = document.getElementById('contextMenu');
                    contextMenu.style.left = `${this.lastRightClick.x}px`;
                    contextMenu.style.top = `${this.lastRightClick.y}px`;
                    contextMenu.style.display = 'block';
                    this.selectedEntity = finalPolygon;
                };

                // 重置状态
                positions = [];
                movingPoint = null;
                line = null;
            }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }

    // 初始化缓冲区工具
    initBufferTool() {
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        this.handler.setInputAction(movement => {
            const position = this.getPosition(movement.position);
            if (position) {
                this.bufferCenter = position;

                // 显示缓冲区设置弹窗
                const bufferPopup = document.getElementById('bufferPopup');
                bufferPopup.style.left = `${movement.position.x + 10}px`;
                bufferPopup.style.top = `${movement.position.y + 10}px`;
                bufferPopup.style.display = 'block';
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    // 绘制缓冲区
    drawBuffer(center, radiusKm) {
        const radius = radiusKm * 1000; // 转换为米

        // 创建圆形缓冲区
        const buffer = this.viewer.entities.add({
            position: center,
            ellipse: {
                semiMinorAxis: radius,
                semiMajorAxis: radius,
                material: Cesium.Color.BLUE.withAlpha(0.3), // 蓝色半透明填充
                outline: true,
                outlineColor: Cesium.Color.RED,
                outlineWidth: 2
            }
        });
        this.entities.push(buffer);

        // 添加标签
        const area = (Math.PI * radiusKm * radiusKm).toFixed(2);
        const label = this.viewer.entities.add({
            position: center,
            label: {
                text: `半径: ${radiusKm} km\n面积: ${area} km²`,
                font: '14px sans-serif',
                fillColor: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE,
                outlineWidth: 2,
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                verticalOrigin: Cesium.VerticalOrigin.CENTER
            }
        });
        this.entities.push(label);

        // 设置右键删除（直接删除不弹窗）
        this.setupRightClickDelete(buffer, bufferLabel);

        // // 添加右键删除功能
        // buffer.rightClick = () => {
        //     const contextMenu = document.getElementById('contextMenu');
        //     contextMenu.style.left = `${this.lastRightClick.x}px`;
        //     contextMenu.style.top = `${this.lastRightClick.y}px`;
        //     contextMenu.style.display = 'block';
        //     this.selectedEntity = buffer;
        // };
    }

    // 清除所有测量结果
    clearAllMeasurements() {
        this.entities.forEach(entity => {
            this.viewer.entities.remove(entity);
        });
        this.entities = [];
    }

    // 清除临时实体
    clearTempEntities() {
        this.tempEntities.forEach(entity => {
            this.viewer.entities.remove(entity);
        });
        this.tempEntities = [];
    }

    // 获取点击位置的坐标
    getPosition(screenPosition) {
        const ray = this.viewer.camera.getPickRay(screenPosition);
        if (!ray) return null;

        const position = this.viewer.scene.globe.pick(ray, this.viewer.scene);
        return position;
    }

    // 计算多边形质心
    computePolygonCentroid(positions) {
        const centroid = new Cesium.Cartesian3();
        for (let i = 0; i < positions.length; i++) {
            Cesium.Cartesian3.add(centroid, positions[i], centroid);
        }
        Cesium.Cartesian3.divideByScalar(centroid, positions.length, centroid);
        return centroid;
    }

    // 初始化右键删除功能
    initRightClickDelete() {
        const handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

        handler.setInputAction(movement => {
            const pickedObject = this.viewer.scene.pick(movement.position);
            if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.rightClick) {
                this.lastRightClick = movement.position;
                pickedObject.id.rightClick();
            } else {
                document.getElementById('contextMenu').style.display = 'none';
            }
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
}

// 在DOM加载完成后初始化测量工具
document.addEventListener('DOMContentLoaded', function () {
    // 初始化测量工具
    const measureTool = new MeasureTool(viewer);
    measureTool.initRightClickDelete();

    // 确保工具栏初始状态正确
    document.getElementById('toolBar').style.display = 'none';
});

// 添加计算和显示长度的函数
function finalizeLine(positions) {
    const distance = Cesium.Cartesian3.distance(positions[0], positions[1]) / 1000; // 转换为km
    const midpoint = Cesium.Cartesian3.midpoint(positions[0], positions[1], new Cesium.Cartesian3());

    viewer.entities.add({
        position: midpoint,
        label: {
            text: distance.toFixed(2) + ' km',
            font: '14px sans-serif',
            fillColor: Cesium.Color.RED,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE
        }
    });
}

let lastUpdateTime = 0;
const UPDATE_INTERVAL = 100;  // 毫秒

function optimizedScaleUpdate(viewer) {
    const now = Date.now();
    if (now - lastUpdateTime < UPDATE_INTERVAL) return;
    lastUpdateTime = now;

    // 使用更精确的视锥体计算
    const frustum = viewer.camera.frustum;
    if (frustum instanceof Cesium.PerspectiveFrustum) {
        const distance = Cesium.Cartesian3.distance(
            viewer.camera.position,
            viewer.scene.globe.ellipsoid.cartographicToCartesian(
                viewer.camera.positionCartographic
            )
        );
        const metersPerPixel = (2 * distance * Math.tan(frustum.fovy / 2)) / viewer.canvas.clientHeight;
        updateScaleDisplay(metersPerPixel * 150);  // 基准长度150像素
    }
}

// 动态更新比例尺（基于Cesium相机位置计算）
function updateDynamicScale(viewer) {
    if (!viewer || !viewer.scene) return;

    // 获取当前视口中心点的地面坐标
    const center = new Cesium.Cartesian2(
        viewer.canvas.clientWidth / 2,
        viewer.canvas.clientHeight / 2
    );
    const ray = viewer.camera.getPickRay(center);
    const position = viewer.scene.globe.pick(ray, viewer.scene);

    if (!position) return;

    // 计算100像素对应的地面距离（单位：米）
    const pixelSize = viewer.camera.getPixelSize(
        position,
        viewer.canvas.clientWidth,
        viewer.canvas.clientHeight
    );
    const scaleDistance = pixelSize * 100;  // 基准长度100像素

    // 自动选择合适单位（米/千米）
    let displayText;
    if (scaleDistance < 1000) {
        displayText = `${Math.round(scaleDistance)} 米`;
    } else {
        displayText = `${(scaleDistance / 1000).toFixed(1)} 千米`;
    }

    // 更新DOM元素
    const scaleBar = document.getElementById('dynamicScaleBar');
    const scaleLine = scaleBar.querySelector('.scale-line');
    const scaleLabel = scaleBar.querySelector('.scale-label');

    scaleLine.style.width = '100px';  // 固定视觉长度
    scaleLabel.textContent = displayText;

    // 绑定到相机变化事件
    viewer.camera.changed.addEventListener(updateDynamicScale);
}

// 初始化调用（在Cesium viewer创建后）
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.viewer) {
            updateDynamicScale(window.viewer);
        }
    }, 100);
});