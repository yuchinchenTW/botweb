
//*免責聲明: 一切下載及使用本網站(waitforit)時均被視為已經仔細閱讀並完全同意以下條款： 本網站(waitforit)僅供個人學習與交流使用，嚴禁用於商業以及不良用途。 如有發現任何商業行為以及不良用途，本網站(waitforit)作者有權撤銷使用權。
/*使用本軟件所存在的風險將完全由其本人承擔，本網站(waitforit)作者不承擔任何責任。
本網站(waitforit)注明之服務條款外，其它因不當使用本軟件而導致的任何意外、疏忽、合約毀壞、誹謗、版權或其他知識產權侵犯及其所造成的任何損失，本軟件作者概不負責，亦不承擔任何法律責任。
對於因不可抗力或因黑客攻擊、通訊線路中斷等不能控制的原因造成的服務中斷或其他缺陷，導致用戶不能正常使用，本網站(waitforit)作者不承擔任何責任，但將盡力減少因此給用戶造成的損失或影響。
本聲明未涉及的問題請參見國家有關法律法規，當本聲明與國家有關法律法規沖突時，以國家法律法規為準。
本軟件相關聲明版權及其修改權、更新權和最終解釋權均屬本網站(waitforit)作者所有。
該網站為教育學習使用，內容出自於https://www.8591.com.tw/，若8591提出刪除網站之相關要求，本網站將自行刪除。*/
//如果你在看這裡 代表你在看源碼 然後這程式有很多bug 不過管他的  想用就拿去用吧 後果自負
// IF YOU ARE WATCHING THIS WHICH MEANS THAT YOU ARE WATCHING SOURCE CODE. BTW THERE ARE LOTS OF BUG IN HERE BUT WHATEVER .COPY IT AS YOU NEED IT, PROCEED AT YOUR OWN RISK
var options = {
  hostname: "",
  localAddress: '202.1.1.1'
};


let array = [];
// function to get the raw data
const getRawData = (URL) => {
  return fetch(URL, {
    method: "GET",
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '  *',
      'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Custom-Header'
    }



  })
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

// URL for data
let item = "";
let section = 0;
let blank = 0;
let bool = true
let URL = "Access-Control-Allow-Origin: https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
let maxrange = 7000;
let minrange = 2000;
let count = 0;
let map = new Map();
let result = "";

function reset() {
  section = 0;
  blank = 0;
  bool = true;
  map.clear();
  count = 0;
  result = "";

}
// start of the program
const test = async function () {
  result = "";
  while (bool) {
    await sleep(100);
    URL = " https://www.8591.com.tw/mallList-list.html?searchGame=859&searchType=0&searchKey=&firstRow=" + section;
    console.log(URL);
    const _constdata = await getRawData(URL);
    let data = _constdata;
    for (let i = 0; i < 26; i++) {
      if (data.includes("我收購的商品")) {
        let index_bottom = data.search("我收購的商品");
        data = data.substr(index_bottom + 1);
      }
      let index_bottom = data.search("元【1");
      data = data.substr(index_bottom - 15);
      index_bottom = data.search("\"") + 1;
      data = data.substr(index_bottom);
      let index_top = 0;
      index_bottom = data.search("】");
      let temp = data.substr(index_top, index_bottom - index_top + 1);
      //console.log(temp);
      if (temp !== "") array.push(temp);
      if (temp === "") blank++
      data = data.substr(50);
    }
     
    if (blank < 20) {
      section += 21;
      blank = 0;
    };
    if (blank >= 20) bool = false;
    if (section > 800) bool = false;
  }
  console.log(array)

  let arr = [];

  // console.log(temp)
  for (let i = 0; i < array.length; i++) {
    let id = array[i].search(":");
    let id_bottom = array[i].search("萬】");
    let temp = array[i].substr(id + 1, id_bottom - id - 1)
    let int = parseInt(temp);
    int = Math.round(int)
    arr.push(int)

  }
  arr.sort(compareDecimals);
  arr.reverse();
  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], 1);
    } else if (map.has(arr[i])) {
      let n = map.get(arr[i]);
      n++;
      map.set(arr[i], n);
    }

  }
  console.log(arr)
  console.log(map)
  return map;

};

