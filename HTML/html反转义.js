// html 反转义
function escapeHtml(str){
  var arrEntities = {
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'amp': '&',
    'quot': '"'
  };
  return str.replace( /&(lt|gt|nbsp|amp|quot);/ig, function ( all, t ) {
    return arrEntities[ t ];
  });
}