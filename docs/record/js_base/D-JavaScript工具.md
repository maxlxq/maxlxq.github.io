# 附录 D JavaScript 工具

JavaScript 开发离不开优秀的工具支持。

## 包管理器

### npm

```bash
# 初始化项目
npm init -y

# 安装包
npm install lodash
npm install --save-dev jest

# 全局安装
npm install -g create-react-app

# 查看已安装包
npm list
npm list --depth=0

# 更新包
npm update
npm update lodash

# 移除包
npm uninstall lodash

# 运行脚本
npm run build
npm run test

# 查看包信息
npm info lodash
npm view lodash versions
```

### Yarn

```bash
# 初始化项目
yarn init -y

# 安装包
yarn add lodash
yarn add --dev jest

# 全局安装
yarn global add create-react-app

# 升级包
yarn upgrade lodash

# 移除包
yarn remove lodash

# 运行脚本
yarn build
yarn test

# 工作区（monorepo）
yarn workspace package-a add lodash
```

### pnpm

```bash
# 初始化项目
pnpm init

# 安装包
pnpm add lodash
pnpm add -D jest

# 全局安装
pnpm add -g create-react-app

# 更新包
pnpm update
pnpm update lodash

# 移除包
pnpm remove lodash

# 运行脚本
pnpm run build
pnpm run test
```

## 代码检查和格式化

### ESLint

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'indent': ['error', 2],
    'quotes': ['error', 'single']
  }
}
```

```bash
# 安装 ESLint
npm install --save-dev eslint

# 初始化配置
npx eslint --init

# 检查文件
npx eslint file.js
npx eslint "src/**/*.js"

# 自动修复
npx eslint file.js --fix
```

### Prettier

```javascript
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

```bash
# 安装 Prettier
npm install --save-dev prettier

# 格式化文件
npx prettier --write "src/**/*.js"
npx prettier --check "src/**/*.js"

# 与 ESLint 集成
npm install --save-dev eslint-config-prettier eslint-plugin-prettier
```

## 构建工具

### Babel

```javascript
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
      },
      useBuiltIns: 'usage',
      corejs: 3
    }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ]
}
```

```bash
# 安装 Babel
npm install --save-dev @babel/core @babel/cli @babel/preset-env

# 转换文件
npx babel src --out-dir dist
npx babel src/main.js --out-file dist/main.js
```

### TypeScript

```javascript
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "lib": ["es2018", "dom"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

```bash
# 安装 TypeScript
npm install --save-dev typescript

# 编译 TypeScript
npx tsc
npx tsc --watch

# 检查类型
npx tsc --noEmit
```

## 测试工具

### Jest 配置

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  }
}
```

### 测试示例

```javascript
// tests/utils.test.js
import { add, multiply } from '../src/utils'

describe('Math utilities', () => {
  describe('add', () => {
    test('adds two numbers', () => {
      expect(add(2, 3)).toBe(5)
    })

    test('adds negative numbers', () => {
      expect(add(-1, -1)).toBe(-2)
    })
  })

  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(multiply(2, 3)).toBe(6)
    })

    test('handles zero', () => {
      expect(multiply(5, 0)).toBe(0)
    })
  })
})
```

## 开发服务器

### webpack-dev-server

```javascript
// webpack.config.js
const path = require('path')

module.exports = {
  // ... 其他配置
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
```

### Vite 开发服务器

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

## 代码质量工具

### SonarQube

```javascript
// sonar-project.properties
sonar.projectKey=my-project
sonar.projectName=My Project
sonar.projectVersion=1.0
sonar.sourceEncoding=UTF-8
sonar.sources=src
sonar.tests=tests
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.testExecutionReportPaths=test-report.xml
```

### Code Climate

```yaml
# .codeclimate.yml
version: "2"
checks:
  argument-count:
    config:
      threshold: 4
  complex-logic:
    config:
      threshold: 4
  file-lines:
    config:
      threshold: 300
  method-complexity:
    config:
      threshold: 25
  method-count:
    config:
      threshold: 20
  method-lines:
    config:
      threshold: 25
  nested-control-flow:
    config:
      threshold: 4
  return-statements:
    config:
      threshold: 4
  similar-code:
    config:
      threshold: 80
  identical-code:
    config:
      threshold: 50
```

## CI/CD 工具

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
    - uses: actions/checkout@v2

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - run: npm ci
    - run: npm run lint
    - run: npm run test
    - run: npm run build
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm install
    - npm run lint
    - npm run test
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/

build:
  stage: build
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
  only:
    - main

deploy:
  stage: deploy
  script:
    - echo "Deploying to production"
  only:
    - main
```

## 总结

现代 JavaScript 开发需要完善的工具链：

- **包管理**: npm, Yarn, pnpm
- **代码质量**: ESLint, Prettier, TypeScript
- **构建工具**: Babel, webpack, Vite
- **测试工具**: Jest, Cypress
- **开发服务器**: webpack-dev-server, Vite
- **CI/CD**: GitHub Actions, GitLab CI

选择合适的工具可以显著提高开发效率和代码质量。
