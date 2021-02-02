# html生成pdf

http://localhost:3000

##### 登录

**请求 URL：**

- /pdf

**请求方式：**

- POST

**参数：**

| 参数名   | 必选 | 类型   | 说明              |
| :------- | :--- | :----- | ----------------- |
| url      | 否   | string | 生成pdf的html地址 |
| margin | 否   | object | 边距            |
| styleStr | 否   | string | style           |
| htmlStr | 否   | string | html           |
| token | 否   | string | token           |

**请求示例**

```json
{
    "url": "https://www.baidu.com/",
    "margin": {
        "top": "20px",
        "bottom": "20px",
        "right": "20px",
        "left": "20px"
    }
}
```

##### 