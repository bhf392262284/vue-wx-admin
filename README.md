后台管理代码学习笔记：

1.导入封装好的 axios,因为封装好的 axios 用的默认导出（export default）,所以引入的时候不加大括号（{}）,并且引入名字可以随便起。如果是用导出方式是 export,那么引入的时候要加{}，并且变量要和导出的对应。

2.axios 请求的时候一般带 3 个常用的参数 url(请求地址)、method（请求方式）、data 或 params（get 用 params，post 用 data）。
