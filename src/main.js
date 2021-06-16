const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo: 'x', url: 'https://www.xiedaimala.com'},
  
];
const removeX = (url) => {
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace(/\/.*/,'') //删除./开头的内容直到结尾，这是正则表达式
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)=>{
        const $li = $( `<li>
        <div class="site">
            <div class="logo">
                ${node.logo[0]}
            </div>
            <div class="link">${removeX(node.url)}</div>
            <div class="close">
            <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-shanchu"></use>
</svg>
            </div>
        </div>
     </li>`).insertBefore($lastLi)
     $li.on('click', ()=>{
         window.open(node.url)
     })
     $li.on('click','.close', (e) => {
         e.stopPropagation()
         hashMap.splice(index,1)
         render()
     })
    });
}
render()
$('.addButton')
.on('click',()=>{
   let url = window.prompt('请添加网址')
   if(url.indexOf('http')!==0){
       url = 'https://' + url
   }
   
 hashMap.push({
     logo: (url).replace('https://','')
     .replace('http://','')
     .replace('www.','')[0],
     url:url
 });
 render()
});

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}
$(document).on('keypress',(e)=>{
    const {key} = e
    for(let i = 0; i < hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})