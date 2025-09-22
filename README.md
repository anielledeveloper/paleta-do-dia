# Paleta do Dia

Uma extensão do Chrome que substitui a página de Nova Aba por uma paleta de cores inspiradora que muda diariamente. Perfeita para designers, desenvolvedores e entusiastas de cores que buscam inspiração criativa a cada nova aba.

## ✨ Características

- **Paleta Diária**: Uma nova paleta de cores cuidadosamente curada a cada dia
- **Seleção Determinística**: Todos os usuários veem a mesma paleta no mesmo dia
- **Copiar Cores**: Clique em qualquer cor para copiar o código hexadecimal
- **Nova Paleta**: Botão para gerar uma paleta aleatória instantaneamente
- **Contraste Inteligente**: Texto automaticamente ajustado para máxima legibilidade
- **Design Moderno**: Interface minimalista e elegante
- **Responsivo**: Funciona perfeitamente em qualquer tamanho de tela

## 🎨 Como Funciona

### Seleção Diária
A extensão usa um algoritmo determinístico baseado no dia do ano (1-366) para selecionar uma paleta da coleção curada. Isso garante que todos os usuários vejam a mesma "Paleta do Dia".

### Interatividade
- **Clique para Copiar**: Clique em qualquer cor para copiar seu código hexadecimal
- **Feedback Visual**: Confirmação "Copiado!" aparece temporariamente
- **Botão Shuffle**: Gera uma nova paleta aleatória
- **Atalhos de Teclado**: Pressione `Espaço` ou `Enter` para nova paleta

### Contraste Automático
O texto é automaticamente ajustado para branco ou preto baseado no contraste com a cor de fundo, garantindo legibilidade perfeita.

## 🚀 Instalação

### Desenvolvimento

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Build do projeto**
   ```bash
   npm run build
   ```

3. **Carregue no Chrome**
   - Abra `chrome://extensions/`
   - Ative o "Modo do desenvolvedor"
   - Clique em "Carregar sem compactação"
   - Selecione a pasta `dist`

### Produção

1. **Build para produção**
   ```bash
   npm run package
   ```

2. **Instale o arquivo ZIP**
   - O comando acima gera `paleta-do-dia.zip`
   - Arraste o arquivo para `chrome://extensions/`

## 🛠️ Scripts Disponíveis

- `npm run build` - Build de produção
- `npm run dev` - Build de desenvolvimento com watch
- `npm run clean` - Limpa a pasta dist
- `npm run package` - Cria arquivo ZIP para distribuição

## 📁 Estrutura do Projeto

```
paleta-do-dia/
├── src/
│   ├── newtab/           # Página de nova aba
│   │   ├── newtab.html   # Estrutura HTML
│   │   ├── newtab.css    # Estilos CSS
│   │   └── newtab.ts     # Lógica principal
│   ├── data/
│   │   └── palettes.ts   # Coleção de paletas
│   ├── types/
│   │   └── interfaces.ts # Interfaces TypeScript
│   └── utils/
│       └── colorUtils.ts # Utilitários de cor
├── icons/                # Ícones da extensão
├── manifest.json         # Manifesto da extensão
└── dist/                 # Build de produção
```

## 🎨 Paletas Incluídas

A extensão inclui mais de 30 paletas cuidadosamente curadas, incluindo:

- **Manhã de Outono** - Tons terrosos e acolhedores
- **Sorvete de Menta** - Verde menta refrescante
- **Céu Urbano** - Azuis e laranjas urbanos
- **Vibração Neon** - Cores vibrantes e energéticas
- **Pôr do Sol Tropical** - Tons quentes e tropicais
- **Noite Estrelada** - Azuis profundos e cinzas
- **Jardim Japonês** - Verdes naturais e serenos
- **Aurora Boreal** - Gradientes mágicos
- E muitas mais...

## 🔧 Tecnologias Utilizadas

- **TypeScript** - Tipagem estática e melhor DX
- **Webpack** - Bundling e otimização
- **Chrome Extension Manifest V3** - API moderna do Chrome
- **CSS Grid/Flexbox** - Layout responsivo
- **Google Fonts** - Tipografia moderna (Inter)
- **Chrome Storage API** - Persistência de estado

## 🎯 Funcionalidades Técnicas

### Algoritmo de Seleção Diária
```typescript
const dayOfYear = getDayOfYear();
const dailyIndex = (dayOfYear - 1) % PALETTES.length;
```

### Cálculo de Contraste
```typescript
const contrast = getTextColorForBackground(backgroundColor);
// Retorna cor de texto otimizada (branco ou preto)
```

### Persistência de Estado
- Salva paleta atual no Chrome Storage
- Restaura estado ao reabrir
- Atualiza automaticamente para nova paleta diária

## 🎨 Personalização

### Adicionando Novas Paletas
Edite `src/data/palettes.ts` e adicione novas paletas:

```typescript
{
  name: 'Minha Paleta',
  colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']
}
```

### Modificando Estilos
Edite `src/newtab/newtab.css` para personalizar:
- Cores de interface
- Tipografia
- Animações
- Layout responsivo

## 📱 Compatibilidade

- **Chrome**: Versão 88+
- **Edge**: Versão 88+ (baseado em Chromium)
- **Dispositivos**: Desktop, tablet, mobile
- **Resoluções**: 320px - 4K+

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- Inspirado pela necessidade de inspiração criativa diária
- Paletas curadas com base em tendências de design
- Comunidade de designers e desenvolvedores

## 📞 Suporte

- **Email**: anielleandrade.developer@gmail.com

---

**Paleta do Dia** - Transforme cada nova aba em uma fonte de inspiração criativa! 🎨✨