function compareDecimals(a, b) {
  if (a === b)
    return 0;

  return a < b ? -1 : 1;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const tyt = async function (item, maxrange, minrange) {
  result = "";

  // start of the program

  result = "";

  while (bool) {
    await sleep(100);
    const ttempp = "https://cors-anywhere.herokuapp.com/";
    URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
    //URL=ttempp.concat(URL);
    console.log(URL);
    const _constdata = await getRawData(URL);
    let data = _constdata;
    for (let i = 0; i < 26; i++) {

      let index_bottom = data.search("元</b>");
      data = data.substr(index_bottom - 10);
      let index_top = data.search("<b>") + 3;
      index_bottom = data.search("</b>") - 1;
      //console.log(data.substr(index_top, index_bottom - index_top));
      let temp = data.substr(index_top, index_bottom - index_top);

      temp = temp.replace(',', '');
      temp = parseInt(temp);

      if (temp > minrange && temp < maxrange && temp != 8591) {
        count++;
        if (data.substr(index_top, index_bottom - index_top) != "") array.push(temp);
      }
      if (data.substr(index_top, index_bottom - index_top) == "") blank++;
      data = data.substr(index_bottom + 100);
      
    }
    if (blank < 20) {
      section += 21;
      blank = 0;
    };
    if (blank >= 20) bool = false;
    if (section > 1200) bool = false;
  }
  array.sort(compareDecimals);
  console.log(array);
  let avg = 0;
  for (let i = 0; i < array.length; i++) {
    avg += array[i];
  }
  console.log(item + " 樣本數:" + count + " 平均價:" + (avg / count));
  result += item + " 樣本數:" + count + " 平均價格:" + (avg / count) + "\r";
  if (count < 50) {
    console.log("樣本數低於50 平均價格不夠準確");
    result += "樣本數低於50 平均價格不夠準確\r";
  }

  for (let i = 0; i < array.length; i++) {
    if (map.has(array[i])) {
      let num = map.get(array[i]);
      num++;
      map.set(array[i], num);
    }
    if (!map.has(array[i])) {
      map.set(array[i], 1);
    }

  }
  if (array.length > 0) {
    let time = parseInt(array.length / 15);
    let max = 0;
    let times = 0;
    let arr = [];


    let mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

    for (const [key, value] of mapSort1.entries()) {
      if (times != mapSort1.size && times <= time && value > 1) {
        arr.push(key);
        mapSort1.delete(key);
        times++;

      }

    }
    let arr_avg = 0;
    arr.sort(compareDecimals)
    //if (arr.length > 3) arr.pop();
    arr.reverse();
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
      max += arr[i];
    }
    arr_avg=max / (arr.length) ;
    if (arr.length >= 3) {
      max = 0;
      let arrlen = arr.length;
      let ct = 0;

      let index = arr.length / 2;
      if (index < 2) {
        arr_avg = arr[1];

      } else if (index >= 2) {

        index = Math.floor(index);
        index = (index + arr.length - 1) / 2
        index = Math.floor(index)
        if (arr[index] / arr[index + 1] < 2) arr_avg = (arr[index] + arr[index + 1]) / 2;
        if (arr[index] / arr[index + 1] >= 2) arr_avg = arr[index];
      }
      if (arr.length > 25) {
        index = arr.length / 2;
        index = Math.floor(index);
        arr_avg = (arr[index] + arr[index + 1]) / 2;

      }

      //arr_avg=arr_avg/arr.length;
      console.log(arr_avg)
      for (let i = 0; i < 10; i++) {
        ct = 0;
        while (ct < arr.length) {

          if (arr[ct] / arr_avg >= 2) {
            arr.splice(ct, 1);

          } else if (arr[ct] / arr_avg <= 0.5) {
            arr.splice(ct, 1);

          } else if (arr[ct] / arr_avg < 2 || arr[ct] / arr_avg > 0.5) {
            if (i == 9) max += arr[ct]
            ct++;

          }



        }

      }
    }
    console.log(arr)

    mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    let keys = Array.from(mapSort1.keys());
    keys.sort(compareDecimals);
    result += "\r\n建議最大最小價格設定值:\r\n" + Math.floor((max / (arr.length)) * 8) + "~" + Math.floor((max / (arr.length)) * 3 / 100);
    let possible_pr = 0;
    if (max / (arr.length) > arr_avg) possible_pr = (max / (arr.length)) * 0.8
    if (max / (arr.length) <= arr_avg) possible_pr = (max / (arr.length))
    result += "\r\n可能最佳價格:\r\n" + possible_pr;
   // result += "\r\n最小可能價格:\r\n"
   /* if (keys.length >= 20) {
      for (let i = 0; i < 20; i++) {
        result += "\r\n" + keys[i];
      }
    } else if (keys.length < 20) {
      for (let i = 0; i < keys.length; i++) {
        result += "\r\n" + keys[i];
      }
    }*/
    array.length = 0

  }


  console.log(map)
  return map;

};

function return_result() {
  return result;
}
/////sale prize


