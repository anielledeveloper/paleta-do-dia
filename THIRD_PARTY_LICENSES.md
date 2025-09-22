# Licenças de Terceiros - Paleta do Dia

Este documento lista todas as dependências de terceiros utilizadas no projeto **Paleta do Dia** e suas respectivas licenças.

## 📦 Dependências de Desenvolvimento

### TypeScript
- **Versão**: ^5.2.2
- **Licença**: Apache License 2.0
- **Descrição**: Linguagem de programação tipada
- **Website**: https://www.typescriptlang.org/
- **Licença Completa**: https://github.com/Microsoft/TypeScript/blob/main/LICENSE.txt

### Webpack
- **Versão**: ^5.88.2
- **Licença**: MIT License
- **Descrição**: Bundler de módulos JavaScript
- **Website**: https://webpack.js.org/
- **Licença Completa**: https://github.com/webpack/webpack/blob/main/LICENSE

### Webpack CLI
- **Versão**: ^5.1.4
- **Licença**: MIT License
- **Descrição**: Interface de linha de comando para Webpack
- **Website**: https://webpack.js.org/api/cli/
- **Licença Completa**: https://github.com/webpack/webpack-cli/blob/main/LICENSE

### ts-loader
- **Versão**: ^9.4.4
- **Licença**: MIT License
- **Descrição**: Loader do TypeScript para Webpack
- **Website**: https://github.com/TypeStrong/ts-loader
- **Licença Completa**: https://github.com/TypeStrong/ts-loader/blob/main/LICENSE

### css-loader
- **Versão**: ^6.8.1
- **Licença**: MIT License
- **Descrição**: Loader de CSS para Webpack
- **Website**: https://github.com/webpack-contrib/css-loader
- **Licença Completa**: https://github.com/webpack-contrib/css-loader/blob/main/LICENSE

### style-loader
- **Versão**: ^3.3.3
- **Licença**: MIT License
- **Descrição**: Loader de estilos para Webpack
- **Website**: https://github.com/webpack-contrib/style-loader
- **Licença Completa**: https://github.com/webpack-contrib/style-loader/blob/main/LICENSE

### html-webpack-plugin
- **Versão**: ^5.5.3
- **Licença**: MIT License
- **Descrição**: Plugin para gerar arquivos HTML
- **Website**: https://github.com/jantimon/html-webpack-plugin
- **Licença Completa**: https://github.com/jantimon/html-webpack-plugin/blob/main/LICENSE

### @types/chrome
- **Versão**: ^0.0.254
- **Licença**: MIT License
- **Descrição**: Definições de tipos TypeScript para Chrome Extensions
- **Website**: https://github.com/DefinitelyTyped/DefinitelyTyped
- **Licença Completa**: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/LICENSE

## 🎨 Recursos de Design

### Google Fonts - Inter
- **Licença**: Open Font License (OFL)
- **Descrição**: Família tipográfica moderna
- **Website**: https://fonts.google.com/specimen/Inter
- **Licença Completa**: https://scripts.sil.org/OFL

### Ícones SVG
- **Licença**: MIT License
- **Descrição**: Ícones customizados para a interface
- **Fonte**: Criados especificamente para este projeto
- **Uso**: Interface da extensão

## 🔧 Ferramentas de Build

### Node.js
- **Versão**: 16+ (requerida)
- **Licença**: MIT License
- **Descrição**: Runtime JavaScript
- **Website**: https://nodejs.org/
- **Licença Completa**: https://github.com/nodejs/node/blob/main/LICENSE

### npm
- **Versão**: 8+ (requerida)
- **Licença**: Artistic License 2.0
- **Descrição**: Gerenciador de pacotes
- **Website**: https://www.npmjs.com/
- **Licença Completa**: https://github.com/npm/cli/blob/latest/LICENSE

## 📋 Resumo de Licenças

### Licenças MIT
- TypeScript
- Webpack
- Webpack CLI
- ts-loader
- css-loader
- style-loader
- html-webpack-plugin
- @types/chrome
- Ícones SVG customizados

### Licenças Apache
- TypeScript (Apache License 2.0)

### Licenças Open Font
- Google Fonts - Inter (OFL)

### Licenças Artistic
- npm (Artistic License 2.0)

## 📄 Texto das Licenças

### MIT License
```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### Open Font License (OFL)
```
This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
http://scripts.sil.org/OFL

SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
```

## 🔍 Verificação de Licenças

### Como Verificar
1. **Node Modules**: `npm list` para ver todas as dependências
2. **Licenses**: `npm list --depth=0` para ver licenças diretas
3. **Audit**: `npm audit` para verificar vulnerabilidades

### Comandos Úteis
```bash
# Listar todas as dependências
npm list

# Verificar licenças
npm list --depth=0

# Auditoria de segurança
npm audit

# Verificar dependências desatualizadas
npm outdated
```

## 📊 Estatísticas de Dependências

### Total de Dependências
- **Produção**: 0 (extensão não usa dependências em runtime)
- **Desenvolvimento**: 8 dependências
- **Tipos**: 1 dependência (@types/chrome)

### Distribuição por Licença
- **MIT**: 7 dependências (87.5%)
- **Apache**: 1 dependência (12.5%)
- **OFL**: 1 recurso (Google Fonts)

## 🛡️ Conformidade

### Licenças Compatíveis
Todas as dependências utilizadas são compatíveis com a licença MIT do projeto principal.

### Sem Conflitos
- Nenhuma dependência tem licenças conflitantes
- Todas as licenças permitem uso comercial
- Nenhuma dependência copyleft (GPL, AGPL)

### Atualizações
- Dependências são atualizadas regularmente
- Licenças são verificadas em cada atualização
- Vulnerabilidades são corrigidas prontamente

## 📞 Contato

Para questões sobre licenças de terceiros:
- **Email**: [licenses@exemplo.com]
- **GitHub**: [https://github.com/yourusername/paleta-do-dia/issues]

---

**Última atualização**: 1 de Janeiro de 2025

*Este documento é atualizado sempre que novas dependências são adicionadas ou removidas do projeto.*
