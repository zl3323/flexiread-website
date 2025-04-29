const axios = require('axios');

exports.handler = async function(event, context) {
  // 只接受POST请求
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: '只支持POST请求' };
  }

  try {
    // 解析请求体
    const body = JSON.parse(event.body);
    
    // 转发请求到Dify API
    const response = await axios({
      method: 'post',
      url: 'https://api.dify.ai/v1/workflows/run',
      headers: {
        'Authorization': 'Bearer app-lMTTgaZkDzOzeeDAhvaqLDj9',
        'Content-Type': 'application/json'
      },
      data: body
    });
    
    // 返回API响应
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    // 处理错误
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({
        error: error.message,
        details: error.response ? error.response.data : null
      })
    };
  }
};