const fyi = async function (item, maxrange, minrange) {
  result = "";

  // start of the program
  array = []
  result = "";

  while (bool) {
    await sleep(100);
    const ttempp = "https://cors-anywhere.herokuapp.com/";
    //URL = "https://www.8591.com.tw/mallList-list.html?id=859&%251=&gst=2&searchKey=" + item + "&firstRow=" + section;
    URL = "https://www.8591.com.tw/mallList-list.html?searchGame=859&buyStatus=1&searchKey="+item+"&firstRow="+section;
    //URL=ttempp.concat(URL);
    console.log(URL);
    const _constdata = await getRawData(URL);
    let data = _constdata;
    for (let i = 0; i < 26; i++) {

      let index_bottom = data.search("元</b>");
      data = data.substr(index_bottom - 10);
      let index_top = data.search("<b>") + 3;
      index_bottom = data.search("</b>") - 1;
      //console.log(data.substr(index_top, index_bottom - index_top));
      let temp = data.substr(index_top, index_bottom - index_top);

      temp = temp.replace(',', '');
      temp = parseInt(temp);

      if (temp > minrange && temp < maxrange && temp != 8591) {
        count++;
        if (data.substr(index_top, index_bottom - index_top) != "") array.push(temp);
      }
      if (data.substr(index_top, index_bottom - index_top) == "") blank++;
      data = data.substr(index_bottom + 100);
    }
    if (blank < 20) {
      section += 21;
      blank = 0;
    };
    if (blank >= 20) bool = false;
    if (section > 1000) bool = false;
  }
  array.sort(compareDecimals);
  console.log(array);
  let avg = 0;
  for (let i = 0; i < array.length; i++) {
    avg += array[i];
  }
  console.log(item + " 樣本數:" + count + " 平均價:" + (avg / count));
  result += item + " 樣本數:" + count + " 平均價格:" + (avg / count) + "\r";
  if (count < 50) {
    console.log("樣本數低於50 平均價格不夠準確");
    result += "樣本數低於50 平均價格不夠準確\r";
  }

  for (let i = 0; i < array.length; i++) {
    if (map.has(array[i])) {
      let num = map.get(array[i]);
      num++;
      map.set(array[i], num);
    }
    if (!map.has(array[i])) {
      map.set(array[i], 1);
    }

  }
  if (array.length > 0) {
    let time = parseInt(array.length / 15);
    let max = 0;
    let times = 0;
    let arr = [];


    let mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));

    for (const [key, value] of mapSort1.entries()) {
      if (times != mapSort1.size && times <= time && value > 1) {
        arr.push(key);
        mapSort1.delete(key);
        times++;

      }

    }
    let arr_avg = 0;
    arr.sort(compareDecimals)
    //if (arr.length > 3) arr.pop();
    arr.reverse();
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
      max += arr[i];
    }
    arr_avg=max / (arr.length) ;
    if (arr.length >= 3) {
      max = 0;
      let arrlen = arr.length;
      let ct = 0;

      let index = arr.length / 2;
      if (index < 2) {
        arr_avg = arr[1];

      } else if (index >= 2) {

        index = arr.length / 2;
        index = Math.floor(index);
        arr_avg = (arr[index] + arr[index + 1]) / 2;
      }
      if (arr.length > 25) {
        index = arr.length / 2;
        index = Math.floor(index);
        arr_avg = (arr[index] + arr[index + 1]) / 2;

      }

      //arr_avg=arr_avg/arr.length;
      console.log(arr_avg)
      for (let i = 0; i < 10; i++) {
        ct = 0;
        while (ct < arr.length) {

          if (arr[ct] / arr_avg >= 1.5) {
            arr.splice(ct, 1);

          } else if (arr[ct] / arr_avg <= 0.67) {
            arr.splice(ct, 1);

          } else if (arr[ct] / arr_avg < 1.5 || arr[ct] / arr_avg > 0.67) {
            if (i == 9) max += arr[ct]
            ct++;

          }



        }

      }
    }
    console.log(arr)

    mapSort1 = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    let keys = Array.from(mapSort1.keys());
    keys.sort(compareDecimals);
    result += "\r\n建議最大最小價格設定值:\r\n" + Math.floor((max / (arr.length)) * 8) + "~" + Math.floor((max / (arr.length)) * 3 / 100);
    let possible_pr = 0;
    if (max / (arr.length) > arr_avg) possible_pr = (max / (arr.length)) *0.9
    if (max / (arr.length) <= arr_avg) possible_pr = (max / (arr.length))
    result += "\r\n可能最佳價格:\r\n" + possible_pr;
   /* result += "\r\n最小可能價格:\r\n"
    if (keys.length >= 20) {
      for (let i = 0; i < 20; i++) {
        result += "\r\n" + keys[i];
      }
    } else if (keys.length < 20) {
      for (let i = 0; i < keys.length; i++) {
        result += "\r\n" + keys[i];
      }
    }*/
    array.length = 0

  }
  console.log(result)

  console.log(map)
  return map;
};


