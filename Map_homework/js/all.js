//指定
let day = document.querySelector('.day');
let info = document.querySelector('.info');
let content = document.querySelector('.lower');
let county =  document.getElementById('country');
let district = document.getElementById('district');

//監聽
county.addEventListener('change',show_country,false);
district.addEventListener('change',show_district,false)

//取得年月日及星期
let dateObject = new Date();
let dayZh = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
let yearCheck = dateObject.getFullYear();
let monthCheck = dateObject.getMonth();
let dateCheck = dateObject.getDate();
let dayCheck = dateObject.getDay();

//嗅出年月日 星期即購買條件
day.innerHTML = `<h4>${dayZh[dayCheck]}</h4>`;

let str = [];
let strDate = `<h6>${yearCheck}-${monthCheck+1}-${dateCheck}</h6>`;

let strBuyer = [];
switch(dayCheck){
    case 1:
    case 3:
    case 5:
        strBuyer = `<h6>身分證末尾<span>單數</span>可購買</h6>`
        break;
    case 2:
    case 4:
    case 6:    
        strBuyer = `<h6>身分證末尾<span>雙數</span>可購買</h6>`
        break;
    default:
        strBuyer = `<h6>身分證末尾<span>不限</span>可購買</h6>`
    }

str += strDate + strBuyer;
info.innerHTML = str;

//取得xhr data
let mask_data = [];
let xhr = new XMLHttpRequest();
xhr.open('get','https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json',true);
xhr.send(null);
xhr.onload = function(){
    let raw_data = JSON.parse(xhr.responseText);
    mask_data = raw_data.features;
    init(mask_data);
    show_country(mask_data);
    show_district(mask_data);
    console.log(mask_data);
    return mask_data;
}

//初始藥局資料
function init(mask_data){
    let length = mask_data.length;
    let list_content = "";
    for(i=0; i<length; i++){
        if(mask_data[i].properties.county === "臺北市" && mask_data[i].properties.town === "中正區"){
            let str = ` <div class="list">
                            <ul>
                            <li><h4>${mask_data[i].properties.name}</h4></li>
                            <li>${mask_data[i].properties.address}</li>
                            <li>${mask_data[i].properties.phone}</li>
                            <li>備註：${mask_data[i].properties.note}</li>
                            <span id="adult">
                                <span>成人口罩</span>
                                <span class="adult amount">${mask_data[i].properties.mask_adult}</span>
                            </span>
                            <span id="child">
                                <span>成人口罩</span>
                                <span class="child amount">${mask_data[i].properties.mask_child}</span>
                            </span>
                        </ul>
                        </div>`
            list_content += str;
        }
        content.innerHTML = list_content;
    }
}

function show_country(mask_data,e){
    console.log(county.select)
}


function show_district(mask_data,e){
    console.log('hello')
}