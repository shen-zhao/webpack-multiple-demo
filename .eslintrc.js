// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true, //此项是用来告诉eslint找当前配置文件不能往父级查找
  parser: 'babel-eslint', //此项是用来指定eslint解析器的，解析器必须符合规则，babel-eslint解析器是对babel解析器的包装使其与ESLint解析
  parserOptions: {
      sourceType: 'module'
  },
  env: {
      browser: true, //此项指定环境的全局变量，下面的配置指定为浏览器环境
      es6: true,
      node: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: 'eslint:recommended',
  rules: {
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "indent": 0, // 缩进4空格  tab
      "eqeqeq": 0,// 全等== ===  // 不强制
      "semi": 2, // 结尾分号 // 强制
      "max-len": ["error", 300],
      "comma-dangle": ["error", { // 结尾逗号  // 强制取消
          "arrays": "never",
          "objects": "never",
          "imports": "never",
          "exports": "never",
          "functions": "ignore"
      }],
      "object-shorthand": 0, // 对象字面量强制缩进
      "object-curly-spacing": 0,// 对象字面量前后空格
      "quotes": ["error", "single"], // 强制单引号
      "no-multiple-empty-lines": ["error", {"max": 1}],// 空白行
      "max-params": ["warn", {"maximum": 6}],// function最大入参
      "func-names": 0,
      "no-unused-vars": 1,// 未引用的变量
      "no-underscore-dangle": 0,// 下划线开头命名
      "no-tabs": 0,
      "spaced-comment": 0,// 注释符号前后空格
      "prefer-arrow-callback": 0,
      "arrow-body-style": 0,// 箭头函数格式
      "consistent-return": 0,
      "no-alert": 1,// 不允许alert
      "no-console": 0,//
      "no-plusplus": 0,
      "no-unused-expressions": ["error", {"allowShortCircuit": true}]
  }
}
