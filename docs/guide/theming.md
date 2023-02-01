# 主题

PXT 使用 [Semantic UI](http://semantic-ui.com/) 框架创建用户界面。

### Blockly

对于 Blockly 主题，您可以通过在目标的`appTheme`下配置`blocklyOptions`来覆盖默认的 Blockly 选项。

有关 Blockly 可配置选项的完整列表，请参见 [Blockly 配置](https://developers.google.com/blockly/guides/get-started/web)。

## 语义主题

PXT 带有默认的语义 UI 主题。然而，您可以完全覆盖主题，并使用语义 UI 的所有灵活性来定制目标。

- 将`_theme`文件夹从项目复制到目标的根目录，并将其重命名为`site`
- 自定义变量！

您很可能正在更新`site/global/site.variables`下的站点变量

有关主题的更多信息，请访问http://semantic-ui.com/usage/theming.html

`pxt serve`或`pxt buildtarget`将自动重建`semantic.css`并覆盖应用程序中的内置 css。

## 图标

使用[realfavicongenerator](http://realfavicongenerator.net/)生成所有相关的 favicon 图标文件，并将其保存在`docs`文件夹的`static/icons`下。

## 应用程序主题

[pxtarget.json](https://makecode.com/targets/pxtarget) 包含一个广泛的自定义部分（appTheme），用于控制徽标、名称、颜色等。详细信息如下（待定）：

```typescript
interface AppTheme {
  // naming
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  boardName?: string;

  // associated social/store information
  appStoreID?: string; // Apple iTune Store ID if any
  twitter?: string;

  // localization
  defaultLocale?: string;
  locales?: Map<AppTheme>;
  crowdinProject?: string;
  crowdinBranch?: string; // optional branch specification for pxt
  selectLanguage?: boolean; // add language picker to settings menu
  disableLiveTranslations?: boolean; // don't load translations from crowdin

  // logos
  logoUrl?: string;
  logo?: string;
  portraitLogo?: string;
  rightLogo?: string;
  docsLogo?: string;
  cardLogo?: string;
  appLogo?: string;

  // branding
  organization?: string;
  organizationUrl?: string;
  organizationLogo?: string;
  organizationWideLogo?: string;

  // associated URLs
  homeUrl?: string;
  shareUrl?: string;
  embedUrl?: string;
  privacyUrl?: string;
  termsOfUseUrl?: string;
  contactUrl?: string;
  feedbackUrl?: string; // is set: a feedback link will show in the settings menu
  githubUrl?: string;

  // menu authoring and theming
  docMenu?: DocMenuEntry[]; // help menu
  TOC?: TOCMenuEntry[]; // see SUMMARY.md also
  galleries?: pxt.Map<string>; // list of galleries to display in projects dialog
  hideMenuBar?: boolean; // Hides the main menu bar
  hideEditorToolbar?: boolean; // Hides the bottom editor toolbar

  // getting started and documentation
  sideDoc?: string; // if set: show the getting started button, clicking on getting started button links to that page
  hideSideDocs?: boolean;
  hideDocsSimulator?: boolean; // do not show simulator button in docs
  hideDocsEdit?: boolean; // do not show edit button in docs
  usbDocs?: string;
  htmlDocIncludes?: Map<string>;
  htmlTemplates?: Map<string>;

  // editor theming
  accentColor?: string;
  blocksOnly?: boolean; // blocks only workspace
  invertedMenu?: boolean; // if true: apply the inverted class to the menu

  // blockly theming
  blockColors?: Map<string>; // block namespace colors, used for build in categories
  coloredToolbox?: boolean; // if true: color the blockly toolbox categories
  invertedToolbox?: boolean; // if true: use the blockly inverted toolbox
  blocklyOptions?: Blockly.Options; // Blockly options, see Configuration: https://developers.google.com/blockly/guides/get-started/web
  blockHats?: boolean; // if true, event blocks have hats

  // monaco theming
  invertedMonaco?: boolean; // if true: use the vs-dark monaco theme
  monacoToolbox?: boolean; // if true: show the monaco toolbox when in the monaco editor
  hasReferenceDocs?: boolean; // if true: the monaco editor will add an option in the context menu to load the reference docs

  // simulator theming
  simAnimationEnter?: string; // Simulator enter animation
  simAnimationExit?: string; // Simulator exit animation
  hasAudio?: boolean; // target uses the Audio manager. 如果为 true: 将在模拟器工具栏中添加一个静音按钮。
  highContrast?: boolean; // simulator has a high contrast mode

  // running in an iframe
  allowParentController?: boolean; // allow parent iframe to control editor
  extendEditor?: boolean; // whether a target specific editor.js is loaded

  // options around downloading a compiled file
  useUploadMessage?: boolean; // change "Download" text to "Upload"
  downloadIcon?: string; // which icon io use for download
  driveDisplayName?: string; // name of the drive as it shows in the explorer

  // miscellaneous
  hideEmbedEdit?: boolean; // hide the edit button in the embedded view
  mobileSafariDownloadProtocol?: string; // custom protocol to be used on iOS
  sounds?: {
    tutorialStep?: string;
    tutorialNext?: string;
    dialogClick?: string;
  };
}
```
